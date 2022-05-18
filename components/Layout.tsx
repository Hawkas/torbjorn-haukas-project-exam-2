import React, { useState, useRef } from 'react';
import {
  Anchor,
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  GroupedTransition,
  MediaQuery,
  Burger,
  useMantineTheme,
  createStyles,
} from '@mantine/core';
import Image from 'next/image';
import logoSvg from '../public/logo.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { settings } from '../globals/constants/settings';
import { NavLinks } from './Navigation/NavLinks';

const { menuBreak, headerHeight } = settings;
const duration = 500;
interface layoutProps {
  content: React.ReactNode;
}

const useStyles = createStyles((theme, _params, getRef) => ({
  header: {
    borderBottom: '0',
    backgroundColor: theme.fn.rgba(theme.colors.blue[8], 0.7),
    padding: '0 ' + theme.other.largeSpacing.sm,
    [theme.fn.smallerThan('xs')]: { padding: '0 ' + theme.other.smallSpacing.lg },
    [theme.fn.largerThan('lg')]: { padding: '0 ' + theme.other.largeSpacing.md },
    [theme.fn.largerThan('xl')]: { padding: '0' },
  },
  headerInner: {
    width: '100%',
    maxWidth: theme.other.containerMax,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'baseline',
    margin: '0 auto',
    height: '100%',
  },
  vertical: {
    display: 'none',
    flexDirection: 'column',
    [theme.fn.smallerThan(menuBreak)]: {
      display: 'flex',
    },
    '& > *': {
      padding: theme.other.smallSpacing.lg,
    },
  },
  horizontal: {
    display: 'flex',
    gap: '2.5rem',
    paddingTop: theme.other.smallSpacing.sm,
    [theme.fn.smallerThan(menuBreak)]: {
      display: 'none',
    },
  },
  main: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

export default function Layout(props: layoutProps) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  console.log(router.pathname);
  return (
    <>
      <AppShell
        classNames={{
          main: classes.main,
        }}
        padding={0}
        fixed
        header={
          <Header className={classes.header} height={headerHeight}>
            <div className={classes.headerInner}>
              <Anchor href="/" style={{ display: 'flex', alignItems: 'center' }}>
                <Image src={logoSvg} alt="Holidaze logo" width={135.11} height={32}></Image>
              </Anchor>
              <MediaQuery largerThan={menuBreak} styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="md"
                  color={theme.white}
                />
              </MediaQuery>
              <div className={classes.horizontal}>
                <NavLinks menuBreak={menuBreak}></NavLinks>
              </div>
            </div>
          </Header>
        }
        navbar={
          <GroupedTransition
            mounted={opened}
            transitions={{
              container: { duration, transition: 'slide-right', timingFunction: 'ease' },
              contents: { duration: duration / 2, transition: 'fade', timingFunction: 'ease' },
            }}
            duration={200}
            timingFunction="ease"
          >
            {(styles) => (
              <Navbar style={styles.contents} className={classes.vertical}>
                <NavLinks menuBreak={menuBreak}></NavLinks>
              </Navbar>
            )}
          </GroupedTransition>
        }
      >
        {props.content}
      </AppShell>
      <Footer height={60} p="md">
        Application footer
      </Footer>
    </>
  );
}
