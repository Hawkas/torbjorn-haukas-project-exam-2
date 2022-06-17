import { TitleSection } from '@components/DefaultTemplates/TitleSection';
import { Box } from '@mantine/core';
import { useContainerStyles } from '@styles/containerStyles';
import { BookingCleaned } from 'types/bookings';
import { TableSort } from './Table/TableSort';

interface BookingsAdmin {
  bookings: BookingCleaned[] | [];
}

export function BookingsAdmin({ bookings }: BookingsAdmin) {
  const bookingData: BookingCleaned[] | [] = bookings;
  const headerOrder: (keyof BookingCleaned)[] = [
    'accommodation',
    'room',
    'name',
    'email',
    'additionalDetails',
    'checkIn',
    'checkOut',
  ];
  const {
    classes: { container },
  } = useContainerStyles();
  return (
    <>
      <TitleSection title="Bookings" order={2} />
      <Box mt={-102} pb={192} className={container}>
        <TableSort<BookingCleaned> data={bookingData} headerOrder={headerOrder} />
      </Box>
    </>
  );
}
