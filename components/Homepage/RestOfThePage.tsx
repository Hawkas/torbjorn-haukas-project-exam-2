import { GetInTouch } from '@components/Modal/Contact';
import { ContactIconsList } from '@components/Modal/ContactIconsList';
import { fishingVillage, sunset } from '@globals/images';
import { ImageLinks } from '@Homepage/HomeSectionParts/ImageLinks';
import { Center, Container, useMantineTheme } from '@mantine/core';
import { containerStyles } from '@styles/containerStyles';
import React from 'react';
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
  } = containerStyles();

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
      <GetInTouch />
    </>
  );
}
