import { createStyles } from '@mantine/core';

export interface StyleProps {
  blue?: true | false;
}

export const useStyles = createStyles((theme, { blue }: StyleProps) => ({
  displayH1: {
    color: theme.white,
    fontSize: theme.other.headingSizes.display.big,
    fontFamily: theme.other.fontFamilies.display,
    fontWeight: theme.other.fontWeights.regular,
    lineHeight: theme.other.lineHeights.display,
    [theme.fn.smallerThan('md')]: {
      fontSize: theme.other.headingSizes.display.small,
    },
  },
  primaryH1: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : blue
        ? theme.colors.blue[8]
        : theme.black,
    [theme.fn.smallerThan('md')]: {
      fontSize: theme.other.headingSizes.primary.small.h1,
    },
  },
  primaryH2: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : blue
        ? theme.colors.blue[8]
        : theme.black,
    letterSpacing: theme.other.letterSpacing.sm,
    [theme.fn.smallerThan('md')]: {
      fontSize: theme.other.headingSizes.primary.small.h2,
    },
  },
  primaryH3: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : blue
        ? theme.colors.blue[8]
        : theme.black,
    letterSpacing: theme.other.letterSpacing.sm,
    [theme.fn.smallerThan('md')]: {
      fontSize: theme.other.headingSizes.primary.small.h3,
    },
  },
  serifH2: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : blue
        ? theme.colors.blue[8]
        : theme.black,
    fontSize: theme.other.headingSizes.serif.big,
    fontFamily: theme.other.fontFamilies.serif,
    fontWeight: theme.other.fontWeights.medium,
    [theme.fn.smallerThan('md')]: {
      fontSize: theme.other.headingSizes.serif.small,
    },
  },
}));
