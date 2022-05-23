import React, { MouseEventHandler } from 'react';
import Logo from '@public/logobig.svg';
import { Anchor, Burger, MediaQuery, useMantineTheme, MantineNumberSize } from '@mantine/core';

import { containerStyles } from '@styles/containerStyles';
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
        <Anchor href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Logo />
        </Anchor>
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
