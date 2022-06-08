import { PrimaryButton } from '@Buttons/PrimaryButton';
import { SignIn } from '@components/Modal/LogIn/SignIn';
import { Box, createStyles, Text } from '@mantine/core';
import { useModals } from '@mantine/modals';
import Logo from '@public/logobig-footer.svg';
import { useContainerStyles } from '@styles/containerStyles';
import { useTextStyles } from '@styles/typography';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
          <a aria-label="To home">
            <Logo className={classes.logo} viewBox="0 0 152 31" />
          </a>
        </Link>
        {session ? (
          <PrimaryButton
            variant="outline"
            className={classes.logIn}
            onClick={async () => {
              const data = await signOut({
                callbackUrl: '/',
                redirect: router.pathname === '/admin',
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
