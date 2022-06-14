import { filterArray } from '@helpers/filterArray';
import { Box, createStyles, Grid, Transition } from '@mantine/core';
import { useDidUpdate, useMediaQuery } from '@mantine/hooks';
import { useContainerStyles } from '@styles/containerStyles';
import { Session } from 'next-auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { DataProps } from 'types/commonProps';
import { CardGrid } from './CardsLayout/CardGrid';

const useStyles = createStyles((theme) => ({
  cardsContainer: {
    marginTop: theme.other.sectionSpacing.lg,
    marginBottom: theme.other.sectionSpacing.xxl,
    color: theme.colors.gray[6],
    minHeight: 'calc(100vh - 60px - 213px)',
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

    alignContent: 'flex-start',
  },
}));
const duration = 400;
export function CardSection({
  data,
  admin,
  session,
  refreshPage,
}: DataProps & { admin?: boolean; session?: Session; refreshPage?: () => void }) {
  const router = useRouter();
  const { classes } = useStyles();
  const {
    classes: { container },
  } = useContainerStyles();
  // Media query hooks to control Mantine prop values
  const gutterBp = useMediaQuery('(min-width: 1200px)');
  const wrapBp = useMediaQuery('(min-width: 680px)');

  const [transitionStage, setTransitionStage] = useState(false);
  const [dataArray, setDataArray] = useState(data);
  const content = CardGrid({
    array: dataArray,
    wrapBp,
    classes,
    admin,
    session,
    refreshPage,
  });

  // This will run only once when the component mounts. Sort the data using query parameters if any,
  // and reveal it by changing transition stage.
  useEffect(() => {
    const newData = filterArray({ array: data, router });
    setDataArray(newData);
    setTransitionStage(true);
  }, []);

  // This is mantine's custom hook that will ONLY run when the state of its dependencies change from their initial value.
  // I.e it doesn't run at all when component mounts.
  useDidUpdate(() => {
    // If the query parameters change, it will fade out the cards.
    setTransitionStage(false);

    // Then, in a timeout function delayed to the transition's timing duration:
    setTimeout(() => {
      // If router has either of these query parameters, re-sort the data array, else revert to the default array
      const newData =
        router.query.location || router.query.type ? filterArray({ array: data, router }) : data;

      // Set the new data as the rendered output state, while it's still invisible.
      setDataArray(newData);

      // Then reveal it
      setTransitionStage(true);
    }, duration);
  }, [router.query, data]);
  return (
    <Box className={container}>
      <Box component="section" className={classes.cardsContainer}>
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
