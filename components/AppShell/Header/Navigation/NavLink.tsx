import { Anchor } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { navStyles, LinkStyleProps } from './NavLink.styles';

export interface NavLinkProps extends LinkStyleProps {
  children: React.ReactNode;
  component?: 'a' | 'button';
  href: string;
  onClick?: React.MouseEventHandler;
}

export function NavLink({ children, component, onClick, menuBreak, ...others }: NavLinkProps) {
  const router = useRouter();
  const { classes, cx } = navStyles({ menuBreak });
  const buttonCheck = component === 'button';
  const AnchorLink = (
    <>
      <Anchor
        className={cx(
          classes.links,
          { [classes.active]: router.pathname === others.href },
          { [classes.button]: buttonCheck }
        )}
        component={component || 'a'}
        children={children}
        onClick={onClick}
      />
    </>
  );
  return buttonCheck ? (
    AnchorLink
  ) : (
    <>
      <Link passHref {...others}>
        {AnchorLink}
      </Link>
    </>
  );
}
