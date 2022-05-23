import { PrimaryButton } from '@Buttons/PrimaryButton';
import { faClose } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActionIcon, Group, Paper, Text, Textarea, TextInput } from '@mantine/core';
import { useModals, ContextModalProps } from '@mantine/modals';
import { textStyles } from '@styles/typography';
import React from 'react';
import { ContactIconsList } from './ContactIconsList';
import { useStyles } from './Contact.styles';

export function Contact() {
  const modals = useModals();
  const { classes, cx } = useStyles();
  const { classes: textClass } = textStyles();
  return (
    <Paper shadow="md" radius="lg">
      <div className={classes.wrapper}>
        <div className={classes.contacts}>
          <Text
            component="h2"
            className={cx(classes.title, textClass.primaryH3)}
            sx={{ color: '#fff' }}
          >
            Contact details
          </Text>

          <ContactIconsList className={classes.iconList} />
        </div>

        <form className={classes.form} onSubmit={(event) => event.preventDefault()}>
          <ActionIcon
            sx={{ position: 'absolute', top: 0, right: 0 }}
            onClick={() => modals.closeModal('contact')}
          >
            <FontAwesomeIcon icon={faClose} />
          </ActionIcon>
          <Text mb={52} component="h2" className={cx(classes.title, textClass.primaryH3)}>
            Send us a message
          </Text>

          <div>
            <TextInput
              mt="xl"
              classNames={{
                label: cx(classes.label, textClass.label),
                root: classes.root,
                input: classes.textInput,
              }}
              label="Name"
              placeholder="Enter your name"
            />

            <TextInput
              classNames={{
                label: cx(classes.label, textClass.label),
                root: classes.root,
                input: classes.textInput,
              }}
              mt="xl"
              label="Email"
              placeholder="Enter your email"
            />

            <TextInput
              classNames={{
                label: cx(classes.label, textClass.label),
                root: classes.root,
                input: classes.textInput,
              }}
              mt="xl"
              label="Subject"
              placeholder="Enter a subject"
            />

            <Textarea
              classNames={{
                label: cx(classes.label, textClass.label),
                root: classes.root,
                input: classes.textInput,
              }}
              mt="xl"
              label="Message"
              placeholder="Enter your message"
              minRows={5}
            />

            <Group position="right">
              <PrimaryButton type="button" primary className={classes.control}>
                Send message
              </PrimaryButton>
            </Group>
          </div>
        </form>
      </div>
    </Paper>
  );
}
