import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { TitleSection } from '@components/DefaultTemplates/TitleSection';
import { Box, createStyles, Tabs } from '@mantine/core';
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
  createButton: {
    marginTop: theme.other.sectionSpacing.md,
    marginBottom: `calc(${theme.other.sectionSpacing.md} * -1)`,
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
  // session is always non-null inside this page, all the way down the React tree.
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
            <FiltersHeader order={2} />
            <Box className={containerClass.container}>
              <PrimaryButton
                className={classes.createButton}
                rightIcon={<FontAwesomeIcon icon={faPlus} />}
                primary
              >
                Add new establishment
              </PrimaryButton>
            </Box>
            <CardSection data={data} admin />
          </Tabs.Tab>
          <Tabs.Tab label="Bookings"></Tabs.Tab>
          <Tabs.Tab label="Messages"></Tabs.Tab>
        </Tabs>
      </TitleSection>
    </>
  );
}

AdminDashboard.auth = true;
