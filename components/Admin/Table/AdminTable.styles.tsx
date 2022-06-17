import { createStyles } from '@mantine/core';

export const useTableStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
    minHeight: '46px',
    border: `1px solid ${theme.colors.gray[1]}`,
  },
  table: {
    borderSpacing: '0',
    '&, & tr, & td': {
      border: `1px solid ${theme.colors.gray[1]}`,
    },
  },
  header: {
    zIndex: 4,
    position: 'sticky',
    top: 56,
    minHeight: '46px',
    backgroundColor: theme.other.backgroundColor,
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      // Hiding subpixel gap from showing content underneath
      top: -0.5,
      height: '2px',
      backgroundColor: theme.colors.blue[0],
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `4px solid ${theme.colors.gray[1]}`,
    },
  },
  searchBar: {
    zIndex: 9,
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colors.blue[0],
    paddingBottom: theme.other.smallSpacing.xl,
  },
  searchInput: {
    borderColor: theme.colors.gray[1],
    borderRadius: theme.radius.xs,
  },
  control: {
    width: '100%',
    height: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    '&:hover': {
      backgroundColor: theme.colors.gray[0],
    },
  },
}));
