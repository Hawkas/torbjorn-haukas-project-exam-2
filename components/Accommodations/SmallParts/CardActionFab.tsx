import { faPen, faTrash } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActionIcon, createStyles, Tooltip } from '@mantine/core';

const useCardActionStyles = createStyles((theme) => ({
  button: {
    backgroundColor: theme.white,
    boxShadow: theme.shadows.sm,
    fontSize: theme.other.fontSizes.xl,
    '&:hover': {
      backgroundColor: theme.colors.blue[0],
    },
  },
  deleteButton: { color: theme.colors.red[6] },
  editButton: { color: theme.colors.blue[6] },
}));

export function CardActionFab({ deleteBtn }: { deleteBtn?: boolean }) {
  const { classes, cx } = useCardActionStyles();
  const tooltipId = deleteBtn ? 'delete-fab' : 'edit-fab';
  return (
    <Tooltip label={deleteBtn ? 'Delete' : 'Edit'} withArrow position="left" tooltipId={tooltipId}>
      <ActionIcon
        aria-describedby={tooltipId}
        radius="lg"
        className={cx(classes.button, {
          [classes.editButton]: !deleteBtn,
          [classes.deleteButton]: deleteBtn,
        })}
        variant="filled"
        size="xl"
      >
        <FontAwesomeIcon icon={deleteBtn ? faTrash : faPen} />
      </ActionIcon>
    </Tooltip>
  );
}
