import { faBed, faLocationDot, faToilet } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ImageLink from '@Homepage/HomeSectionParts/ImageLink';
import { Box, createStyles, Grid } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useContainerStyles } from '@styles/containerStyles';
import { NextRouter, useRouter } from 'next/router';
import { DataProps } from 'pages';
import type { AccommodationClean } from 'types/accommodationClean';

function filterArray(array: AccommodationClean[], router: NextRouter) {
  const results = array.filter((item) => {
    const { location, type } = router.query;
    // If no filters, pass everything.
    if (location === undefined && type === undefined) return true;
    // Gives truthy value if location/type matches, or its query is undefined
    const locationMatch = location === item.location.toLowerCase() || location === undefined;
    const typeMatch = type === item.type.toLowerCase() || type === undefined;

    if (locationMatch && typeMatch) return true;
  });
  return results;
}
const useStyles = createStyles((theme) => ({
  cardContainer: {},
}));
export function CardSection({ data }: DataProps) {
  const gutterBp = useMediaQuery('(min-width: 1200px)');
  const { classes, cx } = useStyles();
  const {
    classes: { container },
  } = useContainerStyles();
  const router = useRouter();
  let results: typeof data = [];
  if (data) {
    results = filterArray(data, router);
    console.log(router.query.type);
    console.log(results);
  }
  return (
    <Box className={container} m={gutterBp ? -24 : -12}>
      <Grid className={classes.cardContainer} gutter={gutterBp ? 48 : 24} m={gutterBp ? 24 : 12}>
        <Grid.Col xs={12} md={6} lg={4}>
          <ImageLink cards text={results[0].name} image={results[0].images.cover} />
        </Grid.Col>
        <Grid.Col xs={12} md={6} lg={4}>
          <ImageLink cards text={results[0].name} image={results[0].images.cover} />
        </Grid.Col>
        <Grid.Col xs={12} md={6} lg={4}>
          <ImageLink cards text={results[0].name} image={results[0].images.cover} />
        </Grid.Col>
      </Grid>
    </Box>
  );
}
