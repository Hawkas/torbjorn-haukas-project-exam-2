import React from 'react';
import { Text, useMantineTheme, Image, Paper, Box, createStyles } from '@mantine/core';
import { textStyles } from '../../../globals/styles/typography';

interface ImageLink {
  text: string;
  imgSrc: string;
}

const imageLinkStyles = createStyles((theme) => ({
  labelContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    [theme.fn.largerThan(808)]: {
      marginTop: '-23px',
    },
    [theme.fn.largerThan(914)]: {
      marginTop: `-${theme.spacing.xl}`,
    },
  },
}));

export default function ImageLink({ text, imgSrc }: ImageLink) {
  const theme = useMantineTheme();
  const { classes } = imageLinkStyles();
  const { classes: textClass } = textStyles();
  return (
    <>
      <Box component="a">
        <Image
          radius="xs"
          src={imgSrc}
          alt="Inside of hotel room viewed from just outside the door"
        />
        <Box component="div" className={classes.labelContainer}>
          <Paper radius={0} p={theme.other.smallSpacing.lg} shadow="sm">
            <Text className={textClass.buttonAlt}>{text}</Text>
          </Paper>
        </Box>
      </Box>
    </>
  );
}
