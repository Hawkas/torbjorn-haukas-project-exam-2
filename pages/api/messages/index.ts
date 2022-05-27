import { NextApiRequest, NextApiResponse } from 'next';
import { messages } from 'data/messageData';
import { Message } from 'types/messages';

export default function messageHandler(
  req: NextApiRequest,
  res: NextApiResponse<Message[] | Message>
) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      res.status(200).json(messages);
      break;
    case 'POST':
      const { name, email, subject, message } = req.body;
      // Yes yes Date.now() is just me being lazy
      const newMessage = { id: Date.now(), name, email, subject, message };
      messages.push(newMessage);
      res.status(201).json(newMessage);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
