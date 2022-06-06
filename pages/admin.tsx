import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { TitleSection } from '@components/DefaultTemplates/TitleSection';
import { Box, createStyles, Group, Stepper, Tabs } from '@mantine/core';
import { useContainerStyles } from '@styles/containerStyles';
import { FiltersHeader } from '@components/Accommodations/FiltersHeader';
import type { GetServerSideProps } from 'next';
import { fetchAccommodations } from '@helpers/fetchAccommodations';
import { getMessage } from '@helpers/handleMessage';
import { getBooking } from '@helpers/handleBookings';
import type { AccommodationClean } from 'types/accommodationClean';
import type { Message } from 'types/messages';
import { Bookings } from 'types/bookings';
import { CardSection } from '@components/Accommodations/CardSection';
import { PrimaryButton } from '@Buttons/PrimaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import { ACCESSOR_TYPES } from '@babel/types';
import { useModals } from '@mantine/modals';
import { z } from 'zod';
import { useState } from 'react';
import { useForm, zodResolver, formList } from '@mantine/form';
import { UseFormReturnType } from '@mantine/form/lib/use-form';

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

const useAdminAccomStyles = createStyles((theme) => ({
  createButton: {
    marginTop: theme.other.sectionSpacing.md,
    marginBottom: `calc(${theme.other.sectionSpacing.md} * -1)`,
  },
}));

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
const roomsSchema = z
  .array(
    z.object({
      id: z.number().optional(),
      price: z.number().gt(100, { message: 'Nice joke' }),
      doubleBeds: z.number(),
      singleBeds: z.number(),
      bathRooms: z.number(),
      roomName: z.string().min(1, { message: 'Must include room name' }),
      features: featuresSchema.optional(),
    })
  )
  .nonempty({ message: 'Must include at least one room' });
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

const amenitySchema = z.object({
  id: z.number().optional(),
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
type AmenitySchema = z.infer<typeof amenitySchema>;
type RoomsSchema = z.infer<typeof roomsSchema>;
type FeaturesSchema = z.infer<typeof featuresSchema>;
export function AccommodationAdmin({ data }: Pick<AdminProps, 'data'>) {
  const { classes } = useAdminAccomStyles();
  const { classes: containerClass } = useContainerStyles();
  const [active, setActive] = useState(1);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
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

  const featuresForm = useForm<{ features: FeaturesSchema }>({
    schema: zodResolver(featuresSchema),
    initialValues: {
      features: formList([{ feature: '' }]) as Array<{ feature: string; id?: number }>,
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
      contactInfo: contactInfoForm.values,
      amenities: amenitiesForm.values,
      images: imagesForm.values,
      rooms: formList([
        {
          price: 0,
          doubleBeds: 0,
          singleBeds: 0,
          bathRooms: 0,
          roomName: '',
          features: featuresForm.values.features,
        },
      ]) as any,
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
  const modals = useModals();
  const openCreateModal = () => {
    const id = modals.openModal({
      title: 'Add new establishment',
      children: (
        <Box>
          <form onSubmit={(e) => handleSubmit(e, allForms)}>
            <Stepper active={active} onStepClick={setActive} breakpoint="sm">
              <Stepper.Step
                label="Accommodation details"
                description="Add basic info about the accommodation"
              >
                Step 1 content: Create an account
              </Stepper.Step>
              <Stepper.Step label="Second step" description="Verify email">
                Step 2 content: Verify email
              </Stepper.Step>
              <Stepper.Step label="Final step" description="Get full access">
                Step 3 content: Get full access
              </Stepper.Step>
              <Stepper.Completed>
                Completed, click back button to get to previous step
              </Stepper.Completed>
            </Stepper>
            <Group position="center" mt="xl">
              <PrimaryButton variant="default" onClick={prevStep}>
                Back
              </PrimaryButton>
              <PrimaryButton primary onClick={nextStep}>
                Next step
              </PrimaryButton>
            </Group>
          </form>
        </Box>
      ),
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
