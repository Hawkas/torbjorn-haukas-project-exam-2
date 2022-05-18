import { BackgroundImage, Center, Container, Box, Grid, Group } from '@mantine/core';
import { Heading } from '../Headings/Heading';
import heroImg from '../../public/fjordview-2556w.jpg';
import { SearchBar } from '../SearchBar/SearchBar';
import { settings } from '../../globals/constants/settings';

const { headerHeight } = settings;

export function Homepage() {
  return (
    <Container fluid px="0">
      <BackgroundImage src={heroImg.src}>
        <Box
          sx={(theme) => ({
            backgroundColor: theme.fn.rgba('#000', 0.3),
          })}
        >
          <Center>
            <Grid
              gutter={0}
              grow
              justify="center"
              align="flex-start"
              px="md"
              sx={(theme) => ({
                marginTop: headerHeight,
                paddingTop: 'clamp(10rem, 5.2381rem + 23.8095vw, 20rem)',
                [theme.fn.largerThan('xs')]: {
                  padding: `revert ${theme.other.largeSpacing.sm}`,
                },
              })}
              pb={64}
            >
              <Grid.Col span={12} mb={160}>
                <Heading className="displayH1" blue order={1} align="center">
                  Discover
                  <br />
                  Vestland
                </Heading>
              </Grid.Col>
              <Grid.Col span={12}>
                <SearchBar />
              </Grid.Col>
            </Grid>
          </Center>
        </Box>
      </BackgroundImage>
    </Container>
  );
}
