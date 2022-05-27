import React from 'react';
import { Button, ButtonProps, createStyles, useMantineTheme } from '@mantine/core';
import { useTextStyles } from 'lib/styles/typography';

const useButtonStyles = createStyles((theme) => ({
  button: {
    padding: `${theme.other.smallSpacing.md} ${theme.other.smallSpacing.xxl}`,
    height: theme.other.largeSpacing.xl,
  },
}));

interface MyButton {
  primary?: boolean;
  component?: 'a' | 'button';
}
export function PrimaryButton({
  primary,
  component,
  gradient,
  variant,
  ...others
}: MyButton & Omit<ButtonProps<'button'>, 'component'> & Omit<ButtonProps<'a'>, 'component'>) {
  const theme = useMantineTheme();
  const { classes, cx } = useButtonStyles();
  const { classes: textClass } = useTextStyles();
  return (
    <Button
      href={others.href}
      radius={others.radius || 'md'}
      size={others.size || 'xl'}
      component={component || 'button'}
      gradient={primary ? { from: theme.colors.blue[8], to: '#051524', deg: 92 } : undefined}
      variant={variant || 'gradient'}
      classNames={{ label: textClass.buttonPrimary, ...others.classNames }}
      className={cx(classes.button, others.className)}
      {...others}
    />
  );
}
