import { PrimaryButton } from '@Buttons/PrimaryButton';
import { faCheckCircle, faClose } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { submitMessage } from '@helpers/handleMessage';
import { ActionIcon, Alert, Group, Paper, Text, Textarea, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useModals } from '@mantine/modals';
import { useTextStyles } from 'lib/styles/typography';
import { useState } from 'react';
import { z } from 'zod';
import { useStyles } from './Contact.styles';
import { ContactIconsList } from './ContactIconsList';

const contactSchema = z.object({
  name: z.string().min(1, { message: 'Please enter your name' }),
  email: z.string().email({ message: 'Invalid email' }),
  subject: z
    .string()
    .min(1, { message: 'Your message needs a subject' })
    .max(40, { message: 'Must be fewer than 40 characters' }),
  message: z
    .string()
    .min(25, { message: 'Must be 25 or more characters long' })
    .max(1000, { message: 'Please limit your message to 1000 characters' }),
});

export function Contact() {
  const modals = useModals();
  const form = useForm({
    schema: zodResolver(contactSchema),
    initialValues: { name: '', email: '', subject: '', message: '' },
  });

  // Since the messages use the NextJS api, they should only fail to submit if, well,
  // the whole site is down. I'll save the effort and just let it be empty if it doesnt connect.
  //* Validation errors are of course displayed.
  const [success, setSuccess] = useState('waiting');
  const { classes, cx } = useStyles();
  const { classes: textClass } = useTextStyles();
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

        <form
          className={classes.form}
          onSubmit={form.onSubmit(async (values) => {
            const response = await submitMessage(values);
            if (response) setSuccess('success');
          })}
        >
          <ActionIcon
            aria-label="Close"
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
              classNames={{
                label: cx(classes.label, textClass.label),
                root: classes.root,
                input: classes.textInput,
              }}
              mt="xl"
              label="Name"
              placeholder="Enter your name"
              {...form.getInputProps('name', { type: 'input' })}
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
              {...form.getInputProps('email')}
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
              {...form.getInputProps('subject')}
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
              {...form.getInputProps('message')}
            />

            <Group position={success === 'success' ? 'apart' : 'right'}>
              {success === 'success' ? (
                <Alert
                  withCloseButton
                  closeButtonLabel="Close alert"
                  title="Message sent"
                  icon={<FontAwesomeIcon icon={faCheckCircle} />}
                  color="green"
                  onClose={() => {
                    setSuccess('waiting');
                  }}
                  mt={40}
                >
                  We&apos;ll get back to you as soon as we&apos;re able
                </Alert>
              ) : (
                <></>
              )}
              <PrimaryButton type="submit" primary className={classes.control}>
                Send message
              </PrimaryButton>
            </Group>
          </div>
        </form>
      </div>
    </Paper>
  );
}
