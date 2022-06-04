import { PrimaryButton } from '@Buttons/PrimaryButton';
import { render, MyMapComponent, Marker } from '@components/Accommodation/SmallParts/Map';
import { Booking } from '@components/Modal/Booking/Booking';
import { Wrapper } from '@googlemaps/react-wrapper';
import { Box, createStyles, Group, Text } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { useModals } from '@mantine/modals';
import { useContainerStyles } from '@styles/containerStyles';
import type { AccommodationClean } from 'types/accommodationClean';

export function DescriptionDetails({
  googleData,
  ...data
}: AccommodationClean & { googleData: any }) {
  const { description, minPrice } = data;
  const { ref: sizeRef, height } = useElementSize();
  const { classes: containerClass } = useContainerStyles();
  const { classes } = useDescriptionDetailStyles(height);
  const modals = useModals();
  const center = googleData
    ? googleData.results[0].geometry.location
    : {
        lat: 60.3964108,
        lng: 5.328571699999999,
      };
  const zoom = 20;
  const openBookingModal = () => {
    modals.openContextModal('booking', {
      innerProps: {
        id: 'formModal',
        modalBody: <Booking {...data} />,
      },
    });
  };
  return (
    <Box
      component="section"
      sx={(theme) => ({
        borderTop: `1px solid ${theme.colors.gray[1]}`,
        padding: `${theme.other.largeSpacing.sm} 0 ${theme.other.sectionSpacing.lg}`,
        backgroundColor: theme.white,
      })}
    >
      <Box className={containerClass.container}>
        <Group className={classes.hotelDetails} align="stretch">
          <Box ref={sizeRef} className={classes.hotelDescription} sx={{ flexShrink: 1 }}>
            <Box
              sx={(theme) => ({
                borderBottom: `2px solid ${theme.colors.gray[1]}`,
                width: '100%',
              })}
            >
              <Text
                component="p"
                pb={32}
                sx={{
                  maxWidth: '560px',
                  margin: 0,
                }}
              >
                {description}
              </Text>
            </Box>
            <PrimaryButton
              onClick={openBookingModal}
              primary
            >{`Book rooms from ${minPrice} NOK`}</PrimaryButton>
          </Box>
          <Box aria-label="Location" component="aside" className={classes.mapWrap}>
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
    justifyContent: 'space-between',
    flexWrap: 'nowrap',

    [theme.fn.smallerThan('sm')]: {
      flexWrap: 'wrap',
      gap: 0,
      justifyContent: 'flex-start',
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
      minWidth: '100%',
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
