import { Box, createStyles, Title } from '@mantine/core';
import { useContainerStyles } from '@styles/containerStyles';

interface StyleProps {
  darkBg?: boolean;
}

const useStyles = createStyles((theme, { darkBg }: StyleProps) => ({
  fluidContainer: {
    backgroundColor: darkBg ? theme.colors.blue[7] : theme.colors.blue[0],
    width: '100%',
    paddingTop: 'var(--mantine-header-height)',
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
      <Box className={cx(container, firstContainer)}>
        <Title className={classes.title} order={order || 1}>
          {title}
        </Title>
        {children}
      </Box>
    </Box>
  );
}
