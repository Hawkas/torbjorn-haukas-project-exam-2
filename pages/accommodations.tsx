import { CardSection } from '@components/Accommodations/CardSection';
import { HeaderSection } from '@components/Accommodations/HeaderSection';
import { SearchBar } from '@components/SearchBar/SearchBar';

import { fetchAccommodations } from '@helpers/callStrapi';

import { GetStaticProps } from 'next';
import Head from 'next/head';
import { DataProps } from 'pages';
import { useEffect, useRef, useState } from 'react';

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
      {/* <SearchBar noLabel data={props.data} /> */}
      <CardSection data={props.data} />
    </>
  );
}
