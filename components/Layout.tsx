import React, { useState } from 'react';
import { AppShell, Header, Footer, createStyles, Text } from '@mantine/core';
import { settings } from '../globals/constants/settings';
import useFilledState from '../globals/hooks/useFilledState';
import { HeaderDropdown } from './Header/HeaderDropdown';
import { HeaderTop } from './Header/HeaderTop';
import { useRouter } from 'next/router';

const { menuBreak, headerHeight } = settings;
interface layoutProps {
  content: React.ReactNode;
}
const useStyles = createStyles((theme) => ({
  header: {
    transition: 'all 0.25s linear 0s',
    borderBottom: '1px solid transparent',
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  filled: {
    borderColor: theme.colors.gray[3],
    backgroundColor: theme.fn.rgba(theme.colors.blue[8], 0.9),
  },
  main: {
    width: '100%',
    paddingTop: 0,
    paddingBottom: 0,
  },
}));
export default function Layout({ content }: layoutProps) {
  const { classes, cx } = useStyles();
  const [opened, setOpened] = useState(false);
  const filledState = useFilledState();
  const router = useRouter();
  const headerCheck = !filledState && !opened && router.pathname === '/';
  const clickEvent = () => {
    setOpened((o) => !o);
  };
  return (
    <>
      <AppShell
        classNames={{
          main: classes.main,
        }}
        padding={0}
        header={
          <Header
            fixed
            className={cx(classes.header, headerCheck ? classes.transparent : classes.filled)}
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
        {content}
      </AppShell>
    </>
  );
}
