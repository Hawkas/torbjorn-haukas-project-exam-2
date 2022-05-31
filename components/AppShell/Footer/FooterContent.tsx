import { createStyles, Text, Box, Anchor } from '@mantine/core';
import { useContainerStyles } from '@styles/containerStyles';
import { PrimaryButton } from '@Buttons/PrimaryButton';
import Logo from '@public/logobig.svg';
import { useTextStyles } from '@styles/typography';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useModals } from '@mantine/modals';
import { SignIn } from '@components/Modal/LogIn/SignIn';
import { useRouter } from 'next/router';
import type { SessionType } from '@AppShell/Header/Navigation/NavMenu';

const useFooterStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.other.largeSpacing.xxl,
    paddingBottom: 10,
    margin: '0 auto',
    gap: theme.other.largeSpacing.xxl,
  },
  upperSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    gap: theme.other.smallSpacing.lg,
  },
  logIn: {
    color: theme.white,
    borderColor: theme.white,
  },
  logo: {
    height: 56,
    width: 274.58,
    [theme.fn.smallerThan('xs')]: {
      height: 31,
      width: 152,
    },
  },
}));

export function FooterContent() {
  const { data: session } = useSession();
  const router = useRouter();
  const modals = useModals();
  const { classes, cx } = useFooterStyles();
  const { classes: textClass } = useTextStyles();
  const {
    classes: { container },
  } = useContainerStyles();
  const openSignInModal = () => {
    modals.openContextModal('signIn', {
      innerProps: {
        id: 'signIn',
        modalBody: <SignIn />,
      },
    });
  };
  return (
    <Box component="div" className={cx(container, classes.wrapper)}>
      <Box component="div" className={classes.upperSection}>
        <Link href="/" passHref>
          <Anchor component="a">
            <Logo className={classes.logo} viewBox="0 0 152 31" />
          </Anchor>
        </Link>
        {session ? (
          <PrimaryButton
            variant="outline"
            className={classes.logIn}
            onClick={async () => {
              const data = await signOut({
                callbackUrl: '/',
                redirect: router.pathname === '/admin' ? true : false,
              });
              if (data) router.push(data.url);
            }}
          >
            Log out
          </PrimaryButton>
        ) : (
          <PrimaryButton variant="outline" className={classes.logIn} onClick={openSignInModal}>
            Log in
          </PrimaryButton>
        )}
      </Box>
      <Text component="small" className={textClass.finePrint}>
        2022 © Holidaze. All rights reserved.
      </Text>
    </Box>
  );
}
