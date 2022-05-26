import React from 'react';
import { SimpleGrid } from '@mantine/core';
import { bnb, guesthouse, hotel } from 'lib/images';
import ImageLink from './ImageLink';

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
