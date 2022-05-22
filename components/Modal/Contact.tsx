import React from 'react';
import {
  Paper,
  Text,
  TextInput,
  Textarea,
  Button,
  Group,
  SimpleGrid,
  createStyles,
  Title,
} from '@mantine/core';
import { ContactIconsList } from './ContactIconsList';
import { textStyles } from '@styles/typography';
import { PrimaryButton } from '@Buttons/PrimaryButton';

const useStyles = createStyles((theme) => {
  const breakPoint = theme.fn.smallerThan('sm');
  const paddingBreak = theme.fn.largerThan('sm');
  const outerEdge = '4px';

  return {
    wrapper: {
      display: 'flex',
      backgroundColor: theme.white,
      borderRadius: theme.radius.lg,
      padding: outerEdge,
      border: `1px solid ${theme.colors.gray[2]}`,

      [breakPoint]: {
        flexDirection: 'column',
      },
    },

    form: {
      flex: 1,
      padding: `calc(${theme.other.largeSpacing.sm} - ${outerEdge})`,
      paddingLeft: `calc(${theme.other.largeSpacing.xxl} - ${outerEdge})`,
      marginBottom: `calc(${theme.other.largeSpacing.sm} - ${outerEdge})`,
      borderLeft: 0,

      [breakPoint]: {
        padding: `calc(${theme.other.smallSpacing.lg} - ${outerEdge})`,
        paddingLeft: theme.spacing.md,
      },
    },
    fieldInput: {
      flex: 1,

      '& + &': {
        marginLeft: theme.spacing.md,

        [breakPoint]: {
          marginLeft: 0,
          marginTop: theme.spacing.md,
        },
      },
    },

    fieldsGroup: {
      display: 'flex',

      [breakPoint]: {
        flexDirection: 'column',
      },
    },

    contacts: {
      position: 'relative',
      borderRadius: theme.radius.lg - 2,
      backgroundImage: theme.fn.linearGradient(92, theme.colors.blue[8], '#051524'),
      border: '1px solid transparent',
      padding: theme.other.largeSpacing.sm,
      flex: '0 0 312px',
      paddingLeft: `calc(${theme.other.largeSpacing.sm} - ${outerEdge})`,

      [breakPoint]: {
        marginBottom: theme.spacing.sm,
      },
    },

    title: {
      marginBottom: theme.other.largeSpacing.md,
      fontSize: theme.other.fontSizes.xxl,
      fontWeight: theme.other.fontWeights.semiBold,
    },
    root: {
      position: 'relative',
    },
    textInput: {
      padding: theme.other.smallSpacing.lg,
      minHeight: theme.other.largeSpacing.xl,
    },
    label: {
      position: 'absolute',
      zIndex: 9,
      top: '-7px',
      left: -4,
      backgroundColor: theme.white,
      padding: `0 ${theme.other.smallSpacing.sm}`,
      marginLeft: theme.other.smallSpacing.lg,
    },
    control: {
      marginTop: theme.other.largeSpacing.md,
      [breakPoint]: {
        flex: 1,
      },
    },
  };
});

export function GetInTouch() {
  const { classes, cx } = useStyles();
  const { classes: textClass } = textStyles();
  return (
    <Paper shadow="md" radius="lg">
      <div className={classes.wrapper}>
        <div className={classes.contacts}>
          <Text
            component="h2"
            className={cx(classes.title, textClass.primaryH3)}
            sx={{ color: '#fff' }}
          >
            Contact information
          </Text>

          <ContactIconsList />
        </div>

        <form className={classes.form} onSubmit={(event) => event.preventDefault()}>
          <Text component="h2" className={cx(classes.title, textClass.primaryH3)}>
            Send us a message
          </Text>

          <div>
            <TextInput
              mt="xl"
              classNames={{
                label: cx(classes.label, textClass.label),
                root: classes.root,
                input: classes.textInput,
              }}
              label="Name"
              placeholder="Enter your name"
            />

            <TextInput
              classNames={{
                label: cx(classes.label, textClass.label),
                root: classes.root,
                input: classes.textInput,
              }}
              mt="xl"
              label="Email"
              placeholder="Enter your email"
            />

            <TextInput
              classNames={{
                label: cx(classes.label, textClass.label),
                root: classes.root,
                input: classes.textInput,
              }}
              mt="xl"
              label="Subject"
              placeholder="Enter a subject"
            />

            <Textarea
              classNames={{
                label: cx(classes.label, textClass.label),
                root: classes.root,
                input: classes.textInput,
              }}
              mt="xl"
              label="Message"
              placeholder="Enter your message"
              minRows={5}
            />

            <Group position="right">
              <PrimaryButton type="button" primary className={classes.control}>
                Send message
              </PrimaryButton>
            </Group>
          </div>
        </form>
      </div>
    </Paper>
  );
}
