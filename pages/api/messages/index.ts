import { NextApiRequest, NextApiResponse } from 'next';
import { messages } from 'data/messageData';
import { Message } from 'types/messages';
import { getSession } from 'next-auth/react';

export default async function messageHandler(
  req: NextApiRequest,
  res: NextApiResponse<Message[] | Message>
) {
  const {
    query: { id },
    method,
  } = req;
  const session = await getSession({ req });
  switch (method) {
    case 'GET':
      if (session) {
        res.status(200).json(messages);
      } else {
        res.status(405).end(`You must be an admin to view or edit this content`);
      }

      break;
    case 'POST':
      const { name, email, subject, message } = req.body;
      // Yes yes Date.now() is just me being lazy
      const newMessage = { id: Date.now(), name, email, subject, message };
      messages.push(newMessage);
      res.status(201).json(newMessage);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
