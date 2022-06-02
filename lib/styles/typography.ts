import { createStyles } from '@mantine/core';

export const useTextStyles = createStyles((theme) => ({
  displayH1: {
    color: theme.white,
    fontSize: theme.other.headingSizes.display,
    fontFamily: theme.other.fontFamilies.display,
    fontWeight: theme.other.fontWeights.regular,
    lineHeight: theme.other.lineHeights.display,
  },
  primaryH2: {
    letterSpacing: theme.other.letterSpacing.xs,
  },
  primaryH3: {
    letterSpacing: theme.other.letterSpacing.xs,
  },
  serifH2: {
    fontSize: theme.other.headingSizes.serif,
    fontFamily: theme.other.fontFamilies.serif,
    fontWeight: theme.other.fontWeights.medium,
  },
  subHeader: {
    color: theme.colors.gray[6],
    fontSize: theme.other.fontSizes.sm,
    fontWeight: theme.other.fontWeights.bold,
    lineHeight: '1',
    letterSpacing: theme.other.letterSpacing.lg,
    textTransform: 'uppercase',
  },
  cardHeader: {
    fontSize: theme.other.fontSizes.md,
    fontWeight: theme.other.fontWeights.medium,
    lineHeight: '1',
    letterSpacing: theme.other.letterSpacing.xs,
    marginTop: 0,
    marginBottom: 0,
  },
  label: {
    fontSize: theme.other.fontSizes.xs,
    fontWeight: theme.other.fontWeights.bold,
    lineHeight: theme.other.lineHeights.heading,
    letterSpacing: theme.other.letterSpacing.sm,
  },
  buttonAlt: {
    color: theme.colors.blue[6],
    fontSize: theme.other.fontSizes.md,
    fontWeight: theme.other.fontWeights.bold,
    margin: 0,
    lineHeight: '1',
    letterSpacing: theme.other.letterSpacing.md,
    textTransform: 'uppercase',
    [theme.fn.largerThan(808)]: {
      fontSize: theme.other.fontSizes.sm,
    },
    [theme.fn.largerThan(914)]: {
      fontSize: theme.other.fontSizes.md,
    },
  },
  buttonPrimary: {
    fontSize: theme.other.fontSizes.md,
    fontWeight: theme.other.fontWeights.semiBold,
  },
  info: {
    fontWeight: theme.other.fontWeights.medium,
  },
  infoAlt: {
    fontWeight: theme.other.fontWeights.medium,
    lineHeight: theme.other.lineHeights.display,
    letterSpacing: theme.other.letterSpacing.sm,
  },
  breadcrumb: {
    fontSize: 'clamp(0.875rem, 0.7188rem + 0.7813vw, 1rem)',
  },
  locationTag: {
    fontSize: theme.other.fontSizes.sm,
    fontWeight: theme.other.fontWeights.semiBold,
    lineHeight: 1,
  },
  finePrint: {
    fontSize: theme.other.fontSizes.xs,
    color: theme.colors.gray[5],
  },
  priceBig: {
    fontSize: theme.other.fontSizes.xxl,
    lineHeight: theme.other.lineHeights.heading,
    fontWeight: theme.other.fontWeights.extraBold,
  },
  priceSmall: {
    fontSize: theme.other.fontSizes.lg,
    lineHeight: theme.other.lineHeights.heading,
    fontWeight: theme.other.fontWeights.extraBold,
  },
}));
