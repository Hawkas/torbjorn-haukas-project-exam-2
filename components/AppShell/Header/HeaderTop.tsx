import { Anchor, Burger, MantineNumberSize, MediaQuery, useMantineTheme } from '@mantine/core';
import Logo from '@public/logobig.svg';
import { containerStyles } from 'lib/styles/containerStyles';
import Link from 'next/link';
import React, { MouseEventHandler } from 'react';
import { headerStyles } from './HeaderTop.styles';
import { NavMenu } from './Navigation/NavMenu';

export interface HeaderProps {
  menuBreak: MantineNumberSize;
  opened: boolean;
  clickEvent?: MouseEventHandler;
}

export function HeaderTop({ opened, menuBreak, clickEvent }: HeaderProps) {
  const theme = useMantineTheme();
  const { classes, cx } = headerStyles(menuBreak);
  const {
    classes: { container },
  } = containerStyles();
  const setOpened = clickEvent;
  return (
    <>
      <div className={cx(container, classes.headerInner)}>
        <Link href="/" passHref>
          <Anchor component="a" className={classes.logo}>
            <Logo />
          </Anchor>
        </Link>
        <MediaQuery largerThan={menuBreak} styles={{ display: 'none' }}>
          <Burger opened={opened} onClick={setOpened} size="md" color={theme.white} />
        </MediaQuery>
        <div className={classes.horizontal}>
          <NavMenu menuBreak={menuBreak} />
        </div>
      </div>
    </>
  );
}
