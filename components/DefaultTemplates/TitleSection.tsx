import { Box, createStyles, Title } from '@mantine/core';
import { useContainerStyles } from '@styles/containerStyles';

interface StyleProps {
  darkBg?: boolean;
}

const useStyles = createStyles((theme, { darkBg }: StyleProps) => ({
  fluidContainer: {
    backgroundColor: darkBg ? theme.colors.blue[7] : theme.colors.blue[0],
    width: '100%',
    position: 'relative',
    paddingTop: 'var(--mantine-header-height)',
    '&:after': {
      display: darkBg ? 'none' : 'block',
      position: 'absolute',
      content: `" "`,
      bottom: 0,
      left: 0,
      right: 0,
      height: '4px',
      zIndex: 0,
      backgroundColor: theme.colors.gray[1],
    },
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    margin: '0',
    marginTop: theme.other.sectionSpacing.md,
    paddingBottom: theme.other.sectionSpacing.sm,
    color: darkBg ? theme.white : theme.other.brandColor,
  },
}));
interface Props extends StyleProps {
  children: React.ReactNode;
  title: string;
  order?: 1 | 2;
}
export function TitleSection({ children, title, darkBg, order }: Props) {
  const { classes, cx } = useStyles({ darkBg });
  const {
    classes: { container, firstContainer },
  } = useContainerStyles();
  return (
    <Box className={classes.fluidContainer} component="header" px="0">
      <Box className={darkBg ? firstContainer : cx(container, firstContainer)}>
        <Title className={classes.title} order={order || 1}>
          {title}
        </Title>
        {children}
      </Box>
    </Box>
  );
}
