import { PrimaryButton } from '@Buttons/PrimaryButton';
import { AccommodationHeader } from '@components/Accommodation/AccommodationHeader';
import { render, MyMapComponent, Marker } from '@components/Accommodation/Map';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Wrapper } from '@googlemaps/react-wrapper';
import { fetchAccommodations } from '@helpers/callStrapi';

import {
  Anchor,
  Box,
  Button,
  createStyles,
  Divider,
  Group,
  Image,
  LoadingOverlay,
  Text,
  Title,
} from '@mantine/core';
import { useContainerStyles } from '@styles/containerStyles';
import axios from 'axios';

import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import type { AccommodationClean } from 'types/accommodationClean';

export const useStyles = createStyles((theme) => ({
  hotelDetails: {
    gap: theme.other.largeSpacing.xxl,
    flexWrap: 'nowrap',

    [theme.fn.smallerThan('sm')]: {
      flexWrap: 'wrap',
    },
    [theme.fn.smallerThan('xs')]: {
      alignItems: 'center',
    },
  },
  mapWrap: {
    display: 'flex',
    height: '296px',
    width: '100%',
    maxWidth: '616px',
    minWidth: '288px',
    flexGrow: 0,
    flexShrink: 2,
    flexBasis: 'calc(100% - 560px - 80px)',
    [theme.fn.smallerThan('sm')]: {
      flexShrink: 1,
      flexGrow: 1,
      flexBasis: 'auto',
    },
  },
}));

export default function Accommodation({
  data,
  googleData,
}: {
  data: AccommodationClean;
  googleData: any;
}) {
  const router = useRouter();
  const { classes, cx } = useStyles();
  const { classes: containerClass } = useContainerStyles();

  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>Loading...</title>
          <meta property="og:title" content="Loading..." key="title" />
          <meta name="description" content="Loading..." key="description" />
        </Head>
        <div
          style={{
            marginTop: '60px',
            position: 'relative',
            minHeight: 'calc(100vh - 60px - 213px)',
            width: '100%',
          }}
        >
          <LoadingOverlay
            loaderProps={{ size: 'xl', variant: 'oval' }}
            visible={router.isFallback}
          />
        </div>
      </>
    );
  }
  if (data) {
    const title = `${data.name} | Holidaze`;
    console.log(googleData.results[0].geometry.location);
    const center = googleData.results[0].geometry.location;
    const zoom = 20;
    const {
      images: { cover, rooms: roomImages },
      name,
      amenities,
      description,
      rooms,
      contactInfo,
      maxGuests,
      minPrice,
      baths,
      beds,
    } = data;
    return (
      <>
        <Head>
          <title>{title}</title>
          <meta property="og:title" content={title} key="title" />
          <meta name="description" content={data.description} key="description" />
        </Head>
        <AccommodationHeader {...data} />
        <Box
          component="section"
          sx={(theme) => ({
            borderTop: `1px solid ${theme.colors.gray[1]}`,
            padding: `${theme.other.largeSpacing.sm} 0 ${theme.other.sectionSpacing.lg}`,
          })}
        >
          <Box className={containerClass.container}>
            <Group className={classes.hotelDetails} align="start" position="apart">
              <Box mb={64} sx={{ flexShrink: 1 }}>
                <Text
                  pb={32}
                  sx={(theme) => ({
                    maxWidth: '560px',
                    borderBottom: `2px solid ${theme.colors.gray[1]}`,
                  })}
                >
                  {description}
                </Text>
                <PrimaryButton mt={32} primary>{`Book rooms from ${minPrice} NOK`}</PrimaryButton>
              </Box>
              <Box className={classes.mapWrap}>
                <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!} render={render}>
                  <MyMapComponent center={center} zoom={zoom}>
                    <Marker position={center} />
                  </MyMapComponent>
                </Wrapper>
              </Box>
            </Group>
          </Box>
        </Box>
      </>
    );
  }
  // This is goofy as all hell during development, as it will just loop without redirecting.
  // But during production this will correctly redirect to the error page in scenarios where it doesn't,
  // for whatever reason. In 9/10 cases it will, but if someone were to change the url directly,
  // thus not utilizing next/router, it'll just render an empty page, or give an 'application error'.
  // It'll only ever get here if the automatic error page redirect doesn't fire.
  router.reload();
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetchAccommodations();
  if (!data) return { paths: [{ params: { slug: undefined } }], fallback: true };
  const paths = data!.map((item) => ({
    params: { slug: item.slug },
  }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allTheItems = await fetchAccommodations();

  const data = allTheItems?.find((item) => item.slug === params?.slug);

  const {
    contactInfo: { address },
  } = data!;
  const addressURL = encodeURIComponent(address);

  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${addressURL}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
  );
  const { data: newData } = await response;

  const notFound = !data;
  return { props: { data: data, googleData: newData }, revalidate: 300, notFound };
};
