import { Anchor, createStyles, MantineNumberSize } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type StyleProps = {
  menuBreak: MantineNumberSize;
};

export interface NavLinkProps extends StyleProps {
  children: React.ReactNode;
  component?: 'a' | 'button';
  href: string;
}
const useStyles = createStyles((theme, { menuBreak }: StyleProps, getRef) => ({
  button: { display: 'flex', justifyContent: 'flex-start' },
  links: {
    color: theme.black,
    lineHeight: theme.other.lineHeights.body,
    fontWeight: theme.other.fontWeights.medium,
    [theme.fn.largerThan(menuBreak)]: {
      color: theme.fn.rgba(theme.white, 0.75),
      '&:hover': {
        color: theme.white,
        textDecoration: 'none',
      },
    },

    [`&.${getRef('active')}`]: {
      color: theme.white,
      [theme.fn.largerThan(menuBreak)]: {
        borderBottom: `1px solid ${theme.white}`,
      },
      [theme.fn.smallerThan(menuBreak)]: {
        backgroundColor: theme.colors.blue[0],
        color: theme.colors.blue[6],
        textDecoration: 'none',
      },
    },
  },
  active: {
    ref: getRef('active'),
  },
}));

export function NavLink({ children, component, href, menuBreak, ...rest }: NavLinkProps) {
  const router = useRouter();
  const { classes, cx } = useStyles({ menuBreak });
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
