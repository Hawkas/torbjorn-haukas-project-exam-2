import Layout from '@AppShell/Layout';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { LoadingOverlay, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { holidazeTheme } from 'lib/styles/holidazeTheme';
import { SessionProvider, useSession } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { FormModal, formModalSettings } from '../components/Modal/FormModal';

config.autoAddCss = false;
type AppPropsWithAuth = AppProps & {
  Component: { auth?: boolean };
};

interface AuthProps {
  children: JSX.Element;
}

//* Route guard for admin dashboard */
//* The admin page is the only one that requires a non-null session object,
//* but rather than making server-side requests each time to check if session is valid
//* I do an initial check with a loading state, and if it passes, every page transition afterward will be client side
//* Aka no need to check with the server and regenerate pages
function Auth({ children }: AuthProps) {
  const router = useRouter();
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  // Also overriding the default redirect when not authenticated to send the user to the homepage rather than a log-in page.
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/');
    },
  });
  if (status === 'loading') {
    return (
      <div
        style={{
          marginTop: '60px',
          position: 'relative',
          height: 'calc(100% - 60px)',
          width: '100%',
        }}
      >
        <LoadingOverlay visible />
      </div>
    );
  }

  return children;
}
export default function MyApp(props: AppPropsWithAuth) {
  // Passing session as a prop to avoid server-side calls for session on every page, even where it's not needed.
  const {
    Component,
    pageProps: { session, ...pageProps },
  } = props;

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={holidazeTheme}>
        <ModalsProvider
          modals={{
            contact: FormModal,
            signIn: FormModal,
            booking: FormModal,
            create: FormModal,
          }}
          modalProps={formModalSettings}
        >
          <NotificationsProvider>
            <SessionProvider session={session}>
              <Layout {...pageProps}>
                {Component.auth ? (
                  <Auth>
                    <Component {...pageProps} />
                  </Auth>
                ) : (
                  <Component {...pageProps} />
                )}
              </Layout>
            </SessionProvider>
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </>
  );
}
