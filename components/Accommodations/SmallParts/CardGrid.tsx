import { Grid, Title } from '@mantine/core';
import { AccommodationClean } from 'types/accommodationClean';
import { AdminCard, Card } from '../Card';

export const CardGrid = (
  array: AccommodationClean[] | null,
  wrapBp: boolean,
  classes: { cardColumn: string },
  admin?: boolean
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
          name={item.name}
          image={item.images.cover}
          location={item.location}
          beds={item.beds}
          baths={item.baths}
          type={item.type}
          price={item.minPrice}
        />
      ) : (
        <Card
          href={item.slug}
          name={item.name}
          image={item.images.cover}
          location={item.location}
          beds={item.beds}
          baths={item.baths}
          type={item.type}
          price={item.minPrice}
        />
      )}
    </Grid.Col>
  ));
};
