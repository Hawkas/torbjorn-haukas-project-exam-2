import { TitleSection } from '@components/DefaultTemplates/TitleSection';
import { Box } from '@mantine/core';
import { useContainerStyles } from '@styles/containerStyles';
import { MessageClean } from 'types/messages';
import { TableSort } from './Table/TableSort';

interface MessagesAdmin {
  messages: MessageClean[] | [];
}

export function MessagesAdmin({ messages }: MessagesAdmin) {
  const messageData: MessageClean[] | [] = messages;
  const {
    classes: { container },
  } = useContainerStyles();
  const headerOrder: (keyof MessageClean)[] = ['name', 'email', 'subject', 'createdAt', 'message'];
  return (
    <>
      <TitleSection title="Messages" order={2} />
      <Box mt={-102} pb={192} className={container}>
        <TableSort<MessageClean> data={messageData} headerOrder={headerOrder} />
      </Box>
    </>
  );
}
