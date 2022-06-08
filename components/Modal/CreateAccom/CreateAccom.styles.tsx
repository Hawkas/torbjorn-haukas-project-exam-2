import { createStyles } from '@mantine/core';

export const useCreateAccomStyles = createStyles((theme) => {
  const paddingBreak = theme.fn.largerThan('xs');
  return {
    formWrapper: {
      position: 'relative',
      backgroundColor: theme.white,
      borderRadius: theme.radius.lg,
      border: `1px solid ${theme.colors.gray[2]}`,
    },

    form: {
      position: 'relative',
      padding: theme.other.smallSpacing.lg,
      marginBottom: theme.other.largeSpacing.sm,
      [paddingBreak]: {
        padding: theme.other.largeSpacing.sm,
      },
    },
    amenitiesLabel: {
      letterSpacing: theme.other.letterSpacing.xs,
      fontSize: theme.fontSizes.xs,
      fontWeight: theme.other.fontWeights.bold,
    },
    amenityContainer: {
      display: 'flex',
      flexFlow: 'row wrap',
      padding: theme.other.smallSpacing.lg,
      gap: theme.other.smallSpacing.lg,
      height: '100%',
      '& > *': {
        flexGrow: 1,
        flexBasis: '150px',
      },
    },
    contactInfoWrapper: {
      border: 0,
      marginTop: theme.spacing.xl,
      [theme.fn.smallerThan('xs')]: {
        padding: 0,
      },
      '& > legend': {
        display: 'inline-block',
        marginBottom: '4px',
        letterSpacing: theme.other.letterSpacing.xs,
        fontSize: theme.fontSizes.xs,
        fontWeight: theme.other.fontWeights.bold,
        color: theme.colors.gray[9],
      },
    },
    root: {
      position: 'relative',
    },

    input: {
      height: 'auto',
      borderColor: theme.colors.gray[2],
      fontSize: theme.other.fontSizes.md,
      paddingTop: theme.other.smallSpacing.xxl,
    },

    label: {
      position: 'absolute',
      pointerEvents: 'none',
      letterSpacing: theme.other.letterSpacing.xs,
      fontSize: theme.fontSizes.xs,
      fontWeight: theme.other.fontWeights.bold,
      paddingLeft: theme.spacing.sm,
      paddingTop: theme.spacing.sm / 2,
      zIndex: 1,
    },
    numberInput: {
      minWidth: '104px',
    },
  };
});
