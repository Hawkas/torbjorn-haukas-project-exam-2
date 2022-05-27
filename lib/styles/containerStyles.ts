import { createStyles } from '@mantine/core';

export const useContainerStyles = createStyles((theme, _params, getRef) => ({
  container: {
    margin: '0 auto',
    width: '100%',
    maxWidth: theme.other.containerMax,
    paddingLeft: theme.other.largeSpacing.sm,
    paddingRight: theme.other.largeSpacing.sm,
    [theme.fn.smallerThan('xs')]: {
      paddingLeft: theme.other.smallSpacing.lg,
      paddingRight: theme.other.smallSpacing.lg,
    },
    [theme.fn.largerThan('lg')]: {
      paddingLeft: theme.other.largeSpacing.md,
      paddingRight: theme.other.largeSpacing.md,
    },
    [theme.fn.largerThan('xl')]: { paddingLeft: 0, paddingRight: 0 },
    [`&.${getRef('firstContainer')}`]: {
      marginTop: 'var(--mantine-header-height)',
    },
  },
  firstContainer: {
    ref: getRef('firstContainer'),
  },
}));
