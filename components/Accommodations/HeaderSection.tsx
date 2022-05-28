import { TitleSection } from '@components/DefaultTemplates/TitleSection';
import { ThemeContext } from '@emotion/react';
import { Box, Chips, Chip, createStyles, SegmentedControl, Center } from '@mantine/core';
import { useContainerStyles } from '@styles/containerStyles';
import { useTextStyles } from '@styles/typography';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { callbackify } from 'util';

const useStyles = createStyles((theme, _params, getRef) => ({
  chips: {
    width: '100%',
    maxWidth: '27.8125rem',
    marginBottom: theme.other.largeSpacing.sm,
  },
  chip: {
    borderRadius: theme.radius.xl,
    [theme.fn.smallerThan('xs')]: {
      flexBasis: 'calc(50% - 16px)',
      flexGrow: 1,
    },
  },
  checked: {
    ref: getRef('checked'),
  },
  chipLabel: {
    boxShadow: theme.shadows.xs,
    [`&.${getRef('checked')}`]: {
      color: theme.colors.blue[6],
    },
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
    },
  },
}));

export function HeaderSection() {
  const { classes, cx } = useStyles();
  const {
    classes: { container },
  } = useContainerStyles();
  const {
    classes: { locationTag },
  } = useTextStyles();
  const router = useRouter();
  const [value, setValue] = useState('all');

  const chipItem = [
    { label: 'Bergen', value: 'bergen' },
    { label: 'Voss', value: 'voss' },
    { label: 'Hardanger', value: 'hardanger' },
    { label: 'All', value: 'all' },
  ].map((item, index) => (
    <Chip
      className={classes.chip}
      value={item.value}
      key={index}
      onClick={() => {
        router.replace(
          {
            pathname: router.pathname,
            query: item.value === 'all' ? undefined : { location: item.value },
          },
          undefined,
          {
            shallow: true,
          }
        );
      }}
    >
      {item.label}
    </Chip>
  ));

  return (
    <>
      <TitleSection title="Accommodations">
        <Box component="section">
          <Center sx={{ width: '100%' }}>
            <Chips
              position="center"
              className={cx(classes.chips, locationTag)}
              classNames={{ label: classes.chipLabel, checked: classes.checked }}
              spacing="md"
              value={value}
              multiple={false}
              onChange={setValue}
            >
              {chipItem}
            </Chips>
          </Center>
        </Box>
      </TitleSection>
      ;
    </>
  );
}
