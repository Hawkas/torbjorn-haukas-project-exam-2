import { handleChange } from '@helpers/handleQueryChange';
import { Chip, Chips, createStyles } from '@mantine/core';
import { useTextStyles } from '@styles/typography';
import { NextRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useChipStyles = createStyles((theme, _params, getRef) => ({
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

  chipLabel: {
    boxShadow: theme.shadows.xs,
    [`&.${getRef('checked')}`]: {
      color: theme.colors.blue[6],
      boxShadow: 'none',
    },
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
    },
  },
  checked: {
    ref: getRef('checked'),
  },
}));

export function LocationChips({ router }: { router: NextRouter }) {
  const { classes: textClass } = useTextStyles();
  const [chipValue, setChipValue] = useState(
    router.query.location ? `${router.query.location}` : 'all'
  );
  useEffect(() => {
    setChipValue(`${router.query.location || 'all'}`);
  }, []);
  const { classes, cx } = useChipStyles();

  const chipItem = [
    { label: 'Bergen', value: 'bergen' },
    { label: 'Voss', value: 'voss' },
    { label: 'Hardanger', value: 'hardanger' },
    { label: 'All', value: 'all' },
  ].map((item, index) => (
    <Chip className={classes.chip} value={item.value} key={index}>
      {item.label}
    </Chip>
  ));
  return (
    <Chips
      id="location-chips"
      name="Filters for location"
      position="center"
      className={cx(classes.chips, textClass.locationTag)}
      classNames={{ label: classes.chipLabel, checked: classes.checked }}
      spacing="md"
      value={chipValue}
      multiple={false}
      onChange={(value) => {
        setChipValue(value);
        handleChange(value, router, 'location');
      }}
    >
      {chipItem}
    </Chips>
  );
}
