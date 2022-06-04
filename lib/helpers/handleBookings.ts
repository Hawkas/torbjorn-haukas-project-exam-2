import { BookingAttributes } from 'types/bookings';
import { axiosFetch } from './axiosFetch';

export const getBooking = async () => {
  const response = await axiosFetch({
    method: 'GET',
    url: '/bookings',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.API_ADMIN_TOKEN}`,
    },
  });
  const data = await response.data;
  if (data) return data;
  return null;
};

// I don't want to do these calls client-side, so I'm forwarding it to an API route.
export const submitBooking = async (data: BookingAttributes) => {
  const response = await fetch('/api/bookings', {
    method: 'POST',
    body: JSON.stringify({ data }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const res = await response.json();
  if (res) return true;
  return false;
};
