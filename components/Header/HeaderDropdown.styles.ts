import { createStyles, MantineNumberSize } from '@mantine/core';

export const dropdownStyles = createStyles((theme, menuBreak: MantineNumberSize) => ({
  vertical: {
    display: 'none',
    flexDirection: 'column',
    [theme.fn.smallerThan(menuBreak)]: {
      display: 'flex',
    },
    '& > *': {
      padding: theme.other.smallSpacing.lg,
    },
  },
}));
