import { TitleSection } from '@components/DefaultTemplates/TitleSection';
import { faLocationDot } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useResizeCheck from '@hooks/useResizeCheck';
import { Box, Chips, Chip, createStyles, SegmentedControl, Center } from '@mantine/core';
import { useDebouncedValue, useElementSize, useMediaQuery, useViewportSize } from '@mantine/hooks';
import { useContainerStyles } from '@styles/containerStyles';
import { useTextStyles } from '@styles/typography';
import { NextRouter, useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { useEffect, useState } from 'react';

const useStyles = createStyles((theme, _params, getRef) => ({
  filtersWrap: {
    width: '100%',
    flexDirection: 'column',
  },
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
  typeControl: {
    ref: getRef('typeControl'),
    //? Only when single row
    '&:not(:first-of-type)': {
      borderWidth: '0 0 0 1px',
      borderColor: theme.colors.gray[1],
    },
    //? Adjust last button, as its border being transparent reveals the white background.
    [`&.${getRef('segmentControlActive')}:last-of-type`]: {
      borderWidth: '0 0 0 0',
    },
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

type QueryObject = { location?: string } | { type?: string } | ParsedUrlQuery;
const changeQuery = (router: NextRouter, queryObject?: QueryObject) => {
  router.replace(
    {
      query: { ...router.query, ...queryObject },
    },
    undefined,
    {
      shallow: true,
    }
  );
};
const handleChange = (value: string, router: NextRouter, queryParam: string) => {
  if (value !== 'all') {
    changeQuery(router, { [queryParam]: value });
  } else {
    delete router.query[queryParam];
    changeQuery(router, router.query);
  }
};
export function HeaderSection() {
  const router = useRouter();
  const resizing = useResizeCheck();
  const [chipValue, setChipValue] = useState(
    router.query.location ? `${router.query.location}` : 'all'
  );
  console.log(router.query.type);
  const [typeValue, setTypeValue] = useState(router.query.type ? `${router.query.type}` : 'all');
  const {
    classes: { container },
  } = useContainerStyles();
  const { classes: textClass } = useTextStyles();

  const { classes, cx } = useStyles();

  const chipItem = [
    { label: 'Bergen', value: 'bergen' },
    { label: 'Voss', value: 'voss' },
    { label: 'Hardanger', value: 'hardanger' },
    { label: 'All', value: 'all' },
  ].map((item, index) => (
    <Chip
      className={classes.chip}
      value={item.value}
      wrapperProps={{ icon: <FontAwesomeIcon icon={faLocationDot} /> }}
      key={index}
      onClick={() => handleChange(item.value, router, 'location')}
    >
      {item.label}
    </Chip>
  ));

  return (
    <>
      <TitleSection title="Accommodations">
        <Box component="section">
          <Center sx={{ width: '100%', flexDirection: 'column' }}>
            <Chips
              name="Filters for location"
              position="center"
              className={cx(classes.chips, textClass.locationTag)}
              classNames={{ label: classes.chipLabel, checked: classes.checked }}
              spacing="md"
              value={chipValue}
              multiple={false}
              onChange={setChipValue}
            >
              {chipItem}
            </Chips>
            <SegmentedControl
              transitionDuration={resizing ? 0 : undefined}
              name="Filters for type of accommodation"
              color="blue"
              radius={'xs'}
              size="lg"
              classNames={{
                root: classes.segmentRoot,
                label: classes.segmentLabel,
                labelActive: classes.segmentLabelActive,
                control: cx(textClass.buttonPrimary, classes.typeControl),
                controlActive: classes.segmentControlActive,
              }}
              value={typeValue}
              onChange={(value) => {
                setTypeValue((o) => value);
                handleChange(value, router, 'type');
              }}
              data={[
                { label: 'Hotels', value: 'hotels' },
                { label: 'Guesthouses', value: 'guesthouses' },
                { label: 'Bed & Breakfast', value: 'bnb' },
                { label: 'All types', value: 'all' },
              ]}
            />
          </Center>
        </Box>
      </TitleSection>
    </>
  );
}
