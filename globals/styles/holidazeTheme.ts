import { MantineThemeOverride } from '@mantine/core';

const lineHeight = 1.3;

export const holidazeTheme: MantineThemeOverride = {
  primaryShade: 7,
  black: '#1A1B1E',
  fontFamily: 'Mulish, sans-serif',
  lineHeight: '1.625',
  headings: {
    fontFamily: 'Mulish, sans-serif',
    fontWeight: '700',
    sizes: {
      h1: { fontSize: '2.625rem', lineHeight },
      h2: { fontSize: '2.063rem', lineHeight },
      h3: { fontSize: '1.625rem', lineHeight },
    },
  },
  colors: {
    dark: [
      '#C1C2C5',
      '#A6A7AB',
      '#909296',
      '#5C5F66',
      '#373A40',
      '#2C2E33',
      '#25262B',
      '#1A1B1E',
      '#141517',
      '#101113',
    ],
    blue: [
      '#E7F2FF',
      '#CDE5FF',
      '#96CCFF',
      '#65B1F4',
      '#4796D7',
      '#247CBB',
      '#00639D',
      '#004A78',
      '#003355',
      '#001D34',
    ],
    red: [
      '#FFEDE9',
      '#FFDAD4',
      '#FFB4A9',
      '#FF897A',
      '#FF5449',
      '#DD3730',
      '#BA1B1B',
      '#930006',
      '#680003',
      '#410001',
    ],
    gray: [
      '#EDF1F9',
      '#DEE3EB',
      '#C2C7CE',
      '#A7ACB4',
      '#8C9198',
      '#72777F',
      '#5A5F66',
      '#42474D',
      '#2C3137',
      '#171C22',
    ],
  },
};
