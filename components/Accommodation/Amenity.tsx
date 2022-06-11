import {
  faAirConditioner,
  faElevator,
  faOven,
  faParking,
  faPaw,
  faRefrigerator,
  faTvRetro,
  faUtensils,
  faWifi,
} from '@fortawesome/pro-solid-svg-icons';
import { IconDefinition } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createStyles, Box, Text, Grid, Title } from '@mantine/core';
import { useTextStyles } from '@styles/typography';
import { useContainerStyles } from '@styles/containerStyles';
import { AccommodationClean } from 'types/accommodationClean';

const useAmenityStyles = createStyles((theme) => ({
  fluidContainer: {
    backgroundColor: theme.colors.blue[0],
  },
  amenityWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.other.largeSpacing.xxl,
    paddingBottom: theme.other.sectionSpacing.lg,
    [theme.fn.smallerThan('xs')]: {
      paddingBottom: theme.other.sectionSpacing.sm,
    },
  },
  grid: {
    width: '100%',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50px',
    backgroundColor: theme.colors.blue[6],
    padding: '8px',
    width: '56px',
    height: '56px',
    marginBottom: theme.other.smallSpacing.md,
  },
  icon: {
    color: theme.white,
    fontSize: '32px',
    lineHeight: 1,
  },
  label: {
    fontWeight: theme.other.fontWeights.semiBold,
    margin: 0,
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
  },
}));

type IconMatch = { [key: string]: { icon: IconDefinition; label: string } };

const iconMatch: IconMatch = {
  airCondition: { icon: faAirConditioner, label: 'Air condition' },
  elevator: { icon: faElevator, label: 'Elevator' },
  wifi: { icon: faWifi, label: 'WiFi' },
  freeParking: { icon: faParking, label: 'Free parking' },
  television: { icon: faTvRetro, label: 'Television' },
  refrigerator: { icon: faRefrigerator, label: 'Refrigerator' },
  foodService: { icon: faUtensils, label: 'Food service' },
  petsAllowed: { icon: faPaw, label: 'Pets allowed' },
  kitchen: { icon: faOven, label: 'Kitchen' },
};

export function Amenity({ amenities }: AccommodationClean) {
  const { classes, cx } = useAmenityStyles();
  const { classes: textClass } = useTextStyles();
  const { classes: containerClass } = useContainerStyles();
  const keyStrings = Object.keys(amenities);
  const amenityArray = keyStrings.map((key, index) => {
    // Return null when parsing the component ID, or just anything that shouldnt be there.
    if (!amenities[key] || !iconMatch[key]) return null;
    const { icon, label } = iconMatch[key];
    return (
      <Grid.Col span={6} xs={4} md={2} key={index} className={classes.column}>
        <Box className={classes.iconWrap}>
          <FontAwesomeIcon fixedWidth className={classes.icon} icon={icon} />
        </Box>
        <Text component="h3" className={cx(textClass.infoAlt, classes.label)}>
          {label}
        </Text>
      </Grid.Col>
    );
  });
  return (
    <Box component="aside" className={classes.fluidContainer}>
      <Box className={containerClass.container}>
        <Box className={classes.amenityWrapper}>
          <Title
            order={2}
            sx={(theme) => ({
              color: theme.other.brandColor,
              marginBottom: theme.other.largeSpacing.xxl,
            })}
            className={textClass.primaryH2}
          >
            Amenities
          </Title>
          <Grid justify="center" gutter={32} className={classes.grid}>
            {amenityArray}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
