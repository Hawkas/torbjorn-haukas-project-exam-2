import { PrimaryButton } from '@Buttons/PrimaryButton';
import { faClose, faCircleExclamation } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActionIcon, TextInput, Group, Text, LoadingOverlay, Alert } from '@mantine/core';
import { zodResolver, useForm } from '@mantine/form';
import { useModals } from '@mantine/modals';
import { useTextStyles } from '@styles/typography';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { string, z } from 'zod';
import { useStyles } from '../Contact/Contact.styles';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(1, { message: 'Please enter your password' }),
});

interface ResponseObject {
  error?: string | undefined;
  status?: number;
  ok?: boolean;
  url?: string | null;
}
interface Credentials {
  email: string;
  password: string;
}
type Results = ResponseObject;

async function modalSignIn(values: Credentials) {
  const response: any = signIn('credentials', {
    redirect: false,
    email: values.email,
    password: values.password,
  });
  const results: Results = await response;
  return results.ok;
}
export function SignIn() {
  const modals = useModals();
  const router = useRouter();

  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const form = useForm({
    schema: zodResolver(loginSchema),
    initialValues: { email: '', password: '' },
  });
  const { classes, cx } = useStyles();
  const { classes: textClass } = useTextStyles();
  const loadingToggle = () => setLoading((o) => !o);
  const errorToggle = () => setError((o) => !o);

  useEffect(() => {
    router.prefetch('/admin');
  });

  async function handleSignIn(values: Credentials) {
    loadingToggle();
    const response = await modalSignIn(values);
    const data = await response;
    setTimeout(() => {
      if (!data) {
        loadingToggle();
        if (!error) errorToggle();
        return;
      }
      modals.closeModal('signIn');
      router.push('/admin');
    }, 500);
  }

  return (
    <>
      <div className={classes.wrapper}>
        <LoadingOverlay visible={loading} />
        <form className={classes.form} onSubmit={form.onSubmit((values) => handleSignIn(values))}>
          <ActionIcon
            sx={{ position: 'absolute', top: 0, right: 0 }}
            onClick={() => modals.closeModal('signIn')}
          >
            <FontAwesomeIcon icon={faClose} />
          </ActionIcon>
          <Text mb={32} component="h2" className={cx(classes.title, textClass.primaryH3)}>
            Admin Access
          </Text>
          {error ? (
            <Alert
              icon={<FontAwesomeIcon icon={faCircleExclamation} />}
              title="Sign in failed"
              color="red"
              mb={32}
            >
              Check if the details you've provided are correct
            </Alert>
          ) : null}
          <div>
            <TextInput
              classNames={{
                label: cx(classes.label, textClass.label),
                root: classes.root,
                input: classes.textInput,
              }}
              mt="xl"
              type="email"
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
              type="password"
              label="Password"
              placeholder="Enter your password"
              {...form.getInputProps('password')}
            />

            <Group position="right">
              <PrimaryButton type="submit" primary className={classes.control}>
                Sign in
              </PrimaryButton>
            </Group>
          </div>
        </form>
      </div>
    </>
  );
}
