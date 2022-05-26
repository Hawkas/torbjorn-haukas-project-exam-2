import { BackgroundImage, Box, Center, Grid, Title } from '@mantine/core';
import { textStyles } from 'lib/styles/typography';
import { containerStyles } from '../../lib/styles/containerStyles';
import { SearchBar } from '../SearchBar/SearchBar';
import { heroStyles } from './HeroSection.styles';

export function HeroSection() {
  const { classes } = heroStyles();
  const {
    classes: { container },
  } = containerStyles();
  const {
    classes: { displayH1 },
  } = textStyles();
  return (
    <Box className={classes.fluidContainer} component="header" px="0">
      <BackgroundImage src="/fjordview-2556w.jpg">
        <Box className={classes.imageOverlay}>
          <Center className={container}>
            <Grid
              className={classes.contentGrid}
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
                <SearchBar />
              </Grid.Col>
            </Grid>
          </Center>
        </Box>
      </BackgroundImage>
    </Box>
  );
}
