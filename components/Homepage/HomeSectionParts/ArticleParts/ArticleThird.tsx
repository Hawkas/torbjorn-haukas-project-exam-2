import { PrimaryButton } from '@Buttons/PrimaryButton';
import { Contact } from '@components/Modal/Contact/Contact';
import { Text, useMantineTheme } from '@mantine/core';
import { useModals } from '@mantine/modals';
import React from 'react';
import { ArticleText } from './ArticleText';

export function ArticleThird() {
  const modals = useModals();
  const theme = useMantineTheme();
  const openContactModal = () => {
    modals.openContextModal('contact', {
      innerProps: {
        id: 'formModal',
        modalBody: <Contact />,
      },
    });
  };
  return (
    <>
      <ArticleText align="center" subheader="Get in touch" title="Need any help?">
        <Text inherit component="p">
          We know finding the perfect place is a challenge when planning your holiday, which is why
          we’re here to help. Let’s figure it out together.
        </Text>
        <Text mb={0} inherit component="p">
          If you have any questions or are in need of assistance, don’t hesitate to get in touch.
        </Text>
      </ArticleText>
      <PrimaryButton
        mt={theme.other.largeSpacing.md}
        variant="default"
        component="button"
        onClick={openContactModal}
      >
        Contact us
      </PrimaryButton>
    </>
  );
}
