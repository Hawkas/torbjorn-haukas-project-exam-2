import React from 'react';
import { Button, createStyles, SharedButtonProps, useMantineTheme } from '@mantine/core';
import { useTextStyles } from 'lib/styles/typography';
import Link from 'next/link';

const useButtonStyles = createStyles((theme) => ({
  button: {
    padding: `${theme.other.smallSpacing.md} ${theme.other.smallSpacing.xxl}`,
    height: theme.other.largeSpacing.xl,
    textDecoration: 'none',
    letterSpacing: theme.other.letterSpacing.xs,
  },
}));

interface MyButton {
  primary?: boolean;
  component?: any;
  href?: string;
  onClick?: React.MouseEventHandler;
}
export function PrimaryButton({
  primary,
  component,
  gradient,
  variant,
  ...others
}: MyButton & SharedButtonProps) {
  const theme = useMantineTheme();
  const { classes, cx } = useButtonStyles();
  const { classes: textClass } = useTextStyles();
  const button = (
    <Button
      href={others.href}
      radius={others.radius || 'md'}
      size={others.size || 'xl'}
      component={component || 'button'}
      gradient={primary ? { from: theme.colors.blue[8], to: '#051524', deg: 92 } : undefined}
      variant={variant || 'gradient'}
      classNames={{
        label: textClass.buttonPrimary,
        ...others.classNames,
      }}
      className={cx(classes.button, others.className)}
      {...others}
    />
  );
  return (
    <>
      {component === 'a' ? (
        <Link href={others.href!} passHref>
          {button}
        </Link>
      ) : (
        button
      )}
    </>
  );
}
