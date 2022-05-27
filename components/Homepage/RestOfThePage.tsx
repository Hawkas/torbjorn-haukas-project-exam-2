import { fishingVillage, sunset } from 'lib/images';
import { ImageLinks } from '@Homepage/HomeSectionParts/ImageLinks';
import { Center, Container, useMantineTheme } from '@mantine/core';
import { useContainerStyles } from 'lib/styles/containerStyles';
import {
  ArticleFirst,
  ArticleGrid,
  ArticleSecond,
  ArticleThird,
} from './HomeSectionParts/ArticleParts';

export function RestOfThePage() {
  const theme = useMantineTheme();
  const {
    classes: { container },
  } = useContainerStyles();

  return (
    <>
      <article>
        <Container className={container} mb={theme.other.sectionSpacing.xxl}>
          <ArticleGrid image={fishingVillage}>
            <ArticleFirst />
          </ArticleGrid>
          <section>
            <ImageLinks />
          </section>
        </Container>
      </article>
      <article>
        <Container className={container} mb={theme.other.sectionSpacing.xxl}>
          <ArticleGrid imageLeft tallImg image={sunset}>
            <ArticleSecond />
          </ArticleGrid>
        </Container>
      </article>
      <article>
        <Container className={container} mb={theme.other.sectionSpacing.xxl}>
          <Center sx={{ flexDirection: 'column' }}>
            <ArticleThird />
          </Center>
        </Container>
      </article>
    </>
  );
}
