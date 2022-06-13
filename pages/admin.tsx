import { TitleSection } from '@components/DefaultTemplates/TitleSection';
import { fetchAccommodations, productsQuery, removeFluff } from '@helpers/fetchAccommodations';
import { getBooking } from '@helpers/handleBookings';
import { createStyles, LoadingOverlay, Tabs } from '@mantine/core';
import { useContainerStyles } from '@styles/containerStyles';
import axios from 'axios';
import type { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { AccommodationClean } from 'types/accommodationClean';
import { Accommodations } from 'types/accommodationRaw';
import type { AdminProps } from 'types/commonProps';
import { AccommodationAdmin } from '../components/Admin/AccommodationAdmin';

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

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetchAccommodations();
  const bookings = await getBooking();
  return { props: { data, bookings } };
};

export default function AdminDashboard({ data, bookings }: AdminProps) {
  const title = 'Admin dashboard | Holidaze';
  // Session is ALWAYS non-null inside this page, all the way down the react-tree.
  const { data: session } = useSession();
  const router = useRouter();
  const pageRefresh = () => {
    router.replace(router.asPath);
  };
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
            <AccommodationAdmin data={data} session={session!} refreshPage={pageRefresh} />
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
