import { Burger, MantineNumberSize, MediaQuery, useMantineTheme } from '@mantine/core';
import Logo from '@public/logobig.svg';
import { useContainerStyles } from 'lib/styles/containerStyles';
import Link from 'next/link';
import { useHeaderStyles } from './HeaderTop.styles';
import { NavMenu } from './Navigation/NavMenu';

export interface HeaderProps {
  menuBreak: MantineNumberSize;
  opened: boolean;
  clickEvent?: React.MouseEventHandler;
}

export function HeaderTop({ opened, menuBreak, clickEvent }: HeaderProps) {
  const theme = useMantineTheme();
  const { classes, cx } = useHeaderStyles(menuBreak);
  const {
    classes: { container },
  } = useContainerStyles();
  return (
    <>
      <div className={cx(container, classes.headerInner)}>
        <Link href="/" passHref>
          <a aria-label="To home" className={classes.logo}>
            <Logo />
          </a>
        </Link>
        <MediaQuery largerThan={menuBreak} styles={{ display: 'none' }}>
          <Burger opened={opened} onClick={clickEvent} size="md" color={theme.white} />
        </MediaQuery>
        <div className={classes.horizontal}>
          <NavMenu menuBreak={menuBreak} />
        </div>
      </div>
    </>
  );
}
