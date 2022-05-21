import React from 'react';
import hotel from '/public/large_hotel_1000w-667h.jpg';
import guesthouse from '/public/large_guesthouse_1000w-667h.jpg';
import bnb from '/public/large_bnb_1000w-667h.jpg';
import ImageLink from './ImageLink';
import { SimpleGrid } from '@mantine/core';

export function ImageLinks() {
  return (
    <>
      <SimpleGrid cols={3} spacing="xl" breakpoints={[{ maxWidth: 808, cols: 1 }]}>
        <ImageLink text="Hotels" imgSrc={hotel.src} />
        <ImageLink text="Guesthouses" imgSrc={guesthouse.src} />
        <ImageLink text="Bed & Breakfast" imgSrc={bnb.src} />
      </SimpleGrid>
    </>
  );
}
<SimpleGrid cols={3} spacing="xl" breakpoints={[{ maxWidth: 808, cols: 1 }]}>
  <ImageLinks />
</SimpleGrid>;
