import React, { Children, ReactComponentElement } from 'react';
import { Grid, Title, Text, useMantineTheme, Button, Image, createStyles } from '@mantine/core';
import fishingVillage from '../../public/fishing_village-1000w-629h.jpg';
import { textStyles } from '../../../globals/styles/typography';
import { articleStyles } from './ArticleBlock.styles';

interface ArticleBlock {
  subheader: string;
  title: string;
  imgSrc: string;
  tallImg?: true | false;
  children: typeof Children;
}

export function ArticleBlock({ subheader, title, imgSrc, tallImg, children }: ArticleBlock) {
  const theme = useMantineTheme();
  const { classes } = articleStyles();
  const { classes: textClass } = textStyles();

  return (
    <Grid
      mt={theme.other.sectionSpacing.lg}
      mb={theme.other.sectionSpacing.sm}
      gutter={0}
      columns={1320}
      justify="space-between"
      align="stretch"
    >
      <Grid.Col sm={672} md={560} xs={1320} className={classes.textContainer}>
        <Title mb={theme.other.smallSpacing.xl} className={textClass.serifH2}>
          <Text mb={theme.other.smallSpacing.xl} className={textClass.subHeader}>
            We are Holidaze
          </Text>
          <Text inherit>We help you find accommodations</Text>
        </Title>
        <Text>
          Holidaze is here to help travellers like you find lodging that suits your budget and
          needs. Whether you’d prefer to stay in the city of Bergen or a cozy cabin surrounded by
          spruce and pine trees, we’ll assist you in finding a comfortable place to relax during
          your stay.
        </Text>
        <Button
          component="a"
          radius={'md'}
          size="xl"
          mt={theme.other.largeSpacing.md}
          px={theme.other.smallSpacing.xxl}
          py={theme.other.smallSpacing.md}
          style={{ height: theme.other.largeSpacing.xl, boxShadow: theme.shadows.sm }}
          classNames={{ label: textClass.buttonPrimary }}
          sx={{ background: theme.other.gradient }}
        >
          View all accommodations
        </Button>
      </Grid.Col>
      <Grid.Col sm={560} md={672} xs={1320} className={classes.imageContainer}>
        <Image
          radius="xs"
          height="100%"
          classNames={{
            imageWrapper: classes.imageWrap,
            image: classes.image,
          }}
          src={fishingVillage.src}
          alt="Norwegian fishing village with norwegian flag"
        />
      </Grid.Col>
    </Grid>
  );
}

function TextBlock() {
  const theme = useMantineTheme();
  const { classes } = articleStyles();
  const { classes: textClass } = textStyles();
  return (
    <>
      <Title mb={theme.other.smallSpacing.xl} className={textClass.serifH2}>
        <Text mb={theme.other.smallSpacing.xl} className={textClass.subHeader}>
          We are Holidaze
        </Text>
        <Text inherit>We help you find accommodations</Text>
      </Title>
      <Text>
        Holidaze is here to help travellers like you find lodging that suits your budget and needs.
        Whether you’d prefer to stay in the city of Bergen or a cozy cabin surrounded by spruce and
        pine trees, we’ll assist you in finding a comfortable place to relax during your stay.
      </Text>
      <Button
        component="a"
        radius={'md'}
        size="xl"
        mt={theme.other.largeSpacing.md}
        px={theme.other.smallSpacing.xxl}
        py={theme.other.smallSpacing.md}
        style={{ height: theme.other.largeSpacing.xl, boxShadow: theme.shadows.sm }}
        classNames={{ label: textClass.buttonPrimary }}
        sx={{ background: theme.other.gradient }}
      >
        View all accommodations
      </Button>
    </>
  );
}

export const buttonStyles = createStyles((theme, _param, getRef) => ({
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
