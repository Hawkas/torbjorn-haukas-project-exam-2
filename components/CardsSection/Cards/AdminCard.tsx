import { CreateAccom } from '@components/Modal/CreateAccom/CreateAccom';
import { Box, createStyles, SimpleGrid, Text } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';
import { Session } from 'next-auth';
import { AccommodationClean } from 'types/accommodationClean';
import { CardActionFab } from './SmallParts/CardActionFab';
import { CardBase } from './SmallParts/CardBase';

const useStyles = createStyles(() => ({
  buttonWrapper: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
}));

export function AdminCard(
  props: AccommodationClean & { session: Session; refreshPage: () => void }
) {
  const { session, refreshPage, ...cardProps } = props;
  const modals = useModals();
  const { classes } = useStyles();
  const openEditModal = () =>
    modals.openContextModal('create', {
      closeOnClickOutside: false,
      id: 'create',
      innerProps: {
        modalBody: (
          <CreateAccom
            {...{
              session,
              refreshPage,
              modals,
              data: cardProps,
            }}
          />
        ),
      },
    });
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: `Are you sure you wish to delete ${cardProps.name}?`,
      children: <Text size="sm">This action is irreversible</Text>,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      styles: (theme) => ({ modal: { backgroundColor: theme.white } }),
      size: 'sm',
      padding: 'md',
      onConfirm: async () => {
        const response = await axios.request({
          method: 'DELETE',
          url: `${process.env.NEXT_PUBLIC_LIVE_API}/accommodations/${cardProps.id}`,
          headers: {
            Authorization: `Bearer ${session!.jwt}`,
          },
        });
        if (response.status < 300)
          showNotification({
            title: 'Delete successful',
            message: `${cardProps.name} is gone forever.`,
            autoClose: 5000,
            color: 'green',
            id: 'delete-message',
          });
        refreshPage();
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
