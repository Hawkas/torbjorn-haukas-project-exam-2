import { filterArray } from '@helpers/filterArray';
import { Box, createStyles, Grid, Transition, useMantineTheme } from '@mantine/core';
import { useDidUpdate, useMediaQuery } from '@mantine/hooks';
import { useContainerStyles } from '@styles/containerStyles';
import { useRouter } from 'next/router';
import { DataProps } from 'pages';
import { useEffect, useState } from 'react';
import { CardGrid } from './SmallParts/CardGrid';

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
const duration = 400;
export function CardSection({ data, admin }: DataProps & { admin?: boolean }) {
  const router = useRouter();
  const { classes } = useStyles();
  const {
    classes: { container },
  } = useContainerStyles();
  const theme = useMantineTheme();
  const gutterBp = useMediaQuery('(min-width: 1200px)');
  const wrapBp = useMediaQuery('(min-width: 680px)');

  const [transitionStage, setTransitionStage] = useState(false);
  const [dataArray, setDataArray] = useState(data);
  const content = CardGrid(dataArray, wrapBp, classes, admin);

  useEffect(() => {
    const newData = filterArray({ array: data, router });
    setDataArray((o) => {
      return newData;
    });
    setTransitionStage(true);
  }, []);
  useDidUpdate(() => {
    setTransitionStage(false);

    setTimeout(() => {
      const newData = router.query ? filterArray({ array: data, router }) : data;
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
