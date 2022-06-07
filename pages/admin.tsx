import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { TitleSection } from '@components/DefaultTemplates/TitleSection';
import {
  ActionIcon,
  Box,
  Checkbox,
  CheckboxGroup,
  createStyles,
  Group,
  Input,
  InputWrapper,
  NumberInput,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Stepper,
  Tabs,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useContainerStyles } from '@styles/containerStyles';
import { FiltersHeader } from '@components/Accommodations/FiltersHeader';
import type { GetServerSideProps } from 'next';
import { fetchAccommodations } from '@helpers/fetchAccommodations';

import { getBooking } from '@helpers/handleBookings';
import type { AccommodationClean } from 'types/accommodationClean';

import { Bookings } from 'types/bookings';
import { CardSection } from '@components/Accommodations/CardSection';
import { PrimaryButton } from '@Buttons/PrimaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faClose, faChevronDown, faTrash } from '@fortawesome/pro-regular-svg-icons';

import { useModals } from '@mantine/modals';
import { z } from 'zod';
import { useEffect, useState, useRef } from 'react';
import { useForm, zodResolver, formList } from '@mantine/form';
import { useDidUpdate, useListState } from '@mantine/hooks';

const useStyles = createStyles((theme, _params, getRef) => ({
  tabs: {
    [`& .${getRef('tabsList')}`]: {
      marginBottom: '-2px',
    },
  },
  tabsWrapper: {
    // the specificity is out of this world
    borderBottom: `2px solid ${theme.colors.gray[1]} !important`,
  },
  tabsList: {
    ref: getRef('tabsList'),
  },
  tabInner: {
    color: theme.fn.rgba(theme.white, 0.75),
    ref: getRef('tabInner'),
  },
  tabLabel: {
    padding: '8px 15px',
    lineHeight: 1.5,
    [theme.fn.smallerThan('xs')]: {
      padding: '8px 11px',
    },
  },
  tabActive: {
    ref: getRef('tabActive'),
  },
  tabControl: {
    '&:first-of-type': {
      minWidth: '124px',
    },
    backgroundColor: 'transparent',
    fontSize: theme.other.fontSizes.lg,
    fontWeight: theme.other.fontWeights.semiBold,
    height: '100%',
    padding: 0,
    [theme.fn.smallerThan('xs')]: {
      fontSize: theme.other.fontSizes.xs,
      fontWeight: theme.other.fontWeights.bold,
    },
    // Overriding mantine's specificity
    [`&.${getRef('tabActive')}:not(:nth-of-type(6))`]: {
      borderColor: theme.colors.gray[1],
      borderWidth: '2px',
      [`& .${getRef('tabInner')}`]: {
        backgroundColor: theme.colors.blue[0],
        color: theme.colors.blue[7],
      },
    },
  },
  tabBody: {
    backgroundColor: theme.other.backgroundColor,
  },
}));

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetchAccommodations();
  const bookings = await getBooking();
  return { props: { data, bookings } };
};
interface AdminProps {
  data: AccommodationClean[] | null;
  bookings: Bookings | null;
}

export default function AdminDashboard({ data, bookings }: AdminProps) {
  const { data: session } = useSession();
  const title = 'Admin dashboard | Holidaze';
  const { classes, cx } = useStyles();
  const { classes: containerClass } = useContainerStyles();
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
        <meta
          name="description"
          content="Admin dashboard doesn't really need a description and shouldn't be indexed for SEO"
          key="description"
        />
      </Head>
      <TitleSection darkBg title="Admin dashboard">
        <Tabs
          tabPadding={0}
          variant="outline"
          position="center"
          initialTab={0}
          grow
          classNames={{
            tabsListWrapper: classes.tabsWrapper,
            tabsList: cx(containerClass.container, classes.tabsList),
            tabControl: classes.tabControl,
            tabActive: classes.tabActive,
            tabInner: classes.tabInner,
            tabLabel: classes.tabLabel,
            body: classes.tabBody,
          }}
          className={classes.tabs}
        >
          <Tabs.Tab label="Accommodations">
            <AccommodationAdmin data={data} />
          </Tabs.Tab>
          <Tabs.Tab label="Bookings"></Tabs.Tab>
          <Tabs.Tab label="Messages"></Tabs.Tab>
        </Tabs>
      </TitleSection>
    </>
  );
}

// Enable auth guard. Nothing will show unless session is authenticated.
AdminDashboard.auth = true;

const useAdminAccomStyles = createStyles((theme) => {
  return {
    createButton: {
      marginTop: theme.other.sectionSpacing.md,
      marginBottom: `calc(${theme.other.sectionSpacing.md} * -1)`,
    },
  };
});

const contactInfoSchema = z.object({
  email: z.string().email({ message: 'Must be a valid email address' }),
  address: z.string().min(1, { message: 'Must include an address' }),
  phone: z
    .string()
    .trim()
    .min(7, { message: 'Must be a valid phone number' })
    .max(15, { message: 'This 👏 is 👏 too 👏 long' })
    .refine((val) => !isNaN(Number(val)), { message: 'Must be a number' }),
});
const featuresSchema = z.array(
  z.object({
    id: z.number().optional(),
    feature: z.string().min(1, { message: "You can't create an empty feature" }),
  })
);
const roomsSchema = z.array(
  z.object({
    id: z.number().optional(),
    price: z.number().gt(100, { message: 'Nice joke' }),
    doubleBeds: z.number(),
    singleBeds: z.number(),
    bathRooms: z.number(),
    roomName: z.string().min(1, { message: 'Must include room name' }),
    features: featuresSchema.optional(),
  })
);
const imagesSchema = z.object({
  // id will only be included when updating
  id: z.number().optional(),
  cover: z.any().refine((val) => val instanceof File, { message: 'Must include cover image' }),
  rooms: z
    .array(
      z.object({
        id: z.number().optional(),
        roomName: z.string().min(1, { message: 'Must include room name' }),
        image: z.any().refine((val) => val instanceof File, { message: 'Must include room image' }),
      })
    )
    .nonempty({ message: 'Must include at least one room' }),
});

const amenitySchemaRaw = z.object({
  id: z.any().optional(),
  wifi: z.boolean(),
  airCondition: z.boolean(),
  elevator: z.boolean(),
  freeParking: z.boolean(),
  petsAllowed: z.boolean(),
  kitchen: z.boolean(),
  television: z.boolean(),
  refrigerator: z.boolean(),
  foodService: z.boolean(),
});
const amenitySchema = amenitySchemaRaw.refine(
  (object) => {
    const { id, ...amenities } = object;
    let hasAtleastOne = false;
    for (const [key, value] of Object.entries(amenities)) {
      hasAtleastOne = value;
      if (hasAtleastOne) break;
    }
    return hasAtleastOne;
  },
  { message: 'You need at least one amenity' }
);

const createEntrySchema = z.object({
  // id will only be included when updating
  id: z.number().optional(),
  name: z.string().trim().min(1, { message: "Enter the accommodation's name" }),
  type: z.string().trim().min(1, { message: 'You must select a type' }),
  location: z.string().trim().min(1, { message: 'You must select a location' }),
  description: z
    .string()
    .trim()
    .min(30, { message: 'Must be at least 30 characters' })
    .max(1000, { message: 'Must be less than 1000 characters' }),
  contactInfo: contactInfoSchema,
  images: imagesSchema,
  amenities: amenitySchema,
  rooms: roomsSchema,
});

// Extracting types from schemas
type EntrySchema = z.infer<typeof createEntrySchema>;
type ContactInfoSchema = z.infer<typeof contactInfoSchema>;
type ImagesSchema = z.infer<typeof imagesSchema>;
type AmenitySchema = z.infer<typeof amenitySchemaRaw>;
type RoomsSchema = z.infer<typeof roomsSchema>;
type FeaturesSchema = z.infer<typeof featuresSchema>;

export function AccommodationAdmin({ data }: Pick<AdminProps, 'data'>) {
  const { classes } = useAdminAccomStyles();
  const { classes: containerClass } = useContainerStyles();
  const modals = useModals();
  const openCreateModal = () => {
    modals.openModal({
      children: <CreateAccom />,
    });
  };
  return (
    <>
      <FiltersHeader order={2} />
      <Box className={containerClass.container}>
        <PrimaryButton
          className={classes.createButton}
          rightIcon={<FontAwesomeIcon icon={faPlus} />}
          primary
          onClick={openCreateModal}
        >
          Add new establishment
        </PrimaryButton>
      </Box>
      <CardSection data={data} admin />
    </>
  );
}

const useCreateFormStyles = createStyles((theme) => {
  const breakPoint = theme.fn.smallerThan('sm');
  const paddingBreak = theme.fn.largerThan('xs');
  return {
    formWrapper: {
      position: 'relative',
      backgroundColor: theme.white,
      borderRadius: theme.radius.lg,
      border: `1px solid ${theme.colors.gray[2]}`,
    },

    form: {
      position: 'relative',
      padding: theme.other.smallSpacing.lg,
      marginBottom: theme.other.largeSpacing.sm,
      [paddingBreak]: {
        padding: theme.other.largeSpacing.sm,
      },
    },
    amenitiesLabel: {
      letterSpacing: theme.other.letterSpacing.xs,
      fontSize: theme.fontSizes.xs,
      fontWeight: theme.other.fontWeights.bold,
    },
    amenityContainer: {
      display: 'flex',
      flexFlow: 'row wrap',
      padding: theme.other.smallSpacing.lg,
      gap: theme.other.smallSpacing.lg,
      height: '100%',
      '& > *': {
        flexGrow: 1,
        flexBasis: '150px',
      },
    },
    contactInfoWrapper: {
      border: 0,
      marginTop: theme.spacing.xl,
      '& > legend': {
        display: 'inline-block',
        marginBottom: '4px',
        letterSpacing: theme.other.letterSpacing.xs,
        fontSize: theme.fontSizes.xs,
        fontWeight: theme.other.fontWeights.bold,
        color: theme.colors.gray[9],
      },
    },
    root: {
      position: 'relative',
    },

    input: {
      height: 'auto',
      borderColor: theme.colors.gray[2],
      fontSize: theme.other.fontSizes.md,
      paddingTop: theme.other.smallSpacing.xxl,
    },

    label: {
      position: 'absolute',
      pointerEvents: 'none',
      letterSpacing: theme.other.letterSpacing.xs,
      fontSize: theme.fontSizes.xs,
      fontWeight: theme.other.fontWeights.bold,
      paddingLeft: theme.spacing.sm,
      paddingTop: theme.spacing.sm / 2,
      zIndex: 1,
    },
    numberInput: {
      minWidth: '104px',
    },
  };
});

export function CreateAccom() {
  const { classes } = useCreateFormStyles();
  const { classes: containerClass } = useContainerStyles();
  const modals = useModals();
  const [active, setActive] = useState(0);
  const [stepOne, setStepOne] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  // Index each room added to the entry
  const [rooms, setRooms] = useListState([0]);

  // As this is an obscenely long form, prepare for boilerplate.
  // Also, Mantine's form hook doesn't do validation for formList arrays, e.g (images: [{image: file}, ...])
  // As a workaround, I'm creating multiple instances of the hook, and combining them all into the final output.
  // This is also to avoid having to repackage for every new entry, and unpackaging for every edit.
  const contactInfoForm = useForm<ContactInfoSchema>({
    schema: zodResolver(contactInfoSchema),
    initialValues: {
      email: '',
      phone: '',
      address: '',
    },
  });

  const featuresForm = useForm({
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
  const form = useForm({
    schema: zodResolver(createEntrySchema),
    initialValues: {
      name: '',
      type: '',
      location: '',
      description: '',
      contactInfo: { ...contactInfoForm.values },
      amenities: { ...amenitiesForm.values } as AmenitySchema,
      images: imagesForm.values,
      rooms: formList([
        {
          price: 0,
          doubleBeds: 0,
          singleBeds: 0,
          bathRooms: 0,
          roomName: '',
          features: [] as FeaturesSchema,
        },
      ]),
    },
  });
  const allForms = [form, imagesForm, contactInfoForm, amenitiesForm, featuresForm];
  const hasErrors = (forms: typeof allForms) => {
    let hasErrors = false;
    for (let form of forms) {
      if (form.validate().hasErrors) hasErrors = true;
    }
    return hasErrors;
  };
  const handleSubmit = (e: React.FormEvent, forms: typeof allForms) => {
    e.preventDefault();
    if (hasErrors(allForms)) return;
    const [form, ...rest] = allForms;
    console.log(form.values);
  };
  const validateFirst = () => {
    let hasErrors = false;
    form.setFieldValue('amenities', amenitiesForm.values);
    const validateArray = [
      form.validateField('name').hasError,
      form.validateField('type').hasError,
      form.validateField('location').hasError,
      form.validateField('description').hasError,
      form.validateField('amenities').hasError,
      contactInfoForm.validate().hasErrors,
    ];
    validateArray.map((item) => (hasErrors = item ? true : hasErrors));
    return hasErrors;
  };
  const validateSecond = () => {
    let hasErrors = false;
    let lastRoom = 0;
    let index = 0;
    let featuresArray = [];
    for (let room of rooms) {
      if (room === lastRoom) continue;
      if (lastRoom === 0) lastRoom = room;
      featuresArray = [];
      for (let i = room - lastRoom; i < room; i++) {
        featuresArray.push(featuresForm.values.features[i]);
      }
      form.setListItem('rooms', index, { ...form.values.rooms[index], features: featuresArray });
      lastRoom = room;
    }
    const validateArray = [form.validateField('rooms').hasError, featuresForm.validate().hasErrors];
    validateArray.map((item) => (hasErrors = item ? true : hasErrors));
    return hasErrors;
  };
  const type = ['Guesthouse', 'Bed & Breakfast', 'Hotel'];
  const location = ['Bergen', 'Voss', 'Hardanger'];
  const amenitiesData: {
    label: string;
    field: keyof AmenitySchema;
  }[] = [
    { label: 'WiFi', field: 'wifi' },
    { label: 'Air condition', field: 'airCondition' },
    { label: 'Elevator', field: 'elevator' },
    { label: 'Free parking', field: 'freeParking' },
    { label: 'Pets allowed', field: 'petsAllowed' },
    { label: 'Kitchen', field: 'kitchen' },
    { label: 'Food service', field: 'foodService' },
    { label: 'Television', field: 'television' },
    { label: 'Refrigerator', field: 'refrigerator' },
  ];

  const roomFields = form.values.rooms.map((item, index) => {
    const featureFields = featuresForm.values.features.map(
      (featureItem, featureIndex, featureArray) => {
        // Due to the way Mantine's formList is coded, I have to split this single array on any amount of rooms that may appear

        // If room is not the first item in the array, make sure the featureIndex starts counting from where the last room left off.
        if (index > 0) featureIndex += rooms[index - 1];

        // If the value at this index doesn't exist, the index is greater than the total feature count from prev rooms minus one,
        // or the feature count is 0, return nothing.
        if (!featureArray[featureIndex] || featureIndex > rooms[index] - 1 || rooms[index] === 0) {
          return;
        }

        return (
          <Group key={featureIndex} mt="xl">
            <TextInput
              sx={{ flex: 1 }}
              label="Room feature"
              classNames={classes}
              placeholder="Enter room feature"
              {...featuresForm.getListInputProps('features', featureIndex, 'feature')}
            />
            <ActionIcon
              sx={{ alignSelf: 'center' }}
              color="red"
              variant="hover"
              onClick={() => {
                // When removing a feature, decrement all feature counts higher or equal by 1.
                setRooms.applyWhere(
                  (item) => item >= rooms[index],
                  (item) => (item -= 1)
                );
                console.log(rooms);
                featuresForm.removeListItem('features', featureIndex);
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </ActionIcon>
          </Group>
        );
      }
    );
    const numberInputData: {
      label: string;
      field: 'price' | 'singleBeds' | 'doubleBeds' | 'bathRooms';
    }[] = [
      { label: 'Price (NOK)', field: 'price' },
      { label: 'Single beds', field: 'singleBeds' },
      { label: 'Double beds', field: 'doubleBeds' },
      { label: 'Bathrooms', field: 'bathRooms' },
    ];
    return (
      <Paper mt="xl" shadow="lg" p="sm" key={index}>
        <TextInput
          mt="xl"
          label="Room name"
          classNames={classes}
          placeholder="Enter room name"
          {...form.getListInputProps('rooms', index, 'roomName')}
        />

        <Group grow mt="xl" align="start">
          {numberInputData.map((item, numberIndex) => (
            <NumberInput
              hideControls
              key={numberIndex}
              className={classes.numberInput}
              classNames={classes}
              label={item.label}
              {...form.getListInputProps('rooms', index, item.field)}
            />
          ))}
        </Group>
        <Paper withBorder mt="xl" p="lg">
          {/* if there is no additional features beyond the total of the last room */}
          {rooms[index] === 0 || rooms[index] - rooms[index - 1] === 0 ? (
            <Text align="center" size="xl" color="dimmed">
              No features yet
            </Text>
          ) : (
            <Text size="md" weight={600}>
              Features
            </Text>
          )}
          {featureFields}
          <Group mt={40} position="right">
            <PrimaryButton
              variant="outline"
              onClick={() => {
                // Increment the current total by 1
                let featuresCountPlusPrev = rooms[index] + 1;

                // Increment each item in the array above the current room, but only if the item has more than 0 features
                setRooms.applyWhere(
                  (item, roomIndex) => item > rooms[index] && roomIndex > index,
                  (item) => (item += 1)
                );
                // Update the feature count for the current room.
                setRooms.setItem(index, featuresCountPlusPrev);
                if (index === 0) {
                  setRooms.applyWhere(
                    (item, roomIndex) =>
                      item === 0 || (roomIndex > index && item < featuresCountPlusPrev),
                    (item) => (item = item - rooms[index] + featuresCountPlusPrev)
                  );
                }

                // Update the feature count on all subsequent rooms.
                // subsequentRoomNewValue = subsequentRoomOldValue - currentRoomOldValue + currentRoomNewValue
                setRooms.applyWhere(
                  (item, roomIndex) => roomIndex > index && item < featuresCountPlusPrev,
                  (item) => (item = item - rooms[index] + featuresCountPlusPrev)
                );

                // Add the feature input element.
                featuresForm.addListItem('features', { feature: '' });
                console.log(rooms);
              }}
            >
              Add Feature
            </PrimaryButton>
          </Group>
        </Paper>
      </Paper>
    );
  });
  const nextStep = () => {
    if (validateLastStep(active)) return;
    setActive((current) => (current < 3 ? current + 1 : current));
  };
  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
    validateLastStep(active - 1);
  };
  const validateLastStep = (step: number) => {
    console.log(form.values);
    let validate = false;
    switch (step) {
      case 0:
        validate = validateFirst();
        setStepOne((o) => (o = validateFirst()));
        return validate;
      case 1:
        validate = validateSecond();
        setStepTwo((o) => (o = validate));
        console.log(form.validate());
        console.log(featuresForm.validate());
        return validate;
      default:
        break;
    }
  };
  useEffect(() => {
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
            <TextInput
              mt="xl"
              label="Name"
              classNames={classes}
              placeholder="Enter accommodation name"
              {...form.getInputProps('name')}
            />
            <SimpleGrid spacing={28} cols={2}>
              <Select
                mt="xl"
                label="Type"
                classNames={classes}
                placeholder="Select a type"
                data={type}
                rightSection={<FontAwesomeIcon fontSize="14" icon={faChevronDown} />}
                styles={{ rightSection: { pointerEvents: 'none' } }}
                rightSectionWidth={40}
                {...form.getInputProps('type')}
              />
              <Select
                mt="xl"
                label="Location"
                placeholder="Select a location"
                classNames={classes}
                data={location}
                rightSection={<FontAwesomeIcon fontSize="14" icon={faChevronDown} />}
                styles={{ rightSection: { pointerEvents: 'none' } }}
                rightSectionWidth={40}
                {...form.getInputProps('location')}
              />
            </SimpleGrid>
            <Textarea
              mt="xl"
              label="Description"
              classNames={classes}
              placeholder="Describe the place"
              minRows={5}
              {...form.getInputProps('description')}
            />
            <SimpleGrid cols={2}>
              <InputWrapper
                sx={{ alignSelf: 'stretch' }}
                label="Amenities"
                classNames={{ label: classes.amenitiesLabel }}
                mt="xl"
                error={form.errors.amenities}
                // Just to clear errors on change.
                onChange={(e) => form.setFieldValue('amenities', amenitiesForm.values)}
              >
                <Input
                  classNames={{ input: classes.amenityContainer }}
                  component="div"
                  multiline
                  invalid={form.errors.amenities ? true : false}
                >
                  {amenitiesData.map((item, index) => (
                    <Checkbox
                      label={item.label}
                      key={index}
                      {...amenitiesForm.getInputProps(item.field, { type: 'checkbox' })}
                      onChange={(event) => {
                        amenitiesForm.setFieldValue(item.field, event.currentTarget.checked);
                      }}
                    />
                  ))}
                </Input>
              </InputWrapper>
              <fieldset className={classes.contactInfoWrapper}>
                <legend>Contact info</legend>
                <Stack>
                  <TextInput
                    classNames={classes}
                    label="Email"
                    placeholder="Enter accommodation's email"
                    {...contactInfoForm.getInputProps('email')}
                    onChange={(event) => {
                      contactInfoForm.setFieldValue('email', event.currentTarget.value);
                      form.values.contactInfo.email = event.currentTarget.value;
                    }}
                  />
                  <TextInput
                    classNames={classes}
                    label="Phone"
                    placeholder="Enter accommodation's phone number"
                    {...contactInfoForm.getInputProps('phone')}
                    onChange={(event) => {
                      contactInfoForm.setFieldValue('phone', event.currentTarget.value);
                      form.values.contactInfo.phone = event.currentTarget.value;
                    }}
                  />
                  <TextInput
                    classNames={classes}
                    label="Address"
                    placeholder="Enter accommodation's address"
                    {...contactInfoForm.getInputProps('address')}
                    onChange={(event) => {
                      contactInfoForm.setFieldValue('address', event.currentTarget.value);
                      form.values.contactInfo.address = event.currentTarget.value;
                    }}
                  />
                </Stack>
              </fieldset>
            </SimpleGrid>
          </Stepper.Step>
          <Stepper.Step
            allowStepSelect={active > 1}
            color={stepTwo ? 'red' : undefined}
            completedIcon={stepTwo ? <FontAwesomeIcon icon={faClose} /> : undefined}
            label="Second step"
            description="Rooms"
          >
            {roomFields}
            <Group position="center">
              <PrimaryButton
                onClick={() => {
                  console.log(rooms);
                  console.log(form.values.rooms);
                  let totalFeatures = 0;
                  // Apply the last room's feature count as the base value for next room
                  setRooms.apply((item) => (totalFeatures = item));
                  setRooms.append(totalFeatures);
                  form.addListItem('rooms', {
                    roomName: '',
                    price: 0,
                    singleBeds: 0,
                    doubleBeds: 0,
                    bathRooms: 0,
                    features: [],
                  });
                }}
              >
                Add room
              </PrimaryButton>
            </Group>
          </Stepper.Step>
          <Stepper.Step
            allowStepSelect={active > 2}
            color={stepThree ? 'red' : undefined}
            completedIcon={stepThree ? <FontAwesomeIcon icon={faClose} /> : undefined}
            label="Final step"
            description="Get full access"
          >
            Step 3 content: Get full access
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
