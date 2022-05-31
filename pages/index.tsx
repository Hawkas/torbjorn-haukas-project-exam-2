import { fetchAccommodations } from '@helpers/callStrapi';
import { getMessage } from '@helpers/handleMessage';
import { HeroSection } from '@Homepage/HeroSection';
import { RestOfThePage } from '@Homepage/RestOfThePage';
import { useLocalStorage } from '@mantine/hooks';

import { GetStaticProps } from 'next';
import { Session } from 'next-auth';
import Head from 'next/head';
import { useContext, useEffect } from 'react';
import { AccommodationClean, AccommodationsArray } from 'types/accommodationClean';
import type { AccommodationObject, Accommodations } from 'types/accommodationRaw';

export interface DataProps {
  data: AccommodationClean[] | false;
}
export const getStaticProps: GetStaticProps = async (context) => {
  const data = await fetchAccommodations();
  if (!data) return { props: { data: false } };
  return { props: data };
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
      <button onClick={() => getMessage()}>TEST</button>
      {/* <h1>Content...</h1>

      <div>
        {initialData.attributes.map((each, index) => {
          return (
            <div key={index}>
              <h3>{each.name}</h3>
              <p>{each.description}</p>
            </div>
          );
        })}
      </div> */}
    </>
  );
}
