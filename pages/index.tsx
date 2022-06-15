import { fetchAccommodations } from '@helpers/fetchAccommodations';
import { HeroSection } from '@Homepage/HeroSection';
import { RestOfThePage } from '@Homepage/RestOfThePage';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import type { DataProps } from 'types/commonProps';

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchAccommodations();
  return { props: { data }, revalidate: 10 };
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
