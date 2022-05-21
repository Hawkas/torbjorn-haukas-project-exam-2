import { createStyles } from '@mantine/core';

export const articleStyles = createStyles((theme) => ({
  textContainer: {
    maxWidth: '560px',
    [theme.fn.smallerThan('sm')]: {
      order: 1,
      marginTop: theme.other.largeSpacing.lg,
    },
  },
  imageContainer: {
    position: 'relative',
    overflow: 'hidden',
    minHeight: '390px',
    maxHeight: '472px',
    boxShadow: theme.shadows.md,
    borderRadius: theme.radius.xs,
    [theme.fn.smallerThan('sm')]: {
      minHeight: '225px',
      height: `calc((100vw - 32px) * 0.5846835443)`,
    },
  },
  image: {
    objectPosition: 'left top',
  },
  imageWrap: {
    ...theme.fn.cover(),
    width: '100%',
    height: '100%',
    maxHeight: '472px',
  },
}));
