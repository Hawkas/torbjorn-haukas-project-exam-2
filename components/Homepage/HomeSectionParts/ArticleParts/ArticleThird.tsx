import { PrimaryButton } from '@Buttons/PrimaryButton';
import { Text, useMantineTheme } from '@mantine/core';
import React from 'react';
import { ArticleText } from './ArticleText';

export function ArticleThird() {
  const theme = useMantineTheme();
  return (
    <>
      <ArticleText align="center" subheader="Get in touch" title="Need any help?">
        <Text inherit component="p">
          We know finding the perfect place is a challenge when planning your holiday, which is why
          we’re here to help. Let’s figure it out together.
        </Text>
        <Text mb={0} inherit component="p">
          If you have any questions or are in need of assistance, don’t hesitate to get in touch.
        </Text>
      </ArticleText>
      <PrimaryButton mt={theme.other.largeSpacing.md} variant="default" component="button">
        Contact us
      </PrimaryButton>
    </>
  );
}
