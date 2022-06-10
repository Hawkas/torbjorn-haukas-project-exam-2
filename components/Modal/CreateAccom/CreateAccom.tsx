import { PrimaryButton } from '@Buttons/PrimaryButton';
import { CardBase } from '@components/Accommodations/Card';
import { faCheckCircle, faClose } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { axiosFetch } from '@helpers/axiosFetch';
import { slugify } from '@helpers/stringConversions';
import {
  ActionIcon,
  Box,
  Center,
  Group,
  InputWrapper,
  LoadingOverlay,
  Stack,
  Stepper,
  Text,
  Title,
} from '@mantine/core';
import { formList, useForm, zodResolver } from '@mantine/form';
import { useDidUpdate, useListState } from '@mantine/hooks';
import { useModals } from '@mantine/modals';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import {
  turnIntoCardData,
  validateFirst,
  validateSecond,
  validateThird,
} from '../../../lib/helpers/createAccomFunctions';
import { useCreateAccomStyles } from './CreateAccom.styles';
import {
  AmenitySchema,
  amenitySchema,
  ContactInfoSchema,
  contactInfoSchema,
  createEntrySchema,
  EntrySchema,
  FeaturesSchema,
  featuresSchema,
  FeaturesSchemaWrap,
  featuresSchemaWrap,
  ImagesSchema,
  imagesSchema,
} from './CreateAccomValidation';
import { ImageUpload } from './ImageUpload';
import { StepOne } from './Steps/StepOne';
import { StepTwo } from './Steps/StepTwo';

export function CreateAccom() {
  const { classes } = useCreateAccomStyles();
  const { data: session } = useSession();
  const modals = useModals();
  const [active, setActive] = useState(0);
  const [stepOne, setStepOne] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<{ [key: string]: boolean | string }>({
    rejected: false,
    accepted: false,
  });
  // Index each room added to the entry
  const [rooms, setRooms] = useListState([0]);
  // Preview images
  const [previewImages, setPreviewImages] = useListState<string>([]);
  // Preview card
  const [previewCard, setPreviewCard] = useState<JSX.Element>();
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

  const featuresForm = useForm<FeaturesSchemaWrap>({
    schema: zodResolver(featuresSchemaWrap),
    initialValues: {
      features: formList([{ feature: '' }]),
    },
  });

  const imagesForm = useForm<ImagesSchema>({
    schema: zodResolver(imagesSchema),
    initialValues: {
      cover: undefined,
      rooms: formList([{ roomName: '', image: undefined }]),
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
      contactInfo: contactInfoForm.values,
      amenities: amenitiesForm.values,
      images: imagesForm.values,
      rooms: formList([
        {
          price: 0,
          doubleBeds: 0,
          singleBeds: 0,
          bathrooms: 0,
          roomName: '',
          features: [] as FeaturesSchema,
        },
      ]),
    },
  });
  const handleSubmit = async (
    e: React.FormEvent,
    forms: { fullForm: typeof form; images: typeof imagesForm }
  ) => {
    e.preventDefault();
    setLoading(true);
    const { fullForm, images } = forms;
    const formData = new FormData();
    const files = images.values.rooms.map((item, index) => ({
      name: `testList[${index}].image`,
      file: item.image,
      fileName: `${slugify(fullForm.values.name)}-${slugify(
        fullForm.values.images.rooms[index].roomName
      )}`,
    }));

    files.push({
      name: 'test',
      file: images.values.cover,
      fileName: `${slugify(fullForm.values.name)}-cover`,
    });
    files.forEach((item) => formData.append(`files.${item.name}`, item.file, item.fileName));
    formData.append(
      'data',
      JSON.stringify({ slug: `${slugify(fullForm.values.name)}`, ...fullForm.values })
    );
    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${session!.jwt}`,
    };
    const response = await axiosFetch({
      method: 'POST',
      url: '/accommodations',
      headers,
      data: formData,
    });
    if (response.data) {
      setSuccess((o) => ({ accepted: true, rejected: false }));
      setLoading(false);
      console.log(response);
      return;
    }
    console.log(response);
    setSuccess((o) => ({
      accepted: false,
      rejected: true,
      errorMessage: response.response.data.error.message,
    }));
    setLoading(false);
    return;
  };
  const validatePreviousStep = (step: number) => {
    console.log(form.values);
    let validationFailed = false;
    switch (step) {
      case 0:
        validationFailed = validateFirst({ form, contactInfoForm, amenitiesForm });
        setStepOne(validationFailed);
        return validationFailed;
      case 1:
        validationFailed = validateSecond({ rooms, form, featuresForm });
        setStepTwo(validationFailed);
        return validationFailed;
      case 2:
        validationFailed = validateThird({ form, imagesForm });
        if (!validationFailed) {
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

  const [imageFields, setImageFields] = useState<JSX.Element[]>([]);
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
    const newImageFields = rooms.map((_item, index) => (
      <InputWrapper
        key={index}
        label={form.values.rooms[index] ? form.values.rooms[index].roomName : `Room ${index}`}
        classNames={{ label: classes.imageLabel }}
        mt="xl"
        {...imagesForm.getListInputProps('rooms', index, 'image')}
      >
        <ImageUpload
          name={`rooms-${index}`}
          onDrop={(files: File[]) => {
            const previewUrl = URL.createObjectURL(files[0]);
            setPreviewImages.setItem(index + 1, previewUrl);
            imagesForm.setListItem('rooms', index, {
              roomName: form.values.rooms[index].roomName,
              image: files[0],
            });
            //@ts-ignore
            imagesForm.clearFieldError(`rooms.${index}.image`);
          }}
          preview={previewImages[index + 1]}
        />
      </InputWrapper>
    ));
    setImageFields(newImageFields);
    return () =>
      setPreviewImages.apply((item) => {
        URL.revokeObjectURL(item);
        return '';
      });
  }, [rooms, previewImages]);
  return (
    <Box sx={{ position: 'relative' }} className={classes.formWrapper}>
      <LoadingOverlay visible={loading} />
      <form
        name="create-accommodation"
        className={classes.form}
        onSubmit={(e) => handleSubmit(e, { fullForm: form, images: imagesForm })}
      >
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
            <InputWrapper
              label="Cover"
              classNames={{ label: classes.imageLabel }}
              mt="xl"
              {...imagesForm.getInputProps('cover')}
            >
              <ImageUpload
                name="cover"
                onDrop={(files: File[]) => {
                  const previewUrl = URL.createObjectURL(files[0]);
                  setPreviewImages.setItem(0, previewUrl);
                  imagesForm.setFieldValue('cover', files[0]);
                  imagesForm.clearFieldError('cover');
                }}
                preview={previewImages[0]}
              />
            </InputWrapper>
            {imageFields}
          </Stepper.Step>
          <Stepper.Completed>
            {success.accepted ? (
              <Center mt="xl">
                <Stack>
                  <FontAwesomeIcon icon={faCheckCircle} color="green" size="6x" />
                  <Text size="xl" color="green" mt="xl" weight="bold">
                    Successfully uploaded
                  </Text>
                </Stack>
              </Center>
            ) : success.rejected ? (
              <Center mt="xl">
                <Stack>
                  <FontAwesomeIcon icon={faClose} color="red" size="6x" />
                  <Text size="xl" color="red" mt="xl" weight="bold">
                    {`Failed to upload. Error message: ${success.errorMessage}`}
                  </Text>
                </Stack>
              </Center>
            ) : (
              <>
                <Text align="center" mt="xl" size="xl">
                  All done!
                </Text>
                <Text align="center" size="sm" color="dimmed">
                  Press submit to upload it!
                </Text>
                <Box sx={{ maxWidth: '408px', margin: '48px auto' }}>{previewCard}</Box>
              </>
            )}
            <PrimaryButton
              primary
              type="submit"
              mt={64}
              sx={{ display: success.accepted ? 'none' : 'block' }}
            >
              Submit
            </PrimaryButton>
          </Stepper.Completed>
        </Stepper>
        <Group position="center" pt="xl" mt="xl">
          <PrimaryButton
            disabled={active === 0}
            variant="default"
            onClick={success.accepted ? () => modals.closeModal('create') : prevStep}
          >
            {success.accepted ? 'Close' : 'Back'}
          </PrimaryButton>
          <PrimaryButton
            primary
            onClick={nextStep}
            sx={{ display: active === 3 ? 'none' : 'block' }}
          >
            Next step
          </PrimaryButton>
        </Group>
      </form>
    </Box>
  );
}
