import { axiosFetch } from '@helpers/axiosFetch';
import { NextApiRequest, NextApiResponse } from 'next';
import { MessageOut } from 'types/messages';

export default async (req: NextApiRequest, res: NextApiResponse<MessageOut>) => {
  const { method } = req;
  if (method === 'POST') {
    const { name, email, subject, message } = req.body;
    const newMessage = {
      name,
      email,
      subject,
      message,
    };
    const body = { data: { holidaze: 1, ...newMessage } };
    const response = await axiosFetch({
      url: `/messages`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.API_ADMIN_TOKEN}`,
      },
      data: body,
    });

    if (response.data) res.status(201).json(response);
    else res.status(400).json(response);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};
