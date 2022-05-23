import Head from 'next/head';
import { Welcome } from '../components/Welcome/Welcome';

export default function HomePage() {
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
      <Welcome />
      <p>Accommodations</p>
    </>
  );
}
