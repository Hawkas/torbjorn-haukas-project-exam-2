import { BackgroundImage, Center, Box, Grid, Title } from '@mantine/core';
import heroImg from '../../public/fjordview-2556w.jpg';
import { SearchBar } from '../SearchBar/SearchBar';
import { containerStyles } from '../../globals/styles/containerStyles.styles';
import { heroStyles } from './HeroSection.styles';
import { textStyles } from '../../globals/styles/typography';

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
      <BackgroundImage src={heroImg.src}>
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
