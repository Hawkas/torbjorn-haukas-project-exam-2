import ImageLink from '@components/DefaultTemplates/ImageLink';
import { faBed, faLocationDot, faToilet } from '@fortawesome/pro-solid-svg-icons';
import { createStyles, Group, Stack, useMantineTheme } from '@mantine/core';
import { AccommodationClean, Cover } from 'types/accommodationClean';
import { IconText } from './IconText';
import { TypePrice } from './TypePrice';

const useStyles = createStyles(() => ({
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
      backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23003355BF' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='14' stroke-linecap='square'/%3e%3c/svg%3e")`,
      backgroundSize: '200px 200px',
    },
  },
}));

export function CardBase(
  props: Omit<AccommodationClean, 'images'> & {
    images: { cover: Pick<Cover, 'medium' | 'alt'> };
  }
) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  return (
    <>
      <ImageLink cards text={props.name} image={props.images.cover} />
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
        <TypePrice type={props.type} price={props.minPrice} />
      </Stack>
    </>
  );
}
