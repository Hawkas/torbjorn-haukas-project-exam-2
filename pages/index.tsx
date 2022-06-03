import type { SessionType } from '@AppShell/Header/Navigation/NavMenu';
import { fetchAccommodations } from '@helpers/callStrapi';
import { getMessage } from '@helpers/handleMessage';
import { HeroSection } from '@Homepage/HeroSection';
import { RestOfThePage } from '@Homepage/RestOfThePage';
import { useLocalStorage } from '@mantine/hooks';

import { GetStaticProps } from 'next';
import { Session } from 'next-auth';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useContext, useEffect } from 'react';
import { AccommodationClean, AccommodationsArray } from 'types/accommodationClean';
import type { AccommodationObject, Accommodations } from 'types/accommodationRaw';

export interface DataProps {
  data: AccommodationClean[] | null;
}
export const getStaticProps: GetStaticProps = async (context) => {
  const data = await fetchAccommodations();
  return { props: { data }, revalidate: 300 };
};

export default function Page(props: DataProps) {
  return (
    <>
      <Head>
        <title>Holidaze</title>
        <meta property="og:title" content="Holidaze" key="title" />
        <meta
          name="description"
          content="Holidaze helps you find accommodations in and around Bergen with its mountains and fjords."
          key="description"
        />
      </Head>
      <HeroSection data={props.data} />
      <RestOfThePage />
    </>
  );
}
