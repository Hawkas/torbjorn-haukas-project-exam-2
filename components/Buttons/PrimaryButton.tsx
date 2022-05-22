import React, { MouseEventHandler } from 'react';
import { Button, ButtonProps, createStyles, useMantineTheme } from '@mantine/core';
import { textStyles } from '@styles/typography';

const buttonStyles = createStyles((theme) => ({
  button: {
    padding: `${theme.other.smallSpacing.md} ${theme.other.smallSpacing.xxl}`,
    height: theme.other.largeSpacing.xl,
  },
}));

interface MyButton
  extends Pick<
      ButtonProps<'button'>,
      'mt' | 'mb' | 'sx' | 'children' | 'variant' | 'type' | 'className'
    >,
    Pick<ButtonProps<'a'>, 'href'> {
  primary?: boolean;
  component?: 'button' | 'a';
  clickEvent?: MouseEventHandler;
}

export function PrimaryButton({
  primary,
  clickEvent,
  component,
  mt,
  mb,
  sx,
  children,
  variant,
  href,
  type,
  className,
}: MyButton) {
  const theme = useMantineTheme();
  const { classes, cx } = buttonStyles();
  const { classes: textClass } = textStyles();

  return (
    <>
      <Button
        type={type}
        href={href}
        gradient={primary ? { from: theme.colors.blue[8], to: '#051524', deg: 92 } : undefined}
        variant={variant || 'gradient'}
        onClick={clickEvent || undefined}
        component={component || 'button'}
        radius="md"
        size="xl"
        mt={mt || undefined}
        mb={mb || undefined}
        sx={sx || undefined}
        classNames={{ label: textClass.buttonPrimary }}
        className={cx(classes.button, className)}
      >
        {children}
      </Button>
    </>
  );
}
