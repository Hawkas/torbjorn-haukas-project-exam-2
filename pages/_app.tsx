import Layout from '@AppShell/Layout';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { LoadingOverlay, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { holidazeTheme } from 'lib/styles/holidazeTheme';
import { SessionProvider, useSession } from 'next-auth/react';
import { AppProps } from 'next/app';
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

function Auth({ children }: AuthProps) {
  const router = useRouter();
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  // Overriding the default redirect to log-in as well.
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
  const {
    Component,
    pageProps: { session, ...pageProps },
  } = props;
  return (
    <SessionProvider session={session}>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={holidazeTheme}>
        <ModalsProvider
          modals={{ contact: FormModal, signIn: FormModal, booking: FormModal, create: FormModal }}
          modalProps={formModalSettings}
        >
          <NotificationsProvider>
            <Layout>
              {Component.auth ? (
                <Auth>
                  <Component {...pageProps} />
                </Auth>
              ) : (
                <Component {...pageProps} />
              )}
            </Layout>
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </SessionProvider>
  );
}
