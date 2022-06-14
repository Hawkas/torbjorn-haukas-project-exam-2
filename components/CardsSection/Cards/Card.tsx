import { Anchor, Box, createStyles } from '@mantine/core';
import Link from 'next/link';
import { AccommodationClean } from 'types/accommodationClean';
import { CardBase } from './SmallParts/CardBase';

const useStyles = createStyles((theme, _params, getRef) => ({
  cardOuter: {
    '& a': {
      color: theme.colors.gray[6],
    },
    '&:hover a': {
      textDecoration: 'none',
    },
    '& img': {
      ref: getRef('image'),
      transform: 'scale(1)',
      transformOrigin: 'bottom',
      transition: 'transform 0.3s ease',
    },
    [`&:hover .${getRef('image')}`]: {
      transform: 'scale(1.05)',
    },
  },
}));

export function Card(props: AccommodationClean & { href: string }) {
  const { classes } = useStyles();
  return (
    <Box className={classes.cardOuter} component="article">
      <Link href={`/accommodations/${props.href}`} passHref>
        <Anchor>
          <CardBase {...props} />
        </Anchor>
      </Link>
    </Box>
  );
}
