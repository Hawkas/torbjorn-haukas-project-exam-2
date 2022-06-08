import { PrimaryButton } from '@Buttons/PrimaryButton';
import { CardSection } from '@components/Accommodations/CardSection';
import { FiltersHeader } from '@components/Accommodations/FiltersHeader';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, createStyles } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { useContainerStyles } from '@styles/containerStyles';
import type { AdminProps } from 'types/commonProps';
import { CreateAccom } from '../Modal/CreateAccom/CreateAccom';

const useAdminAccomStyles = createStyles((theme) => ({
  createButton: {
    marginTop: theme.other.sectionSpacing.md,
    marginBottom: `calc(${theme.other.sectionSpacing.md} * -1)`,
  },
}));

export function AccommodationAdmin({ data }: Pick<AdminProps, 'data'>) {
  const { classes } = useAdminAccomStyles();
  const { classes: containerClass } = useContainerStyles();
  const modals = useModals();
  const openCreateModal = () =>
    modals.openModal({
      children: <CreateAccom />,
    });
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
      <CardSection data={data} admin />
    </>
  );
}
