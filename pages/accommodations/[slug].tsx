import { classExpression } from '@babel/types';
import { AccommodationHeader } from '@components/Accommodation/AccommodationHeader';
import { DescriptionDetails } from '@components/Accommodation/DescriptionDetails';
import {
  faAirConditioner,
  faElevator,
  faOven,
  faParking,
  faPaw,
  faRefrigerator,
  faTvRetro,
  faUtensils,
  faWifi,
} from '@fortawesome/pro-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchAccommodations } from '@helpers/callStrapi';

import {
  Anchor,
  Button,
  createStyles,
  Divider,
  Image,
  LoadingOverlay,
  Title,
  Box,
} from '@mantine/core';
import { useContainerStyles } from '@styles/containerStyles';
import { useTextStyles } from '@styles/typography';
import axios, { AxiosResponse } from 'axios';

import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import type { AccommodationClean } from 'types/accommodationClean';

export const useStyles = createStyles((theme) => ({
  fluidContainer: {
    backgroundColor: theme.colors.blue[0],
  },
  amenityWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.other.largeSpacing.xxl,
    paddingBottom: theme.other.sectionSpacing.lg,
  },
}));

interface Props {
  data: AccommodationClean;
  googleData: any;
}
export default function Accommodation({ data, googleData }: Props) {
  const router = useRouter();
  const { classes } = useStyles();
  const { classes: containerClass } = useContainerStyles();
  const { classes: textClass } = useTextStyles();

  if (data) {
    console.log(data);
    const title = `${data.name} | Holidaze`;
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
    // airCondition: true
    // elevator: true
    // freeParking: true
    // id: 1
    // kitchen: false
    // petsAllowed: false
    // refrigerator: true
    // television: true
    // wifi: true
    const iconMatch = {
      airCondition: { icon: faAirConditioner, label: 'Air condition' },
      elevator: { icon: faElevator, label: 'Elevator' },
      wifi: { icon: faWifi, label: 'WiFi' },
      freeParking: { icon: faParking, label: 'Free parking' },
      television: { icon: faTvRetro, label: 'Television' },
      refrigerator: { icon: faRefrigerator, label: 'Refrigerator' },
      foodService: { icon: faUtensils, label: 'Food service' },
      petsAllowed: { icon: faPaw, label: 'Pets allowed' },
      kitchen: { icon: faOven, label: 'Kitchen' },
    };
    return (
      <>
        <Head>
          <title>{title}</title>
          <meta property="og:title" content={title} key="title" />
          <meta name="description" content={data.description} key="description" />
        </Head>
        <AccommodationHeader {...data} />
        <DescriptionDetails googleData={googleData} {...data} />
        <Box component="aside" className={classes.fluidContainer}>
          <Box className={containerClass.container}>
            <Box className={classes.amenityWrapper}>
              <Title
                order={2}
                sx={(theme) => ({ color: theme.other.brandColor })}
                className={textClass.primaryH2}
              >
                Amenities
              </Title>
            </Box>
          </Box>
        </Box>
      </>
    );
  }
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
  let newData: any;
  const {
    contactInfo: { address },
  } = data!;
  const addressURL = encodeURIComponent(address);

  // In case the google call fails
  try {
    // const response = await axios.get(
    //   `https://maps.googleapis.com/maps/api/geocode/json?address=${addressURL}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
    // );
    throw 'error';
    // const { data: googleData } = await response;
    // newData = googleData;
  } catch (error) {
    console.log(error);
    newData = null;
  }
  const notFound = !data;
  // return { props: { data }, revalidate: 300, notFound };
  return { props: { data: data, googleData: newData }, revalidate: 300, notFound };
};
