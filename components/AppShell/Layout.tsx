import { useEffect, useState } from 'react';
import { AppShell, Header, Footer, createStyles } from '@mantine/core';
import { settings } from 'lib/settings';
import useFilledState from 'lib/hooks/useFilledState';
import { useRouter } from 'next/router';
import { HeaderDropdown, HeaderTop } from './Header';
import { useContainerStyles } from '@styles/containerStyles';
import { useTextStyles } from '@styles/typography';
import { useSession } from 'next-auth/react';
import { FooterContent } from './Footer/FooterContent';
import type { Session } from 'next-auth';
import { SessionType } from './Header/Navigation/NavMenu';

const { menuBreak, headerHeight } = settings;

const useStyles = createStyles((theme, _params, getRef) => ({
  content: {
    transition: 'opacity 0.5s ease-in-out',
  },
  fadeIn: {
    opacity: 1,
  },
  fadeOut: {
    opacity: 0,
  },
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
    minHeight: `calc(100vh + ${headerHeight}px)`,
    paddingBottom: 0,
  },
  footer: {
    background: theme.fn.linearGradient(92, theme.colors.blue[8], '#051524'),
  },
}));

type Props = Omit<React.ComponentPropsWithRef<'div'>, 'title'> & {
  children?: React.ReactNode;
};

export default function Layout({ children, ...others }: Props) {
  const { classes, cx } = useStyles();
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const filledState = useFilledState();

  // Page transition effect
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState(false);

  // Inputs changing on the location chips seem to re-render the whole page and I have no idea why.
  const [routerPath, setRouterPath] = useState(router.pathname);

  // Make the page content fade in immediately
  useEffect(() => {
    setTransitionStage(true);
  }, []);

  // Make the page content fade out
  useEffect(() => {
    if (routerPath === router.pathname) return;
    if (children !== displayChildren) {
      setTransitionStage(false);
      setRouterPath(router.pathname);
    }
  }, [children, setDisplayChildren, displayChildren, router.pathname, routerPath, setRouterPath]);
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
