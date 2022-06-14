import { EmblaCarousel } from '@components/Accommodation/SmallParts/EmblaCarousel';
import { IconText } from '@components/CardsSection/Cards/SmallParts/IconText';
import { faBed, faLocationDot, faToilet } from '@fortawesome/pro-solid-svg-icons';
import { Box, Divider, Group, Title } from '@mantine/core';
import { useContainerStyles } from '@styles/containerStyles';
import { AccommodationClean } from 'types/accommodationClean';
import { ReturnLink } from './SmallParts/ReturnLink';

export function AccommodationHeader({
  images: { cover, rooms: roomImages },
  name,
  contactInfo,
  baths,
  beds,
}: AccommodationClean) {
  const { classes: containerClass, cx } = useContainerStyles();

  return (
    <Box component="header" sx={(theme) => ({ backgroundColor: theme.white, minWidth: '100%' })}>
      <Box className={cx(containerClass.firstContainer, containerClass.container)}>
        <ReturnLink>Back to accommodations</ReturnLink>
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
    </Box>
  );
}
