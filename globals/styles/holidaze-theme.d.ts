import { CSSProperties } from 'react';

declare module '@mantine/core' {
  interface MantineThemeOther {
    gradient: CSSProperties['background'];
    brandColor: CSSProperties['backgroundColor'];
    smallSpacing: {
      sm: CSSProperties['padding-top'];
      md: CSSProperties['padding-top'];
      lg: CSSProperties['padding-top'];
      xl: CSSProperties['padding-top'];
    };
    largeSpacing: {
      sm: CSSProperties['padding-top'];
      md: CSSProperties['padding-top'];
      lg: CSSProperties['padding-top'];
      xl: CSSProperties['padding-top'];
      xxl: CSSProperties['padding-top'];
    };
    sectionSpacing: {
      sm: CSSProperties['padding-top'];
      md: CSSProperties['padding-top'];
      lg: CSSProperties['padding-top'];
      xl: CSSProperties['padding-top'];
    };
    fontFamilies: {
      display: CSSProperties['fontFamily'];
      sans: CSSProperties['fontFamily'];
      serif: CSSProperties['fontFamily'];
    };
    lineHeights: {
      heading: CSSProperties['lineHeight'];
      body: CSSProperties['lineHeight'];
      display: CSSProperties['lineHeight'];
    };
    letterSpacing: {
      sm: CSSProperties['letterSpacing'];
      md: CSSProperties['letterSpacing'];
      lg: CSSProperties['letterSpacing'];
    };
    containerMax: CSSProperties['maxWidth'];
    fontWeights: {
      regular: CSSProperties['fontWeight'];
      medium: CSSProperties['fontWeight'];
      semiBold: CSSProperties['fontWeight'];
      bold: CSSProperties['fontWeight'];
      extraBold: CSSProperties['fontWeight'];
    };
    headingSizes: {
      display: {
        big: CSSProperties['fontSize'];
        small: CSSProperties['fontSize'];
      };
      primary: {
        big: {
          h1: CSSProperties['fontSize'];
          h2: CSSProperties['fontSize'];
          h3: CSSProperties['fontSize'];
        };
        small: {
          h1: CSSProperties['fontSize'];
          h2: CSSProperties['fontSize'];
          h3: CSSProperties['fontSize'];
        };
      };
      serif: {
        big: CSSProperties['fontSize'];
        small: CSSProperties['fontSize'];
      };
    };
  }
}
