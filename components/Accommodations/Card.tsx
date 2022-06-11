import { CreateAccom } from '@components/Modal/CreateAccom/CreateAccom';
import { faBed, faLocationDot, faToilet } from '@fortawesome/pro-solid-svg-icons';
import { axiosFetch } from '@helpers/axiosFetch';
import ImageLink, { ImageProps } from '@Homepage/HomeSectionParts/ImageLink';
import {
  Anchor,
  Box,
  createStyles,
  Group,
  SimpleGrid,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useModals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { Session } from 'next-auth';
import Link from 'next/link';
import { AccommodationClean, CleanImages, Cover } from 'types/accommodationClean';
import { AttributesRoom } from 'types/accommodationRaw';
import { CardActionFab } from './SmallParts/CardActionFab';
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
      backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23003355BF' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='14' stroke-linecap='square'/%3e%3c/svg%3e")`,
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

export function CardBase(props: Omit<AccommodationClean, 'images'> & { images: { cover: Cover } }) {
  const { classes } = useCardStyles();
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

export function Card(props: AccommodationClean & { href: string }) {
  const { classes } = useCardStyles();
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
const useStyles = createStyles(() => ({
  buttonWrapper: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
}));
export function AdminCard(props: AccommodationClean & { session: Session }) {
  const { session, ...cardProps } = props;
  const modals = useModals();
  const { classes } = useStyles();
  const openEditModal = () => {
    const id = modals.openModal({
      closeOnClickOutside: false,
      children: <CreateAccom session={session} data={cardProps} />,
    });
  };
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: `Are you sure you wish to delete ${cardProps.name}?`,
      children: <Text size="sm">This action is irreversible</Text>,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      styles: (theme) => ({ modal: { backgroundColor: theme.white } }),
      size: 'sm',
      padding: 'md',
      onConfirm: async () => {
        const response = await axiosFetch({
          method: 'DELETE',
          url: `/accommodations/${cardProps.id}`,
          headers: {
            Authorization: `Bearer ${session!.jwt}`,
          },
        });
        if (response.data)
          showNotification({
            title: 'Delete successful',
            message: `${cardProps.name} is gone forever.`,
            autoClose: 5000,
            color: 'green',
            id: 'delete-message',
          });
      },
    });
  return (
    <Box sx={{ position: 'relative' }}>
      <CardBase {...cardProps} />
      <SimpleGrid
        className={classes.buttonWrapper}
        cols={1}
        breakpoints={[{ maxWidth: 'md', cols: 2 }]}
        spacing="lg"
      >
        <CardActionFab onClick={openEditModal} />
        <CardActionFab deleteBtn onClick={openDeleteModal} />
      </SimpleGrid>
    </Box>
  );
}
