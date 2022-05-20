import { Anchor } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { navStyles, LinkStyleProps } from './NavLink.styles';

export interface NavLinkProps extends LinkStyleProps {
  children: React.ReactNode;
  component?: 'a' | 'button';
  href: string;
}

export function NavLink({ children, component, href, menuBreak }: NavLinkProps) {
  const router = useRouter();
  const { classes, cx } = navStyles({ menuBreak });
  return (
    <Link href={href} passHref>
      <Anchor
        className={cx(
          classes.links,
          { [classes.active]: router.pathname === href },
          { [classes.button]: component === 'button' }
        )}
        component={component}
      >
        {children}
      </Anchor>
    </Link>
  );
}
