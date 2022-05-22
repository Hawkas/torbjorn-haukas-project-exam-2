import { GlobalCss } from '@components/GlobalCss';
import Layout from '@components/Layout';
import { Contact } from '@components/Modal/Contact';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { holidazeTheme } from '@styles/holidazeTheme';
import { AppProps } from 'next/app';
import Head from 'next/head';

config.autoAddCss = false;

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <>
      <Head>
        <title>Holidaze</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={holidazeTheme}>
        <GlobalCss />
        <ModalsProvider modals={{ contact: Contact }}>
          <NotificationsProvider>
            <Layout content={<Component {...pageProps} />} />
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </>
  );
}
