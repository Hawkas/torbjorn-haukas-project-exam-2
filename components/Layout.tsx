import { ReactNode, useState } from 'react';
import { AppShell, Header, Footer, createStyles, Text, AppShellProps } from '@mantine/core';
import { settings } from '@globals/settings';
import useFilledState from '@hooks/useFilledState';
import { useRouter } from 'next/router';
import { HeaderDropdown, HeaderTop } from './Header';
import { AppProps } from 'next/app';
import { NextComponentType, NextPageContext } from 'next';

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
    paddingBottom: 0,
  },
}));

type Props = Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> & {
  children?: React.ReactNode;
};

export default function Layout({ children, ...others }: Props) {
  const { classes, cx } = useStyles();
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
        <Footer
          height={158}
          p="md"
          sx={(theme) => ({
            background: theme.other.gradient,
          })}
        >
          <Text>Scroll position: {`${filledState}`}</Text>
        </Footer>
      }
    >
      {children}
    </AppShell>
  );
}
