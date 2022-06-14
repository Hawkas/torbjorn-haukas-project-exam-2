import { GetServerSidePropsContext } from 'next';
import type { MessageClean, MessageOut } from 'types/messages';

export const getMessage = async (context: GetServerSidePropsContext) => {
  const url = `${process.env.NEXTAUTH_URL}/api/messages`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      cookie: context.req.headers.cookie!,
    },
  });
  const data = await response.json();
  return data;
};
// NOTE that I am aware that forwarding calls to the API route is a performance loss.
// I'm just doing it because doing these calls server-side will incur less costs.
// and since the API is open for anyone to submit I'm taking precautions.
export const submitMessage = async (message: MessageOut) => {
  const response = await fetch('/api/messages', {
    method: 'POST',
    body: JSON.stringify(message),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (data) return true;
  return false;
};

export const deleteMessage = async (messageId: Pick<MessageClean, 'id'>) => {
  const response = await fetch(`api/messages/${messageId}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  if (data) return true;
  return false;
};
