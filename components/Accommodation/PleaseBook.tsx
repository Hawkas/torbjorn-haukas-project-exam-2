import { Box, createStyles, Title } from '@mantine/core';
import { useContainerStyles } from '@styles/containerStyles';
import { useTextStyles } from '@styles/typography';
import React from 'react';
import { PrimaryButton } from '@Buttons/PrimaryButton';
import { ReturnLink } from '@components/Accommodation/SmallParts/ReturnLink';
import { useModals } from '@mantine/modals';
import { Booking } from '@components/Modal/Booking/Booking';
import type { AccommodationClean } from 'types/accommodationClean';

export function PleaseBook({ ...data }: AccommodationClean) {
  const { classes } = useStyles();
  const modals = useModals();
  const { classes: containerClass } = useContainerStyles();
  const { classes: textClass } = useTextStyles();
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
        width: '100%',
        backgroundColor: theme.colors.blue[0],
        paddingTop: theme.other.largeSpacing.xxl,
        paddingBottom: theme.other.sectionSpacing.xxl,
        [theme.fn.smallerThan('xs')]: {
          paddingBottom: theme.other.sectionSpacing.xl,
        },
      })}
    >
      <Box className={containerClass.container}>
        <Box className={classes.wrapper}>
          <Title
            sx={(theme) => ({
              color: theme.other.brandColor,
              margin: 0,
              marginBottom: theme.other.largeSpacing.xxl,
            })}
            className={textClass.primaryH2}
            order={2}
            align="center"
          >
            Is this location to your liking?
          </Title>
          <PrimaryButton
            primary
            className={classes.button}
            classNames={{ label: classes.buttonLabel }}
            onClick={openBookingModal}
          >
            Book now
          </PrimaryButton>
          <ReturnLink className={classes.returnLink}>View other accommodations</ReturnLink>
        </Box>
      </Box>
    </Box>
  );
}
export const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    marginBottom: theme.other.largeSpacing.sm,
    padding: `${theme.other.smallSpacing.lg} ${theme.other.largeSpacing.lg}`,
  },
  buttonLabel: {
    fontSize: theme.other.fontSizes.xxl,
    letterSpacing: theme.other.letterSpacing.xs,
    fontWeight: theme.other.fontWeights.semiBold,
    lineHeight: theme.other.lineHeights.heading,
  },
  returnLink: {
    '& *:not(p)': {
      padding: 0,
      color: theme.colors.blue[6],
    },
  },
}));
