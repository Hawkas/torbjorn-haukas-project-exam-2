import { PrimaryButton } from '@Buttons/PrimaryButton';
import { Text, useMantineTheme } from '@mantine/core';
import React from 'react';
import { ArticleText } from './ArticleText';

export function ArticleFirst() {
  const theme = useMantineTheme();
  return (
    <>
      <ArticleText subheader="We are Holidaze" title="We help you find accommodations">
        <Text m={0} inherit component="p">
          Holidaze is here to help travellers like you find lodging that suits your budget and
          needs. Whether you’d prefer to stay in the city of Bergen or a cozy cabin surrounded by
          spruce and pine trees, we’ll assist you in finding a comfortable place to relax during
          your stay.
        </Text>
      </ArticleText>
      <PrimaryButton mt={theme.other.largeSpacing.md} primary href="/accommodations" component="a">
        View all accommodations
      </PrimaryButton>
    </>
  );
}
