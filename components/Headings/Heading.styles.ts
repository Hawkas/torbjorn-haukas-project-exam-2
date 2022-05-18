import { createStyles } from '@mantine/core';

export interface StyleProps {
  blue?: true | false;
}

export const useStyles = createStyles((theme, { blue }: StyleProps) => ({
  displayH1: {
    color: theme.white,
    fontSize: theme.other.headingSizes.display,
    fontFamily: theme.other.fontFamilies.display,
    fontWeight: theme.other.fontWeights.regular,
    lineHeight: theme.other.lineHeights.display,
  },
  primaryH1: {
    color: blue ? theme.colors.blue[8] : theme.black,
  },
  primaryH2: {
    color: blue ? theme.colors.blue[8] : theme.black,
    letterSpacing: theme.other.letterSpacing.sm,
  },
  primaryH3: {
    color: blue ? theme.colors.blue[8] : theme.black,
    letterSpacing: theme.other.letterSpacing.sm,
  },
  serifH2: {
    color: blue ? theme.colors.blue[8] : theme.black,
    fontSize: theme.other.headingSizes.serif,
    fontFamily: theme.other.fontFamilies.serif,
    fontWeight: theme.other.fontWeights.medium,
  },
}));
