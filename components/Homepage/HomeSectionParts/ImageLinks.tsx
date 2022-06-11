import { Anchor, createStyles, SimpleGrid } from '@mantine/core';
import { bnb, guesthouse, hotel } from 'lib/images';
import Link from 'next/link';
import React from 'react';
import ImageLink from './ImageLink';

const useStyles = createStyles(() => ({
  // Even though I've removed underlines from <a> elements by default, webkit overrides it?
  whyIsThisDefault: {
    '& a:hover': {
      textDecoration: 'none',
    },
  },
}));

export function ImageLinks() {
  const { classes } = useStyles();
  return (
    <SimpleGrid
      className={classes.whyIsThisDefault}
      cols={3}
      spacing="xl"
      breakpoints={[{ maxWidth: 808, cols: 1 }]}
    >
      <Link passHref href="/accommodations?type=hotels">
        <Anchor>
          <ImageLink text="Hotels" image={hotel} />
        </Anchor>
      </Link>
      <Link passHref href="/accommodations?type=guesthouses">
        <Anchor>
          <ImageLink text="Guesthouses" image={guesthouse} />
        </Anchor>
      </Link>
      <Link passHref href="/accommodations?type=bnb">
        <Anchor>
          <ImageLink text="Bed & Breakfast" image={bnb} />
        </Anchor>
      </Link>
    </SimpleGrid>
  );
}
