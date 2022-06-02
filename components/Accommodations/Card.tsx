import { faBed, faLocationDot, faToilet } from '@fortawesome/pro-solid-svg-icons';
import ImageLink, { ImageProps } from '@Homepage/HomeSectionParts/ImageLink';
import { Anchor, Box, createStyles, Group, Stack, useMantineTheme } from '@mantine/core';
import Link from 'next/link';
import { IconText } from './SmallParts/IconText';
import { TypePrice } from './SmallParts/TypePrice';

const useCardStyles = createStyles((theme, _params, getRef) => ({
  cardDetails: {
    position: 'relative',
    '&::after': {
      display: 'block',
      content: `""`,
      position: 'absolute',
      bottom: -1,
      minWidth: '256px',
      width: '100%',
      height: '2px',
      opacity: 0.25,
      backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23003355BF' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
      backgroundSize: '200px 200px',
    },
  },
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

export interface CardProps {
  image: ImageProps;
  name: string;
  location: string;
  beds: string;
  baths: string;
  type: string;
  price: string | number;
  href: string;
}

export function Card(props: CardProps) {
  const { classes } = useCardStyles();
  const theme = useMantineTheme();
  return (
    <Box className={classes.cardOuter} component="article">
      <Link href={`/accommodations/${props.href}`} passHref>
        <Anchor>
          <ImageLink cards text={props.name} image={props.image} />
          <Stack spacing={0} mx={theme.other.smallSpacing.lg}>
            <Group
              noWrap
              py={theme.other.smallSpacing.lg}
              className={classes.cardDetails}
              position="apart"
            >
              <IconText icon={faLocationDot} text={props.location} />
              <Group noWrap position="right" spacing="lg">
                <IconText light icon={faBed} text={props.beds} />
                <IconText light icon={faToilet} text={props.baths} />
              </Group>
            </Group>
            <TypePrice type={props.type} price={props.price} />
          </Stack>
        </Anchor>
      </Link>
    </Box>
  );
}