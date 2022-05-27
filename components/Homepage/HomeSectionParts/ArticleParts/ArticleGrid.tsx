import { Grid, useMantineTheme } from '@mantine/core';
import React from 'react';
import { useArticleStyles, ImageObject } from './ArticleGrid.styles';
import { ArticleImage } from './ArticleImage';

interface ArticleBlockProps {
  image: ImageObject;
  tallImg?: boolean;
  imageLeft?: boolean;
  children: React.ReactElement;
}

export function ArticleGrid({ image, tallImg, imageLeft, children }: ArticleBlockProps) {
  const theme = useMantineTheme();
  const { classes, cx } = useArticleStyles(image);
  return (
    <Grid
      mt={theme.other.sectionSpacing.lg}
      mb={theme.other.sectionSpacing.sm}
      gutter={0}
      columns={1320}
      justify="space-between"
      align="stretch"
    >
      <Grid.Col
        sm={672}
        md={imageLeft ? 672 : 560}
        xs={1320}
        className={classes.textContainer}
        sx={{ order: imageLeft ? 1 : 0 }}
      >
        {children}
      </Grid.Col>
      <Grid.Col
        sm={560}
        md={imageLeft ? 560 : 672}
        xs={1320}
        className={cx(classes.imageContainer, { [classes.imageTaller]: tallImg })}
      >
        <ArticleImage tallImg={tallImg} image={image} />
      </Grid.Col>
    </Grid>
  );
}
