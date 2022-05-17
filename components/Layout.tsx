import React, { useState, useRef } from 'react';
import {
  Anchor,
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  createStyles,
} from '@mantine/core';
import Image from 'next/image';
import logoSvg from '../public/logo.svg';
import { relative } from 'path';

interface layoutProps {
  content: React.ReactNode;
}

const useStyles = createStyles((theme, _params, getRef) => ({
  header: {
    backgroundColor: theme.other.brandColor,
    [theme.fn.smallerThan('sm')]: { padding: '0 ' + theme.other.smallSpacing.lg },
    [theme.fn.smallerThan('md')]: { height: '70px' },
    [theme.fn.largerThan('sm')]: { padding: '0 ' + theme.other.largeSpacing.sm },
    [theme.fn.largerThan('lg')]: { padding: '0 ' + theme.other.largeSpacing.md },
    [theme.fn.largerThan('xl')]: { padding: '0' },
  },
  // navbar: {
  //   [theme.fn.largerThan('sm')]: {
  //     display: 'none',
  //   },
  // },
  vertical: {
    whiteSpace: 'nowrap',
  },
  headerInner: {
    ref: getRef('headerInner'),
    maxWidth: theme.other.containerMax,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0 auto',
    height: '100%',
  },
  links: {
    '& > *': {
      fontWeight: theme.other.fontWeights.medium,
      color: theme.white,
    },
  },
  horizontal: {
    display: 'flex',
    gap: '2.5rem',
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
    '& > *': {
      color: theme.fn.rgba(theme.white, 0.75),
    },
  },
}));

export default function Layout(props: layoutProps) {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <>
      <AppShell
        styles={{
          main: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            transition: 'padding-left 1000ms ease',
          },
        }}
        fixed
        header={
          <Header className={classes.header} height={60}>
            <div className={classes.headerInner}>
              <Anchor href="/" style={{ display: 'flex', alignItems: 'center' }}>
                <Image src={logoSvg} alt="Holidaze logo" width={135.11} height={32}></Image>
              </Anchor>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.white}
                />
              </MediaQuery>
              <div className={cx(classes.horizontal, classes.links)}>
                <Anchor href="/">Home</Anchor>
                <Anchor href="/accommodations">Accommodations</Anchor>
                <Anchor>Contact us</Anchor>
              </div>
            </div>
          </Header>
        }
        navbar={
          <Navbar
            // className={cx(classes.navbar)}
            width={{ sm: opened ? 300 : 0 }}
            hidden={!opened}
            sx={{ overflow: 'hidden', transition: 'width 1000ms ease, min-width 1000ms ease' }}
          >
            <div className={cx(classes.vertical, classes.links)}>
              <Anchor href="/">Home</Anchor>
              <Anchor href="/accommodations">Accommodations</Anchor>
              <Anchor>Contact Us</Anchor>
            </div>
          </Navbar>
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
