import { ContextModalProps } from '@mantine/modals';
import { ModalSettings } from '@mantine/modals/lib/context';
import React from 'react';

export const FormModal = ({ innerProps }: ContextModalProps<{ modalBody: React.ReactElement }>) => (
  <>{innerProps.modalBody}</>
);

export const formModalSettings: ModalSettings = {
  styles: () => ({
    modal: {
      padding: '0',
      backgroundColor: 'transparent',
      boxShadow: '0',
      maxWidth: '948px',
    },
  }),
  shadow: '0',
  radius: 'lg',
  size: '100%',
  padding: 0,
  withCloseButton: false,
  overflow: 'outside',
  centered: true,
};
