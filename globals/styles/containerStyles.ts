import { createStyles } from '@mantine/core';

export const containerStyles = createStyles((theme) => ({
  container: {
    margin: '0 auto',
    width: '100%',
    maxWidth: theme.other.containerMax,
    padding: '0 ' + theme.other.largeSpacing.sm,
    [theme.fn.smallerThan('xs')]: { padding: '0 ' + theme.other.smallSpacing.lg },
    [theme.fn.largerThan('lg')]: { padding: '0 ' + theme.other.largeSpacing.md },
    [theme.fn.largerThan('xl')]: { padding: '0' },
  },
}));
