import { pluralCheck, toEnglish } from '@helpers/stringConversions';
import { Box, createStyles, Group, Image, List, Stack, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useContainerStyles } from '@styles/containerStyles';
import { useTextStyles } from '@styles/typography';
import { useEffect, useState } from 'react';
import { AccommodationClean } from 'types/accommodationClean';

export const useRoomStyles = createStyles((theme) => ({
  cardOuter: {
    borderBottom: `2px solid ${theme.colors.gray[1]}`,
    paddingBottom: theme.other.largeSpacing.sm,
    alignItems: 'flex-start',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    gap: theme.other.largeSpacing.sm,
    [theme.fn.smallerThan('sm')]: {
      flexWrap: 'wrap',
      '& > *': {
        maxWidth: '100%',
        flexBasis: '100%',
      },
    },
  },
  image: {
    [theme.fn.largerThan('sm')]: {
      maxWidth: '445px',
    },
  },
  textWrap: {
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    [theme.fn.largerThan('sm')]: {
      maxWidth: '100%',
    },
  },
  roomTitle: {
    margin: 0,
  },
  roomList: {
    listStylePosition: 'outside',
    '& > *:not(:last-of-type)': {
      marginBottom: theme.other.smallSpacing.sm,
    },
  },
  price: {
    margin: 0,
    marginTop: 'auto',
    paddingTop: theme.other.largeSpacing.sm,
  },
}));

export function RoomList({ rooms, images: { rooms: roomImages } }: AccommodationClean) {
  const { classes, cx } = useRoomStyles();
  const { classes: containerClass } = useContainerStyles();
  const { classes: textClass } = useTextStyles();

  // Wacky breakpoint handling since the media query hook doesn't work when there's no window object(SSR etc).
  const breakpoint = useMediaQuery('(min-width: 768px)');
  const [grow, setGrow] = useState(true);
  useEffect(() => {
    setGrow(breakpoint);
  }, [breakpoint]);

  // Map out the room card components from array(TODO: clean this)
  const roomCard = rooms.map((room, index) => {
    const capitalize = true;
    const imageObj = roomImages[index];
    const {
      image: { alt, medium: image },
    } = imageObj! || roomImages[index];
    const extraListItems =
      room.features.length < 1
        ? null
        : room.features.map((item, featuresIndex) => {
            const { feature } = item;
            return <List.Item key={featuresIndex + 2}>{feature}</List.Item>;
          });
    return (
      <article key={index}>
        <Group grow={grow} className={classes.cardOuter}>
          <Image
            radius="xs"
            className={classes.image}
            src={image.src}
            alt={alt}
            imageProps={{ height: image.height, width: image.width }}
          />
          <Stack className={classes.textWrap}>
            <Stack spacing={16}>
              <Title order={3} className={cx(textClass.primaryH3, classes.roomTitle)}>
                {room.roomName}
              </Title>
              <List withPadding className={classes.roomList} listStyleType="circle">
                <List.Item key={0}>
                  {`Houses up to ${toEnglish(room.doubleBeds * 2 + room.singleBeds)} guests`}
                </List.Item>
                <List.Item key={1}>
                  {`${toEnglish(room.doubleBeds, capitalize)} double ${pluralCheck(
                    'bed',
                    room.doubleBeds
                  )}, ${toEnglish(room.singleBeds)} single ${pluralCheck('bed', room.singleBeds)}`}
                </List.Item>
                {extraListItems}
              </List>
            </Stack>
            <Group position="right">
              <Text className={cx(textClass.priceBig, classes.price)} component="p">
                {room.price} NOK
              </Text>
            </Group>
          </Stack>
        </Group>
      </article>
    );
  });
  return (
    <Box
      component="section"
      sx={(theme) => ({
        paddingTop: theme.other.largeSpacing.xxl,
        paddingBottom: theme.other.sectionSpacing.lg,
        [theme.fn.smallerThan('xs')]: {
          paddingBottom: theme.other.sectionSpacing.sm,
        },
      })}
      className={containerClass.container}
    >
      <Title
        order={2}
        sx={(theme) => ({
          color: theme.other.brandColor,
          marginBottom: theme.other.largeSpacing.sm,
        })}
        className={textClass.primaryH2}
      >
        Rooms
      </Title>
      <Stack justify="start" align="stretch" spacing={64}>
        {roomCard}
      </Stack>
    </Box>
  );
}
