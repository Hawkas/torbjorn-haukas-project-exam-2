import { createStyles } from '@mantine/core';
import { settings } from '@globals/settings';

const { headerHeight } = settings;

export const heroStyles = createStyles((theme) => ({
  fluidContainer: {
    maxWidth: '100%',
  },
  imageOverlay: {
    backgroundColor: theme.fn.rgba('#000', 0.3),
  },
  contentGrid: {
    marginTop: headerHeight,
    paddingTop: 'clamp(10rem, 5.2381rem + 23.8095vw, 20rem)',
  },
}));
