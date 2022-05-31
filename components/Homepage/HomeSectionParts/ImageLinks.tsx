import React from 'react';
import { Box, createStyles, SimpleGrid } from '@mantine/core';
import { bnb, guesthouse, hotel } from 'lib/images';
import ImageLink from './ImageLink';
import Link from 'next/link';

const useStyles = createStyles(() => ({
  // Even though I've removed underlines from <a> elements by default, webkit overrides it?
  screwWebkit: {
    '& a': {
      textDecoration: 'none',
    },
  },
}));

export function ImageLinks() {
  const { classes } = useStyles();
  return (
    <SimpleGrid
      className={classes.screwWebkit}
      cols={3}
      spacing="xl"
      breakpoints={[{ maxWidth: 808, cols: 1 }]}
    >
      <Link passHref href="/accommodations?type=hotels">
        <a>
          <ImageLink text="Hotels" image={hotel} />
        </a>
      </Link>
      <Link passHref href="/accommodations?type=guesthouses">
        <a>
          <ImageLink text="Guesthouses" image={guesthouse} />
        </a>
      </Link>
      <Link passHref href="/accommodations?type=bnb">
        <a>
          <ImageLink text="Bed & Breakfast" image={bnb} />
        </a>
      </Link>
    </SimpleGrid>
  );
}
