import { PrimaryButton } from '@Buttons/PrimaryButton';
import { Text, useMantineTheme } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import { ArticleText } from './ArticleText';

export function ArticleSecond() {
  const theme = useMantineTheme();
  return (
    <>
      <ArticleText subheader="While you're here" title="Travel to Bergen — Gateway to the Fjords">
        <Text inherit component="p">
          Bergen is the self-proclaimed capitol of Norway according to its residents, and for good
          reason. The city is surrounded by seven mountains and is home to some of the most amazing
          sights the world has to offer. It is known as the Gateway to the Fjords, as the city is
          often the departure point to popular scenic fjords, such as Sognefjorden and its two
          branching fjords, Aurlandsfjord and Nærøyfjord.
        </Text>
        <Text mb={0} inherit component="p">
          The city is full of interesting attractions, so even if you are only in town on businesss,
          try to set aside a little time for sightseeing the first time you stay in Bergen.
        </Text>
      </ArticleText>
      <PrimaryButton
        href="/accommodations?location=bergen"
        mt={theme.other.largeSpacing.md}
        primary
        component="a"
      >
        Accommodations in Bergen
      </PrimaryButton>
    </>
  );
}
