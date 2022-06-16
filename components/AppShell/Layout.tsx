import { AppShell, createStyles, Footer, Header } from '@mantine/core';
import { useDidUpdate } from '@mantine/hooks';
import useFilledState from 'lib/hooks/useFilledState';
import { settings } from 'lib/settings';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AdminProps } from 'types/commonProps';

import { FooterContent } from './Footer/FooterContent';
import { HeaderDropdown, HeaderTop } from './Header';

const { menuBreak, headerHeight } = settings;

const useStyles = createStyles((theme, _params, getRef) => ({
  content: {
    transition: 'opacity 0.5s ease-in-out',
    height: '100%',
  },
  fadeIn: {
    opacity: 1,
  },
  fadeOut: {
    opacity: 0,
  },
  header: {
    pointerEvents: 'none',
    '& a, & button': {
      pointerEvents: 'all',
    },
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
    backgroundColor: theme.other.backgroundColor,
    width: '100%',
    paddingTop: 0,
    minHeight: `calc(100vh + ${headerHeight}px)`,
    height: '100%',
    paddingBottom: 0,
  },
  footer: {
    backgroundColor: theme.other.backgroundColor,
    backgroundImage: theme.fn.linearGradient(92, theme.colors.blue[8], '#051524'),
  },
}));

type Props = Omit<React.ComponentPropsWithRef<'div'>, 'title'> & {
  children?: React.ReactNode;
};

export default function Layout({ children, ...others }: Props & AdminProps) {
  const { classes, cx } = useStyles();
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const filledState = useFilledState();
  // Page transition effect
  const [displayChildren, setDisplayChildren] = useState<React.ReactNode>(children);
  const [transitionStage, setTransitionStage] = useState(false);

  // Inputs changing on the location chips seem to re-render the whole page
  const [routerPath, setRouterPath] = useState(router.pathname);

  // Make the page content fade in immediately
  useEffect(() => {
    setTransitionStage(true);
  }, []);

  // Big whoops. I noticed how pages weren't being regenerated with updated props with SSR.
  // This is to force an update in case the 'data' prop changes on my one and only SSR page.
  // I did this so early on, but of course saving an entire page as a state is a bad idea.
  // I'm letting it stay as a reminder. Also time is up.
  useDidUpdate(() => {
    if (router.pathname === '/admin' && routerPath === router.pathname) {
      setDisplayChildren(children);
    }
    if (routerPath === router.pathname) setDisplayChildren(children);
  }, [others.data, others.messageData, others.bookings]);
  // Make the page content fade out
  useEffect(() => {
    if (routerPath === router.pathname) return;
    if (children !== displayChildren) {
      setTransitionStage(false);
      setRouterPath(router.pathname);
    }
  }, [children, router.pathname]);
  const headerCheck = !filledState && !opened && router.pathname === '/' && transitionStage;
  const clickEvent = () => {
    setOpened((o) => !o);
  };
  return (
    <AppShell
      ref={others.ref}
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
      navbar={
        <HeaderDropdown
          menuBreak={menuBreak}
          opened={opened}
          onClick={() => setOpened((o) => !o)}
        />
      }
      footer={
        <Footer height={214} className={classes.footer}>
          <FooterContent />
        </Footer>
      }
    >
      <div
        onTransitionEnd={() => {
          if (!transitionStage) {
            setDisplayChildren(children);
            setTransitionStage(true);
          }
        }}
        className={cx(classes.content, classes[transitionStage ? 'fadeIn' : 'fadeOut'])}
      >
        {displayChildren}
      </div>
    </AppShell>
  );
}
