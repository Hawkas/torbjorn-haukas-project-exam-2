import { BookingAttributes } from 'types/bookings';

export const submitBooking = async (booking: BookingAttributes) => {
  const response = await fetch('/api/bookings', {
    method: 'POST',
    body: JSON.stringify({ booking }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  console.log(data);
  if (data) return true;
  return false;
};
