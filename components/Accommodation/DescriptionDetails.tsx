import { PrimaryButton } from '@Buttons/PrimaryButton';
import { render, MyMapComponent, Marker } from '@components/Accommodation/Map';
import { Wrapper } from '@googlemaps/react-wrapper';
import { Box, createStyles, Group, Text } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { useContainerStyles } from '@styles/containerStyles';
import type { AccommodationClean } from 'types/accommodationClean';

export function DescriptionDetails({
  description,
  minPrice,
  googleData,
}: AccommodationClean & { googleData: any }) {
  const { ref: sizeRef, height } = useElementSize();
  const { classes: containerClass } = useContainerStyles();
  const { classes } = useDescriptionDetailStyles(height);
  const center = googleData
    ? googleData.results[0].geometry.location
    : {
        lat: 60.3964108,
        lng: 5.328571699999999,
      };
  const zoom = 20;
  return (
    <Box
      component="section"
      sx={(theme) => ({
        borderTop: `1px solid ${theme.colors.gray[1]}`,
        padding: `${theme.other.largeSpacing.sm} 0 ${theme.other.sectionSpacing.lg}`,
      })}
    >
      <Box className={containerClass.container}>
        <Group className={classes.hotelDetails} align="stretch">
          <Box ref={sizeRef} className={classes.hotelDescription} sx={{ flexShrink: 1 }}>
            <Text
              pb={32}
              sx={(theme) => ({
                maxWidth: '560px',
                borderBottom: `2px solid ${theme.colors.gray[1]}`,
              })}
            >
              {description}
            </Text>
            <PrimaryButton primary>{`Book rooms from ${minPrice} NOK`}</PrimaryButton>
          </Box>
          <Box className={classes.mapWrap}>
            <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!} render={render}>
              <MyMapComponent center={center} zoom={zoom}>
                <Marker position={center} />
              </MyMapComponent>
            </Wrapper>
          </Box>
        </Group>
      </Box>
    </Box>
  );
}
const useDescriptionDetailStyles = createStyles((theme, textHeight: number) => ({
  hotelDetails: {
    gap: theme.other.largeSpacing.xxl,
    flexWrap: 'nowrap',

    [theme.fn.smallerThan('sm')]: {
      flexWrap: 'wrap',
    },
    [theme.fn.smallerThan('xs')]: {
      alignItems: 'center',
    },
  },
  hotelDescription: {
    minHeight: '100%',
    display: 'flex',
    gap: theme.other.largeSpacing.sm,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    [theme.fn.smallerThan('sm')]: {
      marginBottom: theme.other.largeSpacing.xxl,
    },
  },
  mapWrap: {
    backgroundColor: theme.white,
    minHeight: `calc(${textHeight}px - 64px)`,
    width: '100%',
    maxWidth: '616px',
    minWidth: '288px',
    alignSelf: 'stretch',
    flexGrow: 0,
    flexShrink: 2,
    flexBasis: 'calc(100% - 560px - 80px)',
    [theme.fn.smallerThan('sm')]: {
      minHeight: '296px',
      flexShrink: 1,
      flexGrow: 1,
      flexBasis: 'auto',
    },
  },
}));
