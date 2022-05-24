import { ContextModalProps } from '@mantine/modals';
import { ModalSettings } from '@mantine/modals/lib/context';
import React from 'react';

export const FormModal = ({
  id = 'formModal',
  innerProps,
}: ContextModalProps<{ modalBody: React.ReactElement; id: string }>) => {
  return <>{innerProps.modalBody}</>;
};
export const formModalSettings: ModalSettings = {
  styles: (theme) => ({
    modal: {
      padding: '0',
      backgroundColor: 'transparent',
      boxShadow: '0',
      maxWidth: '948px',
      marginLeft: 0,
    },
    inner: {},
  }),
  shadow: '0',
  radius: 'lg',
  size: '100%',
  padding: 0,
  withCloseButton: false,
  overflow: 'outside',
};
