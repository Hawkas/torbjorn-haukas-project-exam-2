import { BookingAttrOutgoing, BookingObjectIngoing } from 'types/bookings';
import { axiosFetch } from './axiosFetch';

export const getBooking = async () => {
  const response = await axiosFetch({
    method: 'GET',
    url: '/bookings?populate=*',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.API_ADMIN_TOKEN}`,
    },
  });
  const data: BookingObjectIngoing[] = await response.data;
  if (data) {
    const bookingData = data.map((item) => {
      const {
        id,
        attributes: {
          createdAt,
          updatedAt,
          publishedAt,
          firstName,
          lastName,
          accommodation: {
            data: {
              attributes: { name: accommodation },
            },
          },
          ...rest
        },
      } = item;
      const name = `${firstName} ${lastName}`;
      return { id: id.toString(), name, accommodation, ...rest };
    });
    return bookingData;
  }
  return null;
};

// I don't want to do these calls client-side, so I'm forwarding it to an API route.
export const submitBooking = async (data: BookingAttrOutgoing) => {
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
