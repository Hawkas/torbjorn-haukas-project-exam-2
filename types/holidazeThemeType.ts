import { CSSProperties } from 'react';

declare module '@mantine/core' {
  export interface MantineThemeOther {
    gradient: CSSProperties['background'];
    brandColor: CSSProperties['backgroundColor'];
    backgroundColor: CSSProperties['backgroundColor'];
    /** @smallSpacing - use between elements in component structures
     * * **sm**: 0.25rem (4px)
     * * **md**: 0.5rem (8px)
     * * **lg**: 1rem (16px)
     * * **xl**: 1.25rem (20px)
     * * **xxl**: 1.5rem (24px)
     */
    smallSpacing: {
      sm: CSSProperties['paddingTop'];
      md: CSSProperties['paddingTop'];
      lg: CSSProperties['paddingTop'];
      xl: CSSProperties['paddingTop'];
      xxl: CSSProperties['paddingTop'];
    };
    /**
     * @largeSpacing use for spacing within section
     * * **`sm`**: 2rem (32px)
     * * **`md`**: 2.5rem (40px)
     * * **`lg`**: 3rem (48px)
     * * **`xl`**: 3.5rem (56px)
     * * **`xxl`**: 4rem (64px)
     */
    largeSpacing: {
      sm: CSSProperties['paddingTop'];
      md: CSSProperties['paddingTop'];
      lg: CSSProperties['paddingTop'];
      xl: CSSProperties['paddingTop'];
      xxl: CSSProperties['paddingTop'];
    };
    /**
     * @sectionSpacing use for spacing between sections on page
     * * **`xs`**: 4.5rem (72px)
     * * **`sm`**: 5rem (80px)
     * * **`md`**: 6rem (96px)
     * * **`lg`**: 8rem (128px)
     * * **`xl`**: 9rem (144px)
     * * **`xxl`**: 12rem (192px)
     */
    sectionSpacing: {
      xs: CSSProperties['paddingTop'];
      sm: CSSProperties['paddingTop'];
      md: CSSProperties['paddingTop'];
      lg: CSSProperties['paddingTop'];
      xl: CSSProperties['paddingTop'];
      xxl: CSSProperties['paddingTop'];
    };
    /**
     * @fontSizing font sizes in rem units
     * * **`xs`**: 0.75rem (12px)
     * * **`sm`**: 0.875rem (14px)
     * * **`md`**: 1rem (16px)
     * * **`lg`**: 1.125rem (18px)
     * * **`xl`**: 1.25rem (20px)
     * * **`xxl`**: 1.5rem (24px)
     */
    fontSizes: {
      xs: CSSProperties['fontSize'];
      sm: CSSProperties['fontSize'];
      md: CSSProperties['fontSize'];
      lg: CSSProperties['fontSize'];
      xl: CSSProperties['fontSize'];
      xxl: CSSProperties['fontSize'];
    };
    fontFamilies: {
      display: CSSProperties['fontFamily'];
      sans: CSSProperties['fontFamily'];
      serif: CSSProperties['fontFamily'];
    };
    /**
     * @lineHeights
     * * **`heading`**: 1.3
     * * **`body`**: 1.625
     * * **`display`**: 1.1
     *
     */
    lineHeights: {
      heading: CSSProperties['lineHeight'];
      body: CSSProperties['lineHeight'];
      display: CSSProperties['lineHeight'];
    };
    /**
     * @letterSpacing
     * * **`xs`**: 0.05em (5%)
     * * **`sm`**: 0.10em (10%)
     * * **`md`**: 0.25em (25%)
     * * **`lg`**: 0.40em (40%)
     */
    letterSpacing: {
      xs: CSSProperties['letterSpacing'];
      sm: CSSProperties['letterSpacing'];
      md: CSSProperties['letterSpacing'];
      lg: CSSProperties['letterSpacing'];
    };
    /** @containerMax 1320px */
    containerMax: CSSProperties['maxWidth'];
    /**
     * @fontWeights
     * * **`light`**: 300
     * * **`regular`**: 400
     * * **`medium`**: 500
     * * **`semiBold`**: 600
     * * **`bold`**: 700
     * * **`extraBold`**: 800
     */
    fontWeights: {
      light: number;
      regular: number;
      medium: number;
      semiBold: number;
      bold: number;
      extraBold: number;
    };
    headingSizes: {
      display: CSSProperties['fontSize'];
      serif: CSSProperties['fontSize'];
    };
  }
}
