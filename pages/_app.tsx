import Layout from '@AppShell/Layout';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { LoadingOverlay, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { holidazeTheme } from 'lib/styles/holidazeTheme';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { FormModal, formModalSettings } from '../components/Modal/FormModal';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

config.autoAddCss = false;
type AppPropsWithAuth = AppProps & {
  Component: { auth?: boolean };
};

export default function App(props: AppPropsWithAuth) {
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
          modals={{ contact: FormModal, signIn: FormModal }}
          modalProps={formModalSettings}
        >
          <NotificationsProvider>
            <Layout
              children={
                Component.auth ? (
                  <Auth>
                    <Component {...pageProps} />
                  </Auth>
                ) : (
                  <Component {...pageProps} />
                )
              }
            />
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </SessionProvider>
  );
}
type AuthProps = {
  children: JSX.Element;
};

function Auth({ children }: AuthProps) {
  const router = useRouter();
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
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
        <LoadingOverlay visible={true} />
      </div>
    );
  }

  return children;
}
