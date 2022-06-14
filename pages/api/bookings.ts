import { axiosFetch } from '@helpers/axiosFetch';
import { NextApiRequest, NextApiResponse } from 'next';
import type { BookingAttrOutgoing } from 'types/bookings';

export default async function messageHandler(
  req: NextApiRequest,
  res: NextApiResponse<BookingAttrOutgoing>
) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.API_ADMIN_TOKEN}`,
  };
  const url = `/bookings`;
  const { method } = req;
  const { data } = req.body;
  switch (method) {
    case 'POST':
      if (data) {
        const body = { data: { holidaze: 1, ...data } };
        const postBooking = await axiosFetch({
          url,
          headers,
          method: 'POST',
          data: { ...body },
        });
        if (!postBooking) res.status(400).end('uhh idk');
        if (postBooking) res.status(201).json(postBooking);
      }

      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
