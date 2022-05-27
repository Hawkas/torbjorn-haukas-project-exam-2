import type { Message } from 'types/messages';

export const getMessage = async () => {
  const response = await fetch('api/messages');
  const data = await response.json();
  console.log(data);
};

export const submitMessage = async (message: Message) => {
  const response = await fetch('/api/messages', {
    method: 'POST',
    body: JSON.stringify({ message }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  console.log(data);
};

export const deleteMessage = async (messageId: Pick<Message, 'id'>) => {
  const response = await fetch(`/api/messages/${messageId}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  console.log(data);
};
