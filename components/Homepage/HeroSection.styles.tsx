import { createStyles } from '@mantine/core';

export const useHeroStyle = createStyles((theme) => ({
  fluidContainer: {
    maxWidth: '100%',
  },
  imageOverlay: {
    backgroundColor: theme.fn.rgba('#000', 0.3),
  },
  contentGrid: {
    paddingTop: 'clamp(10rem, 5.2381rem + 23.8095vw, 20rem)',
  },
}));
