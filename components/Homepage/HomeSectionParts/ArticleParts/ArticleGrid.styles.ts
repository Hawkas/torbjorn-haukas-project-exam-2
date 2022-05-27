import { createStyles } from '@mantine/core';

const heightScaling = (
  sidePadding: string | number | undefined,
  image: { height: number; width: number }
) => {
  const heightRatio = image.height / image.width;
  return `calc((100vw - (${sidePadding} * 2)) * ${heightRatio})`;
};
export type ImageObject = { height: number; width: number; src: string; alt?: string };

export const useArticleStyles = createStyles((theme, image: ImageObject, getRef) => ({
  imageTaller: {
    ref: getRef('imageTaller'),
  },
  textContainer: {
    alignSelf: 'center',
    maxWidth: '560px',
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.other.largeSpacing.xl,
      order: 1,
    },
  },
  imageContainer: {
    position: 'relative',
    overflow: 'hidden',
    minHeight: '390px',
    height: '100%',
    maxHeight: '100%',
    boxShadow: theme.shadows.md,
    borderRadius: theme.radius.xs,
    [`&.${getRef('imageTaller')}`]: {
      [theme.fn.largerThan('sm')]: { minHeight: '700px' },
    },
    [theme.fn.smallerThan('sm')]: {
      minHeight: '225px',
      height: heightScaling(theme.other.largeSpacing.sm, image),
      [theme.fn.smallerThan('xs')]: {
        height: heightScaling(theme.other.smallSpacing.lg, image),
      },
    },
  },
}));
