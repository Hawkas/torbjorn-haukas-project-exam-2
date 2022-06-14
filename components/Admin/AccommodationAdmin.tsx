import { PrimaryButton } from '@Buttons/PrimaryButton';
import { FiltersHeader } from '@components/Accommodations/FiltersHeader';
import { CardSection } from '@components/CardsSection/CardSection';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, createStyles } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { useContainerStyles } from '@styles/containerStyles';
import { Session } from 'next-auth';
import type { AdminProps } from 'types/commonProps';
import { CreateAccom } from '../Modal/CreateAccom/CreateAccom';

const useAdminAccomStyles = createStyles((theme) => ({
  createButton: {
    marginTop: theme.other.sectionSpacing.md,
    marginBottom: `calc(${theme.other.sectionSpacing.md} * -1)`,
  },
}));

export function AccommodationAdmin({
  data,
  session,
  refreshPage,
}: Pick<AdminProps, 'data'> & { session: Session; refreshPage: () => void }) {
  const { classes } = useAdminAccomStyles();
  const { classes: containerClass } = useContainerStyles();
  const modals = useModals();
  const openCreateModal = () => {
    modals.openContextModal('create', {
      closeOnClickOutside: false,
      id: 'create',
      innerProps: {
        modalBody: <CreateAccom {...{ session, refreshPage, modals }} />,
      },
    });
  };
  return (
    <>
      <FiltersHeader order={2} />
      <Box className={containerClass.container}>
        <PrimaryButton
          className={classes.createButton}
          rightIcon={<FontAwesomeIcon icon={faPlus} />}
          primary
          onClick={openCreateModal}
        >
          Add new establishment
        </PrimaryButton>
      </Box>
      <CardSection data={data} admin session={session} refreshPage={refreshPage} />
    </>
  );
}
