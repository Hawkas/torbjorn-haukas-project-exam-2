import React from 'react';
import { Title, Text, useMantineTheme, TextProps } from '@mantine/core';
import { textStyles } from 'lib/styles/typography';

interface TextBlockProps extends TextProps<'p'> {
  subheader: string;
  title: string;
}
export function ArticleText({ subheader, title, children, mt, align }: TextBlockProps) {
  const theme = useMantineTheme();
  const { classes: textClass } = textStyles();
  return (
    <>
      <Title
        align={align}
        mt={mt}
        sx={{ maxWidth: '28rem' }}
        order={2}
        mb={theme.other.smallSpacing.xl}
        className={textClass.serifH2}
      >
        <Text
          align={align}
          component="p"
          mb={theme.other.smallSpacing.xl}
          mt={0}
          className={textClass.subHeader}
        >
          {subheader}
        </Text>
        <Text component="span" inherit>
          {title}
        </Text>
      </Title>
      <Text weight={500} mb={0} sx={{ maxWidth: '35rem' }}>
        {children}
      </Text>
    </>
  );
}
