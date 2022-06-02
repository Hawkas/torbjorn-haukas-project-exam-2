import { EmblaCarousel } from '@components/Accommodation/EmblaCarousel';
import { IconText } from '@components/Accommodations/SmallParts/IconText';
import { faChevronLeft } from '@fortawesome/pro-light-svg-icons';
import { faBed, faLocationDot, faToilet } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Anchor, Box, createStyles, Divider, Group, Title } from '@mantine/core';
import { useContainerStyles } from '@styles/containerStyles';
import Link from 'next/link';
import { AccommodationClean } from 'types/accommodationClean';

const useStyles = createStyles((theme) => ({
  returnLink: {
    color: theme.colors.blue[5],
    fontWeight: theme.other.fontWeights.medium,
  },
}));
export function AccommodationHeader({
  images: { cover, rooms: roomImages },
  name,
  contactInfo,
  baths,
  beds,
}: AccommodationClean) {
  const { classes, cx } = useStyles();
  const { classes: containerClass } = useContainerStyles();

  return (
    <Box component="header" className={cx(containerClass.firstContainer, containerClass.container)}>
      <Group align="center" py="md" className={classes.returnLink} spacing="xs">
        <FontAwesomeIcon icon={faChevronLeft} />
        <Link href="/accommodations" passHref>
          <Anchor className={classes.returnLink}>Back to accommodations</Anchor>
        </Link>
      </Group>
      <EmblaCarousel cover={cover} roomImages={roomImages} />
      <Box>
        <Group
          sx={(theme) => ({
            marginTop: theme.other.largeSpacing.xxl,
            marginBottom: theme.other.smallSpacing.lg,
            [theme.fn.smallerThan('sm')]: {
              marginTop: theme.other.largeSpacing.sm,
            },
          })}
          position="apart"
        >
          <Title order={1}>{name}</Title>
          <IconText icon={faLocationDot} big blue text={contactInfo.address} />
        </Group>
        <Group spacing="sm" pb={32}>
          <IconText icon={faBed} big light blue text={beds} />
          <Divider
            size="lg"
            color="blue"
            sx={{ height: '3px', alignSelf: 'center' }}
            orientation="vertical"
          />
          <IconText icon={faToilet} big light blue text={baths} />
        </Group>
      </Box>
    </Box>
  );
}
