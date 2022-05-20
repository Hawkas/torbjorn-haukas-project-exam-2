import { createStyles, MantineNumberSize } from '@mantine/core';
import { settings } from '../../globals/constants/settings';

export const headerStyles = createStyles((theme, menuBreak: MantineNumberSize) => ({
  header: {
    transition: 'all 0.5s linear 0s',
    borderBottom: '1px solid transparent',
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  filled: {
    borderColor: theme.white,
    backgroundColor: theme.fn.rgba(theme.colors.blue[8], 0.7),
  },
  headerInner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
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
  horizontal: {
    display: 'flex',
    gap: '2.5rem',
    paddingTop: theme.other.smallSpacing.sm,
    [theme.fn.smallerThan(menuBreak)]: {
      display: 'none',
    },
  },
}));
