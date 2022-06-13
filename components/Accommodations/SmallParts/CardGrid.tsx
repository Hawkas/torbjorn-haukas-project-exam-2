import { Grid, Title } from '@mantine/core';
import { Session } from 'next-auth';
import { AccommodationClean } from 'types/accommodationClean';
import { AdminCard, Card } from '../Card';

export const CardGrid = (
  array: AccommodationClean[] | null,
  wrapBp: boolean,
  classes: { cardColumn: string },
  admin?: boolean,
  session?: Session,
  refreshPage?: () => void
) => {
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
};
