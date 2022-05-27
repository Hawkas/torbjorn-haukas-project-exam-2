import { createStyles } from '@mantine/core';

export const useSearchStyles = createStyles((theme) => ({
  searchbar: {
    width: '100%',
    padding: theme.other.smallSpacing.xl,
    boxShadow: theme.shadows.xl,
    borderRadius: theme.radius.md,
    '&::placeholder': {
      fontSize: theme.fontSizes.md,
      lineHeight: theme.lineHeight,
      color: theme.colors.gray[5],
    },
  },
  icon: { color: theme.colors.gray[5], fontSize: '1.3rem' },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    margin: '0 auto',
    minWidth: '288px',
    maxWidth: '648px',
    [theme.fn.smallerThan(320)]: {
      minWidth: '100%',
    },
  },
  label: {
    color: theme.white,
    textShadow: '0px 8px 12px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    marginBottom: theme.other.smallSpacing.xxl,
  },
}));
