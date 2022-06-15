import {
  AccommodationHeader,
  Amenity,
  DescriptionDetails,
  PleaseBook,
  RoomList,
} from '@components/Accommodation';
import { fetchAccommodations } from '@helpers/fetchAccommodations';
import { LoadingOverlay } from '@mantine/core';
import axios from 'axios';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import type { AccommodationClean } from 'types/accommodationClean';

interface Props {
  data: AccommodationClean;
  googleData: any;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allTheItems = await fetchAccommodations();

  const data = allTheItems?.find((item) => item.slug === params?.slug);
  let newData: any;
  if (data) {
    const {
      contactInfo: { address },
    } = data!;
    const addressURL = encodeURIComponent(address);

    // In case the google call fails
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${addressURL}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
      );
      const { data: googleData } = await response;
      newData = googleData;
    } catch (error) {
      //console.log(error);
      newData = null;
    }
  }
  const notFound = !data;
  // return { props: { data }, revalidate: 300, notFound };
  return { props: { data, googleData: newData }, revalidate: 10, notFound };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetchAccommodations();
  if (data) {
    const paths = data.map((item) => ({
      params: { slug: item.slug },
    }));
    return { paths, fallback: true };
  }
  return { paths: [], fallback: true };
};

export default function Accommodation({ data, googleData }: Props) {
  const router = useRouter();
  if (data) {
    const title = `${data.name} | Holidaze`;
    return (
      <>
        <Head>
          <title>{title}</title>
          <meta property="og:title" content={title} key="title" />
          <meta name="description" content={data.description} key="description" />
        </Head>
        <AccommodationHeader {...data} />
        <DescriptionDetails googleData={googleData} {...data} />
        <Amenity {...data} />
        <RoomList {...data} />
        <PleaseBook {...data} />
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
