import { HeroSection } from '@Homepage/HeroSection';
import { RestOfThePage } from '@Homepage/RestOfThePage';
import axios from 'axios';
import { NextApiRequest } from 'next';
import { Session } from 'next-auth';
import { getSession, signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import type { AccommodationObject } from 'types/accommodation';

interface pageProps {
  session: Session | null;
  accommodations: AccommodationObject[];
}
export async function getServerSideProps(req: NextApiRequest) {
  let headersObj = {};
  const session = await getSession({ req });
  console.log('from index.tsx:');
  console.log(await session);
  let accommodations: AccommodationObject[] = [];
  // if (session) {
  //   headersObj = { Authorization: `Bearer ${session.jwt}` };

  //   try {
  //     let { ...data }: AccommodationObject[] = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_URL}/accommodations?populate%5B0%5D=amenities&populate%5B1%5D=images&populate%5B2%5D=images.cover&populate%5B3%5D=images.rooms&populate%5B4%5D=bookings&populate%5B5%5D=rooms&populate%5B6%5D=contactInfo&populate%5B7%5D=images.rooms.image`,
  //       {
  //         headers: headersObj,
  //       }
  //     );
  //     console.log(data);
  //     accommodations = data;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  return { props: { session, accommodations } };
}

export default function Page() {
  const { data: session, status } = useSession();
  console.dir(status);
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
