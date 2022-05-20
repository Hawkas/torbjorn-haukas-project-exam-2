import React from 'react';
import {
  Container,
  Grid,
  SimpleGrid,
  Skeleton,
  useMantineTheme,
  createStyles,
} from '@mantine/core';
import { containerStyles } from '../../globals/styles/containerStyles.styles';
import fishingVillage from '../../public/fishing_village-1000w-629h.jpg';
import hotel from '../../public/large_hotel_1000w-667h.jpg';
import guesthouse from '../../public/large_guesthouse_1000w-667h.jpg';
import bnb from '../../public/large_bnb_1000w-667h.jpg';
import Image from 'next/image';
const introStyles = createStyles((theme) => ({
  textContainer: {
    maxWidth: '560px',
  },
  imageContainer: {
    maxWidth: '670px',
    maxHeight: '390px',
  },
}));
const PRIMARY_COL_HEIGHT = 390;
export function IntroSection() {
  const theme = useMantineTheme();
  const { classes } = introStyles();
  const {
    classes: { container },
  } = containerStyles();
  const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;

  return (
    <Container className={container} mb={theme.other.sectionSpacing.xxl}>
      <Grid
        mt={theme.other.sectionSpacing.lg}
        mb={theme.other.sectionSpacing.sm}
        gutter={0}
        columns={1320}
        justify="space-between"
        align="flex-start"
      >
        <Grid.Col span={560}>
          <Skeleton
            className={classes.textContainer}
            height={PRIMARY_COL_HEIGHT}
            radius="md"
            animate={false}
          />
        </Grid.Col>
        <Grid.Col span={672}>
          <Image
            src={fishingVillage}
            width={1000}
            height={629}
            alt="Norwegian fishing village with norwegian flag"
          />
        </Grid.Col>
      </Grid>
      <SimpleGrid cols={3} spacing="xl" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <Image
          src={hotel}
          width={1000}
          height={667}
          alt="Inside of hotel room viewed from just outside the door"
        />
        <Image src={guesthouse} width={1000} height={667} alt="Scrappy guesthouse with bunkbeds" />
        <Image src={bnb} width={1000} height={667} alt="A bed with breakfast on it. Fitting." />
      </SimpleGrid>
    </Container>
  );
}
