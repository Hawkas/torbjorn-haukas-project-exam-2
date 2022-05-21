import React from 'react';
import {
  Container,
  Grid,
  SimpleGrid,
  Skeleton,
  Title,
  Text,
  useMantineTheme,
  createStyles,
  Button,
  Image,
  Paper,
  Box,
} from '@mantine/core';
import { containerStyles } from '../../globals/styles/containerStyles.styles';
import fishingVillage from '../../public/fishing_village-1000w-629h.jpg';
import hotel from '../../public/large_hotel_1000w-667h.jpg';
import guesthouse from '../../public/large_guesthouse_1000w-667h.jpg';
import bnb from '../../public/large_bnb_1000w-667h.jpg';
import { textStyles } from '../../globals/styles/typography';
import { ImageLinks } from './HomeSectionParts/ImageLinks';

const PRIMARY_COL_HEIGHT = 390;

export function IntroSection() {
  const theme = useMantineTheme();
  const {
    classes: { container },
  } = containerStyles();
  const { classes: textClass } = textStyles();
  const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;

  return (
    <Container className={container} mb={theme.other.sectionSpacing.xxl}>
      <Grid
        mt={theme.other.sectionSpacing.lg}
        mb={theme.other.sectionSpacing.sm}
        gutter={0}
        columns={1320}
        justify="space-between"
        align="stretch"
      >
        <Grid.Col sm={672} md={560} xs={1320} className={classes.textContainer}>
          <Title mb={theme.other.smallSpacing.xl} className={textClass.serifH2}>
            <Text mb={theme.other.smallSpacing.xl} className={textClass.subHeader}>
              We are Holidaze
            </Text>
            <Text inherit>We help you find accommodations</Text>
          </Title>
          <Text>
            Holidaze is here to help travellers like you find lodging that suits your budget and
            needs. Whether you’d prefer to stay in the city of Bergen or a cozy cabin surrounded by
            spruce and pine trees, we’ll assist you in finding a comfortable place to relax during
            your stay.
          </Text>
          <Button
            radius={'md'}
            size="xl"
            mt={theme.other.largeSpacing.md}
            px={theme.other.smallSpacing.xxl}
            py={theme.other.smallSpacing.md}
            style={{ height: theme.other.largeSpacing.xl, boxShadow: theme.shadows.sm }}
            classNames={{ label: textClass.buttonPrimary }}
            sx={{ background: theme.other.gradient }}
          >
            View all accommodations
          </Button>
        </Grid.Col>
        <Grid.Col sm={560} md={672} xs={1320} className={classes.imageContainer}>
          <Image
            radius="xs"
            height="100%"
            classNames={{
              imageWrapper: classes.imageWrap,
              image: classes.image,
            }}
            src={fishingVillage.src}
            alt="Norwegian fishing village with norwegian flag"
          />
        </Grid.Col>
      </Grid>
      <ImageLinks />
    </Container>
  );
}
