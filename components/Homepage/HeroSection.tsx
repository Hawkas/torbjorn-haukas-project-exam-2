import { BackgroundImage, Box, Center, Grid, Title } from '@mantine/core';
import { useTextStyles } from 'lib/styles/typography';
import { HomepageProps } from 'pages';
import React from 'react';
import type { AccommodationObject, Accommodations } from 'types/accommodationRaw';
import { useContainerStyles } from '../../lib/styles/containerStyles';
import { SearchBar } from '../SearchBar/SearchBar';
import { useHeroStyle } from './HeroSection.styles';

export function HeroSection({ data }: HomepageProps) {
  const { classes, cx } = useHeroStyle();
  const {
    classes: { container, firstContainer },
  } = useContainerStyles();
  const {
    classes: { displayH1 },
  } = useTextStyles();
  return (
    <Box className={classes.fluidContainer} component="header" px="0">
      <BackgroundImage src="/fjordview-2556w.jpg">
        <Box className={classes.imageOverlay}>
          <Center>
            <Grid
              className={cx(container, firstContainer, classes.contentGrid)}
              gutter={0}
              grow
              justify="center"
              align="flex-start"
              pb={64}
            >
              <Grid.Col span={12} mb={160}>
                <Title className={displayH1} order={1} align="center">
                  Discover
                  <br />
                  Vestland
                </Title>
              </Grid.Col>
              <Grid.Col span={12}>
                <SearchBar data={data} />
              </Grid.Col>
            </Grid>
          </Center>
        </Box>
      </BackgroundImage>
    </Box>
  );
}
