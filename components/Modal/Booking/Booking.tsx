import { PrimaryButton } from '@Buttons/PrimaryButton';
import { faCheckCircle, faClose } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { submitMessage } from '@helpers/handleMessage';
import { ActionIcon, Alert, Group, Paper, Text, Textarea, TextInput } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { useModals } from '@mantine/modals';
import { useTextStyles } from 'lib/styles/typography';
import { useState } from 'react';
import { AccommodationClean } from 'types/accommodationClean';
import { z } from 'zod';
import { useStyles } from '../Contact/Contact.styles';
import { ContactIconsList } from '../Contact/ContactIconsList';

const contactSchema = z.object({
  firstName: z.string().min(1, { message: 'Please enter your first name' }),
  lastName: z.string().min(1, { message: 'Please enter your last name' }),
  email: z.string().email({ message: 'Invalid email' }),
  phoneNumber: z
    .string()
    .min(7, { message: 'Must be a valid phone number' })
    .max(15, { message: 'This 👏 is 👏 too 👏 long' }),
  additionalDetails: z
    .string()
    .max(1000, { message: 'Please limit your message to 1000 characters' }),
});

export function Booking({ rooms, name }: AccommodationClean) {
  const modals = useModals();
  const form = useForm({
    schema: zodResolver(contactSchema),
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      checkIn: '',
      phoneNumber: '',
      additionalDetails: '',
    },
  });
  const [value, setValue] = useState<[Date | null, Date | null]>([
    new Date(Date.now()),
    new Date(2021, 11, 5),
  ]);
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
            // const response = await submitMessage(values);
            // if (response) setSuccess('success');
          })}
        >
          <ActionIcon
            sx={{ position: 'absolute', top: 0, right: 0 }}
            onClick={() => modals.closeModal('contact')}
          >
            <FontAwesomeIcon icon={faClose} />
          </ActionIcon>
          <Text mb={52} component="h2" className={cx(classes.title, textClass.primaryH3)}>
            Book your stay
          </Text>

          <div>
            <TextInput
              classNames={{
                label: cx(classes.label, textClass.label),
                root: classes.root,
                input: classes.textInput,
              }}
              mt="xl"
              label="First name"
              placeholder="Enter your first name"
              {...form.getInputProps('firstName', { type: 'input' })}
            />
            <TextInput
              classNames={{
                label: cx(classes.label, textClass.label),
                root: classes.root,
                input: classes.textInput,
              }}
              mt="xl"
              label="Last name"
              placeholder="Enter your last name"
              {...form.getInputProps('lastName', { type: 'input' })}
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
              label="Phone number"
              placeholder="Enter your phone number"
              {...form.getInputProps('phoneNumber')}
            />
            <DateRangePicker
              classNames={{
                label: cx(classes.label, textClass.label),
                root: classes.root,
                input: classes.textInput,
              }}
              label="Book hotel"
              placeholder="Pick dates range"
              value={value}
              onChange={setValue}
            />
            <Textarea
              classNames={{
                label: cx(classes.label, textClass.label),
                root: classes.root,
                input: classes.textInput,
              }}
              mt="xl"
              label="Additional details"
              placeholder="Anything else to add?"
              minRows={5}
              {...form.getInputProps('additionalDetails')}
            />

            <Group position={success === 'success' ? 'apart' : 'right'}>
              {success === 'success' ? (
                <Alert
                  withCloseButton
                  closeButtonLabel="Close alert"
                  title="Success"
                  icon={<FontAwesomeIcon icon={faCheckCircle} />}
                  color="green"
                  onClose={() => {
                    setSuccess('waiting');
                  }}
                  mt={40}
                >
                  Your booking request has been submitted.
                </Alert>
              ) : (
                <></>
              )}
              <PrimaryButton type="submit" primary className={classes.control}>
                Submit
              </PrimaryButton>
            </Group>
          </div>
        </form>
      </div>
    </Paper>
  );
}
