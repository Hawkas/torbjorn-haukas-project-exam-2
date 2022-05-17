import { MantineThemeOverride, ThemeIcon } from '@mantine/core';

const lineHeight = 1.3;

export const holidazeTheme: MantineThemeOverride = {
  primaryShade: 6,
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
  other: {
    gradient: 'linear-gradient(91.98deg, #032D51 0%, #051524 100%)',
    brandColor: '#003355',
    smallSpacing: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '1rem',
      xl: '1.5rem',
    },
    largeSpacing: {
      sm: '2rem',
      md: '2.5rem',
      lg: '3rem',
      xl: '3.5rem',
      xxl: '4rem',
    },
    sectionSpacing: {
      sm: '4.5rem',
      md: '9rem',
      lg: '6rem',
      xl: '12rem',
    },
    fontFamilies: {
      display: 'Merienda, sans-serif',
      sans: 'Mulish, sans-serif',
      serif: 'Cormorant Garamond, serif',
    },
    lineHeights: {
      heading: 1.3,
      body: 1.625,
      display: 1.1,
    },
    letterSpacing: {
      sm: '0.05em',
      md: '0.25em',
      lg: '0.40em',
    },
    containerMax: '1320px',
    fontWeights: {
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
      extraBold: 800,
    },
    headingSizes: {
      display: {
        big: '5.125rem',
        small: '3rem',
      },
      primary: {
        big: { h1: '2.625rem', h2: '2.063rem', h3: '1.625rem' },
        small: { h1: '2.062rem', h2: '1.625rem', h3: '1.25rem' },
      },
      serif: {
        big: '3.25rem',
        small: '2.375rem',
      },
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
