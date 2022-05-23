import React from 'react';
import { Image, createStyles } from '@mantine/core';
import { ImageObject } from './ArticleGrid.styles';

export const imageStyles = createStyles((theme, _param, getRef) => ({
  tallImg: {
    ref: getRef('tallImg'),
  },
  wideImg: {
    ref: getRef('wideImg'),
  },

  imageWrap: {
    ...theme.fn.cover(),
    width: '100%',
    height: '100%',
    [`&.${getRef('tallImg')}`]: {
      [theme.fn.largerThan('sm')]: {
        minHeight: '700px',
      },
      [`& .${getRef('image')}`]: {
        objectPosition: 'left bottom',
      },
    },
  },
  image: {
    ref: getRef('image'),
    objectPosition: 'left top',
  },
}));

export interface ArticleImageProps {
  image: ImageObject;
  tallImg?: boolean;
}

export function ArticleImage({ image, tallImg }: ArticleImageProps) {
  const { classes, cx } = imageStyles();
  return (
    <>
      <Image
        imageProps={{ height: image.height, width: image.width }}
        radius="xs"
        height="100%"
        classNames={{
          imageWrapper: cx(classes.imageWrap, { [classes.tallImg]: tallImg }),
          image: classes.image,
        }}
        src={image.src}
        alt={image.alt}
      />
    </>
  );
}
