import { createStyles, MantineNumberSize } from '@mantine/core';

export type LinkStyleProps = {
  menuBreak: MantineNumberSize;
};

export const useNavStyles = createStyles((theme, { menuBreak }: LinkStyleProps, getRef) => ({
  button: { display: 'flex', justifyContent: 'flex-start' },
  links: {
    color: theme.black,
    lineHeight: theme.other.lineHeights.body,
    fontWeight: theme.other.fontWeights.medium,
    fontSize: theme.fontSizes.md,
    letterSpacing: theme.other.letterSpacing.sm,
    [theme.fn.smallerThan(menuBreak)]: {
      padding: theme.other.largeSpacing.sm,
      [theme.fn.smallerThan('xs')]: {
        padding: theme.other.smallSpacing.lg,
      },
    },
    [theme.fn.largerThan(menuBreak)]: {
      color: theme.fn.rgba(theme.white, 0.75),
      '&:hover': {
        color: theme.white,
        textDecoration: 'none',
      },
    },

    [`&.${getRef('active')}`]: {
      color: theme.white,
      [theme.fn.smallerThan(menuBreak)]: {
        backgroundColor: theme.colors.blue[0],
        color: theme.colors.blue[6],
        textDecoration: 'none',
      },
    },
  },
  active: {
    ref: getRef('active'),
  },
}));
