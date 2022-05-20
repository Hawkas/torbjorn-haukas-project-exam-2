import React, { MouseEventHandler } from 'react';
import { Anchor, Burger, MediaQuery, useMantineTheme, MantineNumberSize } from '@mantine/core';
import Image from 'next/image';
import { containerStyles } from '../../globals/styles/containerStyles.styles';
import logoSvg from '../../public/logobig.svg';
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
          <Image src={logoSvg} alt="Holidaze logo" width={152} height={31}></Image>
        </Anchor>
        <MediaQuery largerThan={menuBreak} styles={{ display: 'none' }}>
          <Burger opened={opened} onClick={setOpened} size="md" color={theme.white} />
        </MediaQuery>
        <div className={classes.horizontal}>
          <NavMenu menuBreak={menuBreak}></NavMenu>
        </div>
      </div>
    </>
  );
}
