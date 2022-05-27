import { useState } from 'react';
import { AppShell, Header, Footer, createStyles } from '@mantine/core';
import { settings } from 'lib/settings';
import useFilledState from 'lib/hooks/useFilledState';
import { useRouter } from 'next/router';
import { HeaderDropdown, HeaderTop } from './Header';

import { useContainerStyles } from '@styles/containerStyles';

import { useTextStyles } from '@styles/typography';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FooterContent } from './Footer/FooterContent';

const { menuBreak, headerHeight } = settings;

const useStyles = createStyles((theme, _params, getRef) => ({
  header: {
    paddingRight: 'var(--removed-scroll-width)',
    transition: 'background-color 0.25s linear 0s',
    borderBottom: '1px solid transparent',
    backgroundColor: 'transparent',
    [`&.${getRef('filled')}`]: {
      borderColor: theme.colors.gray[3],
      backgroundColor: theme.fn.rgba(theme.colors.blue[8], 0.9),
    },
  },
  filled: {
    ref: getRef('filled'),
  },
  main: {
    width: '100%',
    paddingTop: 0,
    minHeight: 'calc(100vh - 213px)',
    paddingBottom: 0,
  },
  footer: {
    background: theme.fn.linearGradient(92, theme.colors.blue[8], '#051524'),
  },
}));

type Props = Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> & {
  children?: React.ReactNode;
};

export default function Layout({ children, ...others }: Props) {
  const { data: session } = useSession();
  const { classes, cx } = useStyles();
  const { classes: textClass } = useTextStyles();
  const {
    classes: { container },
  } = useContainerStyles();
  const [opened, setOpened] = useState(false);
  const filledState = useFilledState();
  const router = useRouter();
  const headerCheck = !filledState && !opened && router.pathname === '/';
  const clickEvent = () => {
    setOpened((o) => !o);
  };
  return (
    <AppShell
      classNames={{
        main: classes.main,
      }}
      padding={0}
      header={
        <Header
          fixed
          className={cx(classes.header, { [classes.filled]: !headerCheck })}
          height={headerHeight}
        >
          <HeaderTop menuBreak={menuBreak} clickEvent={clickEvent} opened={opened} />
        </Header>
      }
      navbar={<HeaderDropdown menuBreak={menuBreak} opened={opened} />}
      footer={
        <Footer height={214} className={classes.footer}>
          <FooterContent />
        </Footer>
      }
    >
      {children}
    </AppShell>
  );
}
