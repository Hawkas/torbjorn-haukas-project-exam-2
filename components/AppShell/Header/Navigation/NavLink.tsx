import { Anchor } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useNavStyles, LinkStyleProps } from './NavLink.styles';

export interface NavLinkProps extends LinkStyleProps {
  children: React.ReactNode;
  component?: 'a' | 'button';
  href: string;
  onClick?: React.MouseEventHandler;
}

export function NavLink({ children, component, href, onClick, menuBreak }: NavLinkProps) {
  const router = useRouter();
  const { classes, cx } = useNavStyles({ menuBreak });
  const buttonCheck = component === 'button';
  const AnchorLink = (
    <Anchor
      href={href}
      className={cx(
        classes.links,
        { [classes.active]: router.pathname === href },
        { [classes.button]: buttonCheck }
      )}
      component={component || 'a'}
      onClick={onClick}
    >
      {children}
    </Anchor>
  );
  return buttonCheck ? (
    AnchorLink
  ) : (
    <Link passHref href={href}>
      {AnchorLink}
    </Link>
  );
}
