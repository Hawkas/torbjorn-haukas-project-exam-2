import { createStyles, CSSObject, Title } from '@mantine/core';

interface StyleProps extends CSSObject {
  smallFontSize?: string;
}

export const useStyles = createStyles(
  (
    theme,
    {
      fontSize,
      color,
      fontWeight,
      fontFamily,
      lineHeight,
      letterSpacing,
      smallFontSize,
    }: StyleProps
  ) => ({
    title: {
      color: color || theme.black,
      fontSize: fontSize || undefined,
      fontWeight: fontWeight || undefined,
      lineHeight: lineHeight || 1.3,
      fontFamily: fontFamily || undefined,
      letterSpacing: letterSpacing,
      [theme.fn.smallerThan('md')]: {
        fontSize: smallFontSize || undefined,
      },
    },
  })
);

// export function Heading(
//   { fontSize, color, fontWeight, fontFamily, lineHeight, letterSpacing, smallFontSize }: StyleProps,
//   content: string
// ) {
//   const { classes } = useStyles({
//     fontSize,
//     color,
//     fontWeight,
//     fontFamily,
//     lineHeight,
//     letterSpacing,
//     smallFontSize,
//   });
//   return (
//     <>
//       <Title className={classes.title}></Title>
//     </>
//   );
// }
