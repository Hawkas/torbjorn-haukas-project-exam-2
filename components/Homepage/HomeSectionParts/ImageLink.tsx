import React from 'react';
import { Text, useMantineTheme, Image, Paper, Box, createStyles } from '@mantine/core';
import { textStyles } from '@styles/typography';

interface ImageLink {
  text: string;
  imgSrc: string;
  href?: string;
}

const imageLinkStyles = createStyles((theme, _params, getRef) => ({
  image: {
    ref: getRef('image'),
    transform: 'scale(1)',
    transformOrigin: 'bottom',
    transition: 'transform 0.2s ease-in-out',
  },
  root: {
    cursor: 'pointer',
    [`&:hover .${getRef('image')}`]: {
      transform: 'scale(1.015)',
    },
  },
  labelContainer: {
    borderRadius: theme.radius.xs,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    [theme.fn.largerThan(808)]: {
      marginTop: '-23px',
    },
    [theme.fn.largerThan(914)]: {
      marginTop: `-${theme.spacing.xl}px`,
    },
  },
}));

export default function ImageLink({ text, imgSrc, href }: ImageLink) {
  const theme = useMantineTheme();
  const { classes } = imageLinkStyles();
  const { classes: textClass } = textStyles();
  return (
    <>
      <Box className={classes.root} component="a" href={href}>
        <Image
          classNames={{
            image: classes.image,
          }}
          radius="xs"
          src={imgSrc}
          className={classes.image}
          alt="Inside of hotel room viewed from just outside the door"
        />
        <Box component="div" mt="-xl" className={classes.labelContainer}>
          <Paper radius="xs" p={theme.other.smallSpacing.lg} shadow="sm">
            <Text className={textClass.buttonAlt}>{text}</Text>
          </Paper>
        </Box>
      </Box>
    </>
  );
}
