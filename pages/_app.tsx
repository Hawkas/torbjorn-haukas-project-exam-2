import Layout from '@components/Layout';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { holidazeTheme } from '@styles/holidazeTheme';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { FormModal, formModalSettings } from '../components/Modal/FormModal';
config.autoAddCss = false;

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={holidazeTheme}>
        <ModalsProvider modals={{ contact: FormModal }} modalProps={formModalSettings}>
          <NotificationsProvider>
            <Layout content={<Component {...pageProps} />} />
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </>
  );
}
