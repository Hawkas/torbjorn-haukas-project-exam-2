import { HeroSection } from '@Homepage/HeroSection';
import { RestOfThePage } from '@Homepage/RestOfThePage';
import { ScrollArea } from '@mantine/core';
import Head from 'next/head';

export default function HomePage() {
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
      <HeroSection />
      <RestOfThePage />
    </>
  );
}
