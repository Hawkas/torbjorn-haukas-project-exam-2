import React from 'react';
import { Button, ButtonProps, createStyles } from '@mantine/core';
import { textStyles } from '../../globals/styles/typography';

const buttonStyles = createStyles((theme, _param, getRef) => ({
  primaryButton: {
    ref: getRef('primaryButton'),
  },
  button: {
    padding: `${theme.other.smallSpacing.md} ${theme.other.smallSpacing.xxl}`,
    height: theme.other.largeSpacing.xl,
    [`&.${getRef('primaryButton')}`]: {
      background: theme.other.gradient,
      boxShadow: theme.shadows.sm,
    },
  },
}));
export function PrimaryButton({ onClick, mt, mb, component, sx, children }: ButtonProps<'button'>) {
  const { classes, cx } = buttonStyles();
  const { classes: textClass } = textStyles();
  return (
    <>
      <Button
        onClick={onClick || undefined}
        component={component || undefined}
        radius="md"
        size="xl"
        mt={mt || undefined}
        mb={mb || undefined}
        sx={sx || undefined}
        classNames={{ label: textClass.buttonPrimary }}
        className={cx(classes.button, classes.primaryButton)}
      >
        {children}
      </Button>
    </>
  );
}
