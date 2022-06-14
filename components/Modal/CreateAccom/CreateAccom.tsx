import { CardBase } from '@components/CardsSection/Cards/SmallParts/CardBase';
import { faClose } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAllForms from '@hooks/useAllForms';
import { ActionIcon, Box, LoadingOverlay, Stepper } from '@mantine/core';

import {
  handleSubmit,
  turnIntoCardData,
  validateFirst,
  validateSecond,
  validateThird,
} from '@helpers/createAccomFunctions';
import { useDidUpdate, useListState, useValidatedState } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { CreateAccom } from 'types/createAccom';
import { useCreateAccomStyles } from './CreateAccom.styles';
import { StepCompleted, StepNavigation, StepOne, StepThree, StepTwo } from './Steps';

export function CreateAccom({ data, session, refreshPage, modals }: CreateAccom) {
  // This is quite verbose (like all my code is but whatever), but since the order of images is random, I have to.
  const imageUrlArray = data
    ? [
        data.images.cover.medium!.src,
        ...data.images.rooms.map((imgItem) => imgItem.image.medium.src),
      ]
    : [];
  const successInitial = {
    rejected: false,
    accepted: false,
    errorMessage: '',
  };
  const { classes } = useCreateAccomStyles();
  const [active, setActive] = useState(0);
  const [stepOne, setStepOne] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(successInitial);
  // As this is an obscenely long form, prepare for boilerplate.
  // Also, Mantine's form hook doesn't cooperate well with nested fields.
  // I need this as I'm validating the payload for upload after all, and I'd rather not do it all twice.
  // So I'm splitting my form up in a three step page to validate each step.

  // To do this, I'm creating multiple instances of the hook, and combining them all into the final output.
  // This will also allow me to store my form data in nested objects and arrays beyond 1 level deep.
  const {
    form,
    contactInfoForm,
    amenitiesForm,
    imagesForm,
    featuresForm,
    initialValues: startValues,
  } = useAllForms(data ? { data } : {});

  const [initialValues] = useState(startValues);
  const featureCountSimple = data ? data.rooms.map((roomItem) => roomItem.features.length) : [];
  const featureCount = data
    ? featureCountSimple.map((count, index, roomArray) =>
        index === 0
          ? count
          : count +
            roomArray.reduce((total, value, reduceIndex) => {
              if (reduceIndex >= index) return total;
              return total + value;
            })
      )
    : [0];
  // Index each room added to the entry, with a number that represents 'feature' count
  const [rooms, setRooms] = useListState(featureCount);
  // and also a hook to see how the values in this array changes to act upon it
  const [{ value }, setValue] = useValidatedState(rooms, (val) => val === rooms);

  // Storing the URLs from user added image files
  const [previewImages, setPreviewImages] = useListState<string>(imageUrlArray);
  const [selectedFiles, setSelectedFiles] = useListState<File | boolean | undefined>([
    imagesForm.values.cover,
    ...imagesForm.values.rooms.map((item) => item.image),
  ]);
  // Creating a preview card with the added data.
  const [previewCard, setPreviewCard] = useState<JSX.Element>();

  const validatePreviousStep = (step: number) => {
    let validationFailed = false;
    switch (step) {
      case 0:
        validationFailed = validateFirst({ form, contactInfoForm, amenitiesForm });
        setStepOne(validationFailed);
        return validationFailed;
      case 1:
        validationFailed = validateSecond({
          rooms,
          form,
          featuresForm,
          initialValues,
        });
        setStepTwo(validationFailed);
        return validationFailed;
      case 2:
        validationFailed = validateThird({
          imagesForm,
          data,
        });
        if (!validationFailed) {
          setSuccess(successInitial);
          const cardProps = turnIntoCardData({ form, imagePreview: previewImages[0] });
          setPreviewCard(<CardBase {...cardProps} />);
        }
        setStepThree(validationFailed);
        return validationFailed;
      default:
        break;
    }
    return null;
  };

  const nextStep = () => {
    if (validatePreviousStep(active)) return;
    setActive((current) => (current < 3 ? current + 1 : current));
  };
  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
    validatePreviousStep(active - 1);
  };
  useEffect(() => {
    // Clearing out the initial empty features item, so user has to specifically add if they want any.
    if (featuresForm.values.features[0].feature && featuresForm.values.features[0].feature === '') {
      featuresForm.removeListItem('features', 0);
    }
  }, []);
  useDidUpdate(() => {
    form.setFieldValue('amenities', amenitiesForm.values);
  }, [amenitiesForm.values]);
  useDidUpdate(() => {
    setValue(rooms);
    const lastFeatureIndex = featuresForm.values.features.length - 1;

    // If it's just a new room being added, or a feature being removed, return.
    if (value.length !== rooms.length) return;
    if (value.some((item, index) => item > rooms[index])) return;

    // Find which value changed by comparing each item with old state and creating an array of booleans
    const sameValue = rooms.map((roomItem, index) => roomItem === value[index]);

    // If only the value of the last item has changed, there's no need to do anything.
    if (!sameValue[sameValue.length - 1] && sameValue[sameValue.length - 2]) return;

    // Find out which index to sort the new list item to. Look for last truthy boolean, return the index above this one.
    // If they're all false, i.e the first room added a feature, it'll return 0 rather than -1.
    const changeOrigin = sameValue.lastIndexOf(true) + 1;
    featuresForm.reorderListItem('features', {
      from: lastFeatureIndex,
      to: rooms[changeOrigin] - 1,
    });
  }, [rooms]);

  return (
    <Box sx={{ position: 'relative' }} className={classes.formWrapper}>
      <LoadingOverlay visible={loading} />
      <form
        name="create-accommodation"
        className={classes.form}
        onSubmit={(e) =>
          handleSubmit(e, {
            forms: { fullForm: form, images: imagesForm },
            setSuccess,
            setLoading,
            session,
            method: data ? 'PUT' : 'POST',
            data,
            initialValues,
          })
        }
      >
        <ActionIcon
          aria-label="Close"
          sx={{ position: 'absolute', top: 10, right: 10, zIndex: 9999 }}
          onClick={
            success.accepted
              ? () => {
                  modals.closeModal('create');
                  refreshPage();
                }
              : () => modals.closeModal('create')
          }
        >
          <FontAwesomeIcon icon={faClose} />
        </ActionIcon>
        <Stepper
          pt="lg"
          active={active}
          onStepClick={(page) => {
            setActive(page);
            validatePreviousStep(page);
          }}
          breakpoint="xs"
          styles={(theme) => ({
            steps: {
              [theme.fn.smallerThan('xs')]: {
                alignItems: 'center',
                '& > button': { minWidth: '145px' },
              },
            },
          })}
        >
          <Stepper.Step
            allowStepSelect={active > 0}
            color={stepOne ? 'red' : undefined}
            completedIcon={stepOne ? <FontAwesomeIcon icon={faClose} /> : undefined}
            label="First step"
            description="Basic details"
          >
            <StepOne {...{ form, amenitiesForm, contactInfoForm }} />
          </Stepper.Step>
          <Stepper.Step
            allowStepSelect={active > 1}
            color={stepTwo ? 'red' : undefined}
            completedIcon={stepTwo ? <FontAwesomeIcon icon={faClose} /> : undefined}
            label="Second step"
            description="Rooms"
          >
            <StepTwo
              {...{
                form,
                featuresForm,
                rooms,
                setRooms,
                imagesForm,
                setPreviewImages,
                setSelectedFiles,
              }}
            />
          </Stepper.Step>
          <Stepper.Step
            allowStepSelect={active > 2}
            color={stepThree ? 'red' : undefined}
            completedIcon={stepThree ? <FontAwesomeIcon icon={faClose} /> : undefined}
            label="Final step"
            description="Images"
          >
            <StepThree
              {...{
                imagesForm,
                form,
                setSelectedFiles,
                selectedFiles,
                setPreviewImages,
                previewImages,
              }}
            />
          </Stepper.Step>
          <Stepper.Completed>
            <StepCompleted {...{ success, previewCard }} />
          </Stepper.Completed>
        </Stepper>
        <StepNavigation {...{ nextStep, prevStep, success, active, refreshPage, modals }} />
      </form>
    </Box>
  );
}
