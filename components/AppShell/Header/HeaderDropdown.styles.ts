import { createStyles, MantineNumberSize } from '@mantine/core';

export const useDropdownStyles = createStyles((theme, menuBreak: MantineNumberSize) => ({
  vertical: {
    height: '100vh',
    display: 'none',
    flexDirection: 'column',
    [theme.fn.smallerThan(menuBreak)]: {
      display: 'flex',
    },
    '& a:not(:nth-of-type(6)': {
      padding: theme.other.largeSpacing.sm,
      [theme.fn.smallerThan('xs')]: {
        padding: theme.other.smallSpacing.lg,
      },
    },
  },
  menu: {
    '& a.mantine-Anchor-root': {
      padding: theme.other.largeSpacing.sm,
      [theme.fn.smallerThan('xs')]: {
        padding: theme.other.smallSpacing.lg,
      },
    },
  },
}));
