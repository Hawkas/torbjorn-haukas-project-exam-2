import { createStyles } from '@mantine/core';

export const textStyles = createStyles((theme) => ({
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
    fontSize: theme.other.fontSizes.sm,
    fontWeight: theme.other.fontWeights.bold,
    lineHeight: '1',
    letterSpacing: theme.other.letterSpacing.lg,
    textTransform: 'uppercase',
  },
  cardHeader: {
    fontSize: theme.other.fontSizes.md,
    fontWeight: theme.other.fontWeights.regular,
    lineHeight: '1',
    letterSpacing: theme.other.letterSpacing.xs,
  },
  label: {
    fontSize: theme.other.fontSizes.xs,
    fontWeight: theme.other.fontWeights.bold,
    lineHeight: theme.other.lineHeights.heading,
  },
  buttonAlt: {
    fontSize: theme.other.fontSizes.md,
    fontWeight: theme.other.fontWeights.bold,
    lineHeight: '1',
    letterSpacing: theme.other.letterSpacing.md,
  },
  buttonPrimary: {
    fontSize: theme.other.fontSizes.md,
    fontWeight: theme.other.fontWeights.bold,
  },
  info: {
    fontWeight: theme.other.fontWeights.bold,
  },
  infoAlt: {
    fontWeight: theme.other.fontWeights.bold,
    lineHeight: theme.other.lineHeights.display,
    letterSpacing: theme.other.letterSpacing.sm,
  },
  breadcrumb: {
    fontSize: 'clamp(0.875rem, 0.7188rem + 0.7813vw, 1rem)',
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
