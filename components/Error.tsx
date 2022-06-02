import React from 'react';
import { NextPage } from 'next';
import { createStyles, Title, Text, Button, Container, Group } from '@mantine/core';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { PrimaryButton } from '@Buttons/PrimaryButton';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 60,
    paddingBottom: 80,
    display: 'flex',
    minHeight: 'calc(100vh - 60px)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));
interface ErrorProps {
  statusCode: number;
}
export default function Error({ statusCode }: ErrorProps) {
  const { classes } = useStyles();
  const router = useRouter();
  let pageTitle = `Page ${statusCode} | Holidaze`;
  let contentTitle = statusCode === 404 ? "There's nothing here" : 'Internal server error';
  let errorText =
    'Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has been moved to another URL.';
  if (statusCode === 500)
    errorText = 'Well this is awkward. Seems something went wrong on our end. Whoops';
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta property="og:title" content="Page 404 | Holidaze" key="title" />
        <meta name="description" content="This page does not exist" key="description" />
      </Head>
      <Container className={classes.root}>
        <div className={classes.label}>{statusCode}</div>
        <Title className={classes.title}>{contentTitle}</Title>
        <Text color="dimmed" size="lg" align="center" className={classes.description}>
          {errorText}
        </Text>
        <Group position="center">
          <PrimaryButton
            primary
            onClick={() => {
              router.push('/');
            }}
          >
            Take me back home
          </PrimaryButton>
        </Group>
      </Container>
    </>
  );
}
