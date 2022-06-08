import { messages } from 'data/messageData';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import type { Message } from 'types/messages';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Message>) {
  const {
    query: { id },
    method,
  } = req;
  const session = await getSession();
  if (session) {
    const message = messages.find((singleMessage) => singleMessage.id === parseInt(`${id}`));
    const deletedMessage = messages.find((singleMessage) => singleMessage.id === parseInt(`${id}`));
    const index = messages.findIndex((singleMessage) => singleMessage.id === parseInt(`${id}`));
    switch (method) {
      case 'GET':
        if (message) res.status(200).json(message);
        else res.status(400).end(`Message with id: ${id} does not exist`);
        break;
      case 'DELETE':
        messages.splice(index, 1);
        if (deletedMessage) res.status(200).json(deletedMessage);
        else res.status(400).end(`Message with id: ${id} does not exist`);
        break;
      default:
        res.setHeader('Allow', ['GET', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } else {
    res.status(405).end(`You must be an admin to view or edit this content`);
  }
}
