import { Grid, Title } from '@mantine/core';
import type { Session } from 'next-auth';
import type { AccommodationClean } from 'types/accommodationClean';
import { AdminCard, Card } from '../Cards';

interface CardGrid {
  array: AccommodationClean[] | null;
  wrapBp: boolean;
  classes: { cardColumn: string };
  admin?: boolean;
  session?: Session;
  refreshPage?: () => void;
}

export function CardGrid({
  array,
  wrapBp,
  classes,
  admin,
  session,
  refreshPage,
}: CardGrid): JSX.Element[] {
  if (!array || array.length === 0) {
    return [
      <Grid.Col className={classes.cardColumn} key="Nothing" span={12}>
        <Title align="center" order={2}>
          No accommodations found
        </Title>
      </Grid.Col>,
    ];
  }
  return array.map((item) => (
    <Grid.Col className={classes.cardColumn} key={item.slug} span={wrapBp ? 6 : 12} md={6} lg={4}>
      {admin ? (
        <AdminCard
          session={session!}
          refreshPage={refreshPage!}
          {...{ price: item.minPrice, image: item.images.cover, ...item }}
        />
      ) : (
        <Card {...{ price: item.minPrice, image: item.images.cover, href: item.slug, ...item }} />
      )}
    </Grid.Col>
  ));
}
