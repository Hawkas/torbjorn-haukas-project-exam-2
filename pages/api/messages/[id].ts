import { messages } from 'data/messageData';
import { NextApiRequest, NextApiResponse } from 'next';
import { Message } from 'types/messages';

export default function handler(req: NextApiRequest, res: NextApiResponse<Message>) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      const message = messages.find((message) => message.id === parseInt(`${id}`));
      if (message) res.status(200).json(message);
      else res.status(400).end(`Message with id: ${id} does not exist`);
      break;
    case 'DELETE':
      const deletedMessage = messages.find((message) => message.id === parseInt(`${id}`));
      const index = messages.findIndex((message) => message.id === parseInt(`${id}`));
      messages.splice(index, 1);
      if (deletedMessage) res.status(200).json(deletedMessage);
      else res.status(400).end(`Message with id: ${id} does not exist`);
      break;
    default:
      res.setHeader('Allow', ['GET', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
