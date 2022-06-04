import { PrimaryButton } from '@Buttons/PrimaryButton';
import {
  faCalendar,
  faCheckCircle,
  faChevronDown,
  faClose,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { submitBooking } from '@helpers/handleBookings';
import {
  ActionIcon,
  Alert,
  Group,
  Paper,
  Select,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { DatePicker, DateRangePicker } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { useModals } from '@mantine/modals';
import { useTextStyles } from 'lib/styles/typography';
import { useEffect, useState } from 'react';
import { AccommodationClean } from 'types/accommodationClean';
import { BookingAttributes } from 'types/bookings';
import { z } from 'zod';
import { useStyles } from '../Contact/Contact.styles';
import { ContactIconsList } from '../Contact/ContactIconsList';

const bookingSchema = z.object({
  firstName: z.string().trim().min(1, { message: 'Please enter your first name' }),
  lastName: z.string().trim().min(1, { message: 'Please enter your last name' }),
  email: z.string().trim().email({ message: 'Invalid email' }),
  checkIn: z.instanceof(Date, { message: 'Check-in date is required' }),
  checkOut: z.instanceof(Date, { message: 'Check-out date is required' }),
  room: z.string().trim().min(1, { message: 'You must select a room' }),
  phoneNumber: z
    .string()
    .trim()
    .min(7, { message: 'Must be a valid phone number' })
    .max(15, { message: 'This 👏 is 👏 too 👏 long' })
    .refine((val) => !isNaN(Number(val)), { message: 'Must be a number' }),
  additionalDetails: z
    .string()
    .max(1000, { message: 'Please limit your message to 1000 characters' }),
  accommodation: z.number(),
});

export function Booking({ rooms, id, contactInfo }: AccommodationClean) {
  const modals = useModals();
  const [currentDate, setCurrentDate] = useState(new Date());
  useEffect(() => {
    setCurrentDate(new Date());
  }, []);
  const form = useForm<BookingAttributes>({
    schema: zodResolver(bookingSchema),
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      checkIn: undefined,
      checkOut: undefined,
      phoneNumber: '',
      additionalDetails: '',
      room: '',
      accommodation: id,
    },
  });
  const [success, setSuccess] = useState('waiting');
  const { classes, cx } = useStyles();
  const { classes: textClass } = useTextStyles();
  return (
    <Paper shadow="md" radius="lg">
      <div className={classes.wrapper}>
        <div className={classes.contacts}>
          <Text
            component="h2"
            mb={76}
            className={cx(classes.title, textClass.primaryH3)}
            sx={{ color: '#fff' }}
          >
            Contact details
          </Text>

          <ContactIconsList contactInfo={contactInfo} className={classes.iconList} />
        </div>

        <form
          className={classes.form}
          onSubmit={form.onSubmit(async (values) => {
            const response = await submitBooking(values);
            if (response) setSuccess('success');
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
            {' '}
            <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'xs', cols: 1 }]}>
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
            </SimpleGrid>
            <SimpleGrid mb={64} cols={2} breakpoints={[{ maxWidth: 'xs', cols: 1 }]}>
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
                type="tel"
                label="Phone number"
                placeholder="Enter your phone number"
                {...form.getInputProps('phoneNumber')}
              />
            </SimpleGrid>
            <Select
              classNames={{
                label: cx(classes.label, textClass.label),
                root: classes.root,
                input: classes.textInput,
              }}
              mt="xl"
              label="Room"
              placeholder="Select a room"
              data={rooms.map((item) => item.roomName)}
              rightSection={<FontAwesomeIcon fontSize="14" icon={faChevronDown} />}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              rightSectionWidth={40}
              {...form.getInputProps('room')}
            />
            <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'xs', cols: 1 }]}>
              <DatePicker
                classNames={{
                  label: cx(classes.label, textClass.label),
                  root: classes.root,
                  input: classes.textInput,
                }}
                icon={<FontAwesomeIcon icon={faCalendar} />}
                minDate={currentDate}
                mt="xl"
                label="Check-in"
                placeholder="Pick check-in date"
                {...form.getInputProps('checkIn')}
              />
              <DatePicker
                classNames={{
                  label: cx(classes.label, textClass.label),
                  root: classes.root,
                  input: classes.textInput,
                }}
                icon={<FontAwesomeIcon icon={faCalendar} />}
                minDate={currentDate}
                mt="xl"
                label="Check-out"
                placeholder="Pick check-out date"
                {...form.getInputProps('checkOut')}
              />
            </SimpleGrid>
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
