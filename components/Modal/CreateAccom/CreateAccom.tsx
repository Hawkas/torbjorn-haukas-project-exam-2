import { PrimaryButton } from '@Buttons/PrimaryButton';
import { faClose } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActionIcon, Box, Group, InputWrapper, Stepper } from '@mantine/core';
import { formList, useForm, zodResolver } from '@mantine/form';
import { useDidUpdate, useListState } from '@mantine/hooks';
import { useModals } from '@mantine/modals';
import { useEffect, useState } from 'react';
import { useCreateAccomStyles } from './CreateAccom.styles';
import { validateFirst, validateSecond } from '../../../lib/helpers/createAccomFunctions';
import {
  AmenitySchema,
  amenitySchema,
  ContactInfoSchema,
  contactInfoSchema,
  createEntrySchema,
  EntrySchema,
  FeaturesSchema,
  featuresSchema,
  ImagesSchema,
  imagesSchema,
} from './CreateAccomValidation';
import { StepOne } from './Steps/StepOne';
import { StepTwo } from './Steps/StepTwo';
import { ImageUpload } from './ImageUpload';

export function CreateAccom() {
  const { classes } = useCreateAccomStyles();
  const modals = useModals();
  const [active, setActive] = useState(0);
  const [stepOne, setStepOne] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  // Index each room added to the entry
  const [rooms, setRooms] = useListState([0]);

  // As this is an obscenely long form, prepare for boilerplate.
  // Also, Mantine's form hook doesn't do singular validation for formList arrays, e.g (images: [{image: file}, ...])
  // I need this as I'm splitting my form up in a three step page and validate each step.

  // So as a workaround, I'm creating multiple instances of the hook, and combining them all into the final output.
  // This is also to avoid having to repackage for every new entry, and unpackaging for every edit.

  const contactInfoForm = useForm<ContactInfoSchema>({
    schema: zodResolver(contactInfoSchema),
    initialValues: {
      email: '',
      phone: '',
      address: '',
    },
  });

  const featuresForm = useForm<{ features: FeaturesSchema }>({
    schema: zodResolver(featuresSchema),
    initialValues: {
      features: formList([{ feature: '' }]),
    },
  });

  const imagesForm = useForm<ImagesSchema>({
    schema: zodResolver(imagesSchema),
    initialValues: {
      cover: undefined,
      rooms: formList([{ roomName: '', image: undefined }]) as any,
    },
  });

  const amenitiesForm = useForm<AmenitySchema>({
    schema: zodResolver(amenitySchema),
    initialValues: {
      wifi: false,
      airCondition: false,
      elevator: false,
      freeParking: false,
      petsAllowed: false,
      kitchen: false,
      television: false,
      refrigerator: false,
      foodService: false,
    },
  });
  const form = useForm<EntrySchema>({
    schema: zodResolver(createEntrySchema),
    initialValues: {
      name: '',
      type: '',
      location: '',
      description: '',
      contactInfo: { ...contactInfoForm.values },
      amenities: { ...amenitiesForm.values },
      images: imagesForm.values,
      rooms: formList([
        {
          price: 0,
          doubleBeds: 0,
          singleBeds: 0,
          bathRooms: 0,
          roomName: '',
          features: [] as any,
        },
      ]),
    },
  });
  const allForms = [form, imagesForm, contactInfoForm, amenitiesForm, featuresForm];
  const formHasErrors = (forms: typeof allForms) => {
    let hasErrors = false;
    forms.forEach((formItem) => {
      if (formItem.validate().hasErrors) {
        hasErrors = true;
      }
      return null;
    });
    return hasErrors;
  };
  const handleSubmit = (e: React.FormEvent, forms: typeof allForms) => {
    e.preventDefault();
    if (formHasErrors(forms)) return null;
    const [fullForm] = forms;
    console.log(fullForm.values);
    return null;
  };

  const validateLastStep = (step: number) => {
    console.log(form.values);
    let validate = false;
    switch (step) {
      case 0:
        validate = validateFirst({ form, contactInfoForm, amenitiesForm });
        setStepOne(validate);
        return validate;
      case 1:
        validate = validateSecond({ rooms, form, featuresForm });
        setStepTwo(validate);
        return validate;
      default:
        return null;
        break;
    }
  };

  const imageFields = rooms.map((_item, index) => {
    <InputWrapper
      label={form.values.rooms[index].roomName}
      classNames={{ label: classes.amenitiesLabel }}
      mt="xl"
    >
      <ImageUpload onDrop={(files) => console.log(files)} />
    </InputWrapper>;
  });

  const nextStep = () => {
    if (validateLastStep(active)) return;
    setActive((current) => (current < 3 ? current + 1 : current));
  };
  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
    validateLastStep(active - 1);
  };
  useEffect(() => {
    // Clearing out the initial empty features item, so user has to specifically add if they want any.
    if (featuresForm.values.features[0].feature && featuresForm.values.features[0].feature === '')
      featuresForm.removeListItem('features', 0);
  }, []);
  useDidUpdate(() => {
    form.setFieldValue('amenities', amenitiesForm.values);
  }, [amenitiesForm.values]);
  return (
    <Box className={classes.formWrapper}>
      <form className={classes.form} onSubmit={(e) => handleSubmit(e, allForms)}>
        <ActionIcon
          aria-label="Close"
          sx={{ position: 'absolute', top: 10, right: 10, zIndex: 9999 }}
          onClick={() => modals.closeModal('create')}
        >
          <FontAwesomeIcon icon={faClose} />
        </ActionIcon>
        <Stepper
          pt="lg"
          active={active}
          onStepClick={(page) => {
            setActive(page);
            validateLastStep(page);
          }}
          breakpoint="sm"
        >
          <Stepper.Step
            allowStepSelect={active > 0}
            color={stepOne ? 'red' : undefined}
            completedIcon={stepOne ? <FontAwesomeIcon icon={faClose} /> : undefined}
            label="First step"
            description="Basic details"
          >
            <StepOne form={form} amenitiesForm={amenitiesForm} contactInfoForm={contactInfoForm} />
          </Stepper.Step>
          <Stepper.Step
            allowStepSelect={active > 1}
            color={stepTwo ? 'red' : undefined}
            completedIcon={stepTwo ? <FontAwesomeIcon icon={faClose} /> : undefined}
            label="Second step"
            description="Rooms"
          >
            <StepTwo form={form} featuresForm={featuresForm} rooms={rooms} setRooms={setRooms} />
          </Stepper.Step>
          <Stepper.Step
            allowStepSelect={active > 2}
            color={stepThree ? 'red' : undefined}
            completedIcon={stepThree ? <FontAwesomeIcon icon={faClose} /> : undefined}
            label="Final step"
            description="Images"
          >
            <InputWrapper label="Cover" classNames={{ label: classes.amenitiesLabel }} mt="xl">
              <ImageUpload onDrop={(files) => console.log(files)} />
            </InputWrapper>
            {imageFields};
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>
        <Group position="center" pt="xl" mt="xl">
          <PrimaryButton variant="default" onClick={prevStep}>
            Back
          </PrimaryButton>
          <PrimaryButton primary onClick={nextStep}>
            Next step
          </PrimaryButton>
        </Group>
      </form>
    </Box>
  );
}
