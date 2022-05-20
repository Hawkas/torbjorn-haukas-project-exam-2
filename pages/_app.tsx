import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider, ScrollArea } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import Layout from '../components/Layout';
import { holidazeTheme } from '../globals/styles/holidazeTheme';
import { GlobalCss } from '../components/GlobalCss';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useState } from 'react';
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
      <MantineProvider
        emotionOptions={{ key: 'holidaze' }}
        withGlobalStyles
        withNormalizeCSS
        theme={holidazeTheme}
      >
        <GlobalCss />
        <NotificationsProvider>
          <Layout content={<Component {...pageProps} />} />
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}
