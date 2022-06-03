import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => {
  const breakPoint = theme.fn.smallerThan('sm');
  const paddingBreak = theme.fn.largerThan('xs');
  const outerEdge = '4px';

  return {
    wrapper: {
      position: 'relative',
      display: 'flex',
      backgroundColor: theme.white,
      borderRadius: theme.radius.lg,
      padding: outerEdge,
      border: `1px solid ${theme.colors.gray[2]}`,

      [breakPoint]: {
        flexDirection: 'column',
      },
    },

    form: {
      position: 'relative',
      flex: 1,
      padding: `calc(${theme.other.smallSpacing.lg} - ${outerEdge})`,
      paddingLeft: `calc(${theme.other.largeSpacing.xxl} - ${outerEdge})`,
      marginBottom: `calc(${theme.other.largeSpacing.sm} - ${outerEdge})`,
      borderLeft: 0,
      [breakPoint]: {
        paddingLeft: `calc(${theme.other.smallSpacing.lg} - ${outerEdge})`,
      },
      [paddingBreak]: {
        padding: `calc(${theme.other.largeSpacing.sm} - ${outerEdge})`,
      },
    },
    fieldInput: {
      flex: 1,

      '& + &': {
        marginLeft: theme.spacing.md,

        [breakPoint]: {
          marginLeft: 0,
          marginTop: theme.spacing.md,
        },
      },
    },

    fieldsGroup: {
      display: 'flex',

      [breakPoint]: {
        flexDirection: 'column',
      },
    },

    contacts: {
      position: 'relative',
      borderRadius: theme.radius.lg - 2,
      backgroundImage: theme.fn.linearGradient(92, theme.colors.blue[8], '#051524'),
      border: '1px solid transparent',
      padding: theme.other.largeSpacing.sm,
      flex: '0 0 312px',
      paddingLeft: `calc(${theme.other.largeSpacing.sm} - ${outerEdge})`,

      [paddingBreak]: {
        padding: `calc(${theme.other.largeSpacing.sm} - ${outerEdge})`,
      },
      [breakPoint]: {
        order: 1,
        marginTop: theme.other.largeSpacing.xl,
      },
      paddingBottom: theme.other.largeSpacing.xxl,
    },
    iconList: {
      marginLeft: '-4px',
    },
    title: {
      marginBottom: theme.other.largeSpacing.md,
      fontSize: theme.other.fontSizes.xxl,
      fontWeight: theme.other.fontWeights.semiBold,
    },
    root: {
      position: 'relative',
    },
    textInput: {
      padding: theme.other.smallSpacing.lg,
      minHeight: theme.other.largeSpacing.xl,
      // This is to unstyle webkit's autofill bullshit
      boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0), inset 0 0 0 100px rgba(255, 255, 255,1)',
    },
    label: {
      position: 'absolute',
      zIndex: 9,
      top: '-7px',
      left: -4,
      backgroundColor: theme.white,
      padding: `0 ${theme.other.smallSpacing.sm}`,
      marginLeft: theme.other.smallSpacing.lg,
      textTransform: 'uppercase',
    },
    control: {
      marginTop: theme.other.largeSpacing.md,
      [breakPoint]: {
        flex: 1,
      },
    },
  };
});
