import { faBed, faLocationDot, faToilet } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ImageLink, { ImageProps } from '@Homepage/HomeSectionParts/ImageLink';
import {
  Box,
  createStyles,
  Grid,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Transition,
  useMantineTheme,
} from '@mantine/core';
import { useDidUpdate, useMediaQuery } from '@mantine/hooks';
import { useContainerStyles } from '@styles/containerStyles';
import { useTextStyles } from '@styles/typography';
import { NextRouter, useRouter } from 'next/router';
import { DataProps } from 'pages';
import { useEffect, useState } from 'react';
import type { AccommodationClean } from 'types/accommodationClean';
import { Card } from './Card';
import { IconText } from './SmallParts/IconText';
import { TypePrice } from './SmallParts/TypePrice';

function filterArray(array: AccommodationClean[] | null, router: NextRouter) {
  if (!array) return array;
  const results = array.filter((item) => {
    let { location, type } = router.query;
    if (type === 'bnb') type = 'bed & breakfast';
    if (type === 'hotels') type = 'hotel';
    if (type === 'guesthouses') type = 'guesthouse';
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
  cardsContainer: {
    marginTop: theme.other.sectionSpacing.lg,
    color: theme.colors.gray[6],
  },
  cardColumn: {
    [theme.fn.smallerThan(680)]: {
      '&:not(:last-of-type)': {
        marginBottom: theme.other.largeSpacing.sm,
      },
    },
  },
  cardGrid: {
    // To avoid layout shifts.
    minHeight: 'calc(100vh - 60px - 213px)',
    alignContent: 'flex-start',
  },
}));
const CardGrid = (
  array: AccommodationClean[] | null,
  wrapBp: boolean,
  classes: { cardColumn: string }
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
    </Grid.Col>
  ));
};
const duration = 400;
export function CardSection({ data }: DataProps) {
  const router = useRouter();
  const { classes, cx } = useStyles();
  const {
    classes: { container },
  } = useContainerStyles();
  const theme = useMantineTheme();
  const gutterBp = useMediaQuery('(min-width: 1200px)');
  const wrapBp = useMediaQuery('(min-width: 680px)');

  const [transitionStage, setTransitionStage] = useState(false);
  const [dataArray, setDataArray] = useState(data);
  const content = CardGrid(dataArray, wrapBp, classes);

  useEffect(() => {
    setTransitionStage(true);
    if (!data) return;
    const newData = filterArray(data, router);
    setDataArray((o) => {
      return newData;
    });
  }, []);
  useDidUpdate(() => {
    setTransitionStage(false);

    setTimeout(() => {
      if (!data) return;
      const newData = router.query ? filterArray(data, router) : data;
      setDataArray((o) => {
        return newData;
      });
      setTransitionStage(true);
    }, duration);
  }, [router.query]);
  return (
    <Box className={container}>
      <Box
        mb={theme.other.sectionSpacing.xxl}
        component="section"
        className={classes.cardsContainer}
      >
        <Transition
          mounted={transitionStage}
          transition="pop"
          duration={duration}
          timingFunction="ease"
        >
          {(styles) => (
            <Grid
              style={styles}
              className={classes.cardGrid}
              gutter={gutterBp ? 48 : 24}
              m={gutterBp ? -24 : -12}
            >
              {content}
            </Grid>
          )}
        </Transition>
      </Box>
    </Box>
  );
}
