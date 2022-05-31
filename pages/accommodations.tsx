import { CardSection } from '@components/Accommodations/CardSection';
import { HeaderSection } from '@components/Accommodations/HeaderSection';
import { fetchAccommodations } from '@helpers/callStrapi';
import { useLocalStorage } from '@mantine/hooks';

import { GetStaticProps } from 'next';
import Head from 'next/head';
import { DataProps } from 'pages';
import { useContext, useEffect } from 'react';

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await fetchAccommodations();
  return { props: { data } };
};

export default function Accommodations(props: DataProps) {
  const title = 'Accommodations | Holidaze';
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="title" />
        <meta
          name="description"
          content="This is our list of accommodations currently available for bookings"
          key="description"
        />
      </Head>
      <HeaderSection />
      <CardSection data={props.data} />
    </>
  );
}
