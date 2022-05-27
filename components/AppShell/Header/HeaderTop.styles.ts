import { createStyles, MantineNumberSize } from '@mantine/core';

export const useHeaderStyles = createStyles((theme, menuBreak: MantineNumberSize) => ({
  headerInner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  horizontal: {
    display: 'flex',
    gap: '2.5rem',
    paddingTop: theme.other.smallSpacing.sm,
    [theme.fn.smallerThan(menuBreak)]: {
      display: 'none',
    },
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
}));
