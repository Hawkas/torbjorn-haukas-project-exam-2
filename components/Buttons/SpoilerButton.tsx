import { faChevronUp } from '@fortawesome/pro-regular-svg-icons';
import { faChevronDown } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Spoiler, Text } from '@mantine/core';
import React from 'react';

function SpoilerLabel({ hide }: { hide?: boolean }) {
  const ellipsis = hide ? '' : '...';
  return (
    <Text
      sx={{
        display: 'flex',
        gap: '4px',
        alignItems: 'center',
        alignSelf: 'flex-start',
      }}
      inherit
    >
      {ellipsis}
      <FontAwesomeIcon icon={hide ? faChevronUp : faChevronDown} />
    </Text>
  );
}
export function SpoilerButton({ children }: { children: React.ReactNode }) {
  return (
    <Spoiler
      styles={{
        control: {
          fontSize: 14,
          alignSelf: 'flex-start',
          '&:hover': { textDecoration: 'none' },
        },
      }}
      maxHeight={23}
      sx={{ display: 'flex' }}
      showLabel={<SpoilerLabel />}
      hideLabel={<SpoilerLabel hide />}
    >
      {children}
    </Spoiler>
  );
}
