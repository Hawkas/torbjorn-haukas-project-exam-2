import { MessagesAdmin } from '@components/Admin/MessagesAdmin';
import { TitleSection } from '@components/DefaultTemplates/TitleSection';
import { everythingFetch } from '@helpers/fetchAccommodations';
import { createStyles, Tabs } from '@mantine/core';
import { useContainerStyles } from '@styles/containerStyles';
import type { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { AdminProps } from 'types/commonProps';
import { AccommodationAdmin } from '../components/Admin/AccommodationAdmin';
import { BookingsAdmin } from '../components/Admin/BookingsAdmin';

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
    minHeight: 'calc(100vh - 60px - 213px)',
  },
}));

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=20');
  const everything = await everythingFetch();
  const { cleanAccom: data, bookingData: bookings, cleanMessages: messageData } = everything;
  return { props: { data, bookings, messageData } };
};

export default function AdminDashboard({ data, bookings, messageData }: AdminProps) {
  const title = 'Admin dashboard | Holidaze';
  // Session is ALWAYS non-null inside this page, all the way down the react-tree.
  const { data: session } = useSession();
  const [messages, setMessages] = useState(messageData);
  useEffect(() => {
    setMessages(messageData);
  }, [messageData]);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const onChange = (active: number, tabKey: string) => {
    setActiveTab(active);
    router.replace(
      {
        query: tabKey,
      },
      undefined,
      { shallow: true }
    );
  };
  const refreshPage = () => {
    router.replace(router.asPath);
  };
  useEffect(() => {
    if (!router.isReady) return;
    if (Object.keys(router.query).length > 0) {
      const key = Object.keys(router.query) as ('accommodations' | 'bookings' | 'messages')[];
      switch (key[0]) {
        case 'accommodations':
          setActiveTab(0);
          break;
        case 'bookings':
          setActiveTab(1);
          break;
        case 'messages':
          setActiveTab(2);
          break;
        default:
          break;
      }
    }
  }, []);

  const { classes, cx } = useStyles();
  const { classes: containerClass } = useContainerStyles();
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
        <meta
          name="description"
          content="An admin dashboard doesn't really need a description anyway"
          key="description"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <TitleSection darkBg title="Admin dashboard">
        <Tabs
          initialTab={0}
          active={activeTab}
          onTabChange={onChange}
          tabPadding={0}
          variant="outline"
          position="center"
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
          <Tabs.Tab label="Accommodations" tabKey="accommodations">
            <AccommodationAdmin data={data} session={session!} refreshPage={refreshPage} />
          </Tabs.Tab>
          <Tabs.Tab label="Bookings" tabKey="bookings">
            <BookingsAdmin bookings={bookings} />
          </Tabs.Tab>
          <Tabs.Tab label="Messages" tabKey="messages">
            <MessagesAdmin messages={messages} />
          </Tabs.Tab>
        </Tabs>
      </TitleSection>
    </>
  );
}

// Enable auth guard. Nothing will show unless session is authenticated.
AdminDashboard.auth = true;
