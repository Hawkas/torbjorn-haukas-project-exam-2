import { handleChange } from '@helpers/handleQueryChange';
import useResizeCheck from '@hooks/useResizeCheck';
import { SegmentedControl, createStyles } from '@mantine/core';
import { useTextStyles } from '@styles/typography';
import { NextRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useTypeStyles = createStyles((theme, _params, getRef) => ({
  segmentRoot: {
    //? The borders around the entire component are actually padding,
    //? so to color them we have to clip the background.
    //* Essentially, we add two backgrounds with a single color gradient,
    //* clipping one of them to content, and the other to padding.
    backgroundImage: `linear-gradient(to bottom, ${theme.white} 0%, ${theme.white} 100%), linear-gradient(to bottom, ${theme.colors.gray[1]} 0%, ${theme.colors.gray[1]} 100%)`,
    backgroundClip: 'content-box, padding-box;',
    maxWidth: '100%',
    [theme.fn.smallerThan(594)]: {
      flexWrap: 'wrap',
      minWidth: '290px',
      //* Dealing with the borders when wrapping is an absolute pain, so I replace them all.
      // With a 2x2 this is so much better than borders anyway
      '&:after': {
        content: `" "`,
        display: 'block',
        position: 'absolute',
        backgroundImage: `linear-gradient(to bottom, ${theme.colors.gray[1]} 0%, ${theme.colors.gray[1]} 100%), linear-gradient(to bottom, ${theme.colors.gray[1]} 0%, ${theme.colors.gray[1]} 100%)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 1px, 1px 100%',
        backgroundPosition: 'center, center',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
  },
  activeCover: {
    transformOrigin: 'right',
  },
  typeControl: {
    [theme.fn.largerThan(594)]: {
      '&:last-of-type label': {
        minWidth: '108px',
      },
    },

    //? Only when single row
    '&:not(:first-of-type)': {
      borderWidth: '0 0 0 1px',
      borderColor: theme.colors.gray[1],
    },
    [theme.fn.largerThan(594)]: {
      [`&.${getRef('segmentControlActive')}:last-of-type`]: {
        borderWidth: '0 0 0 0',
      },
    },

    //? Adjust last button, as its border being transparent reveals the white background.
    [theme.fn.smallerThan(594)]: {
      //? basically 50% minus the random faux-border padding.
      flexBasis: 'calc((100% - 8px) / 2)',

      minWidth: '140px',
      position: 'static',
      //? Remove all borders.
      // I definitely didn't spend more than an hour toying with them before giving up :)
      [`&:not(:nth-of-type(5))`]: {
        borderWidth: '0 !important',
      },
    },
  },
  segmentControlActive: {
    ref: getRef('segmentControlActive'),
  },
  segmentLabelActive: {
    ref: getRef('segmentLabelActive'),
  },
  segmentLabel: {
    color: theme.other.brandColor,
    fontWeight: theme.other.fontWeights.bold,
    fontSize: theme.other.fontSizes.md,
    padding: `${theme.other.smallSpacing.lg} ${theme.other.smallSpacing.xl}`,
    [theme.fn.smallerThan(594)]: {
      padding: `${theme.other.smallSpacing.lg} 0.625rem`,
      width: 'calc(100% + 1px)',
    },
    [`&.${getRef('segmentLabelActive')}`]: {
      color: theme.white,
    },
  },
}));

export function TypeButtons({ router }: { router: NextRouter }) {
  const resizing = useResizeCheck();
  const [typeValue, setTypeValue] = useState(router.query.type ? `${router.query.type}` : 'all');
  const [transition, setTransition] = useState(0);
  useEffect(() => {
    setTypeValue(`${router.query.type || 'all'}`);
    setTimeout(() => {
      setTransition(200);
    }, 500);
  }, []);
  const { classes: textClass } = useTextStyles();
  const { classes, cx } = useTypeStyles();
  const segmentItems = [
    { label: 'Hotels', value: 'hotels' },
    { label: 'Guesthouses', value: 'guesthouses' },
    { label: 'Bed & Breakfast', value: 'bnb' },
    { label: 'All types', value: 'all' },
  ];
  return (
    <SegmentedControl
      transitionDuration={resizing ? 0 : transition}
      name="type-filters"
      color="blue"
      radius='xs'
      size="lg"
      classNames={{
        root: classes.segmentRoot,
        label: classes.segmentLabel,
        labelActive: classes.segmentLabelActive,
        control: cx(textClass.buttonPrimary, classes.typeControl),
        controlActive: classes.segmentControlActive,
        active: classes.activeCover,
      }}
      value={typeValue}
      onChange={(value) => {
        setTypeValue(value);
        handleChange(value, router, 'type');
      }}
      data={segmentItems}
    />
  );
}
