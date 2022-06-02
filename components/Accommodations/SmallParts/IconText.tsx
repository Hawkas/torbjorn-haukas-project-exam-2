import type { IconDefinition } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { createStyles, Group, Text } from '@mantine/core';
interface IconTextProps {
  text: string;
  icon: IconDefinition;
  light?: boolean;
  big?: boolean;
  blue?: boolean;
}
const useStyles = createStyles(
  (theme, { light, big, blue }: Pick<IconTextProps, 'light' | 'big' | 'blue'>) => ({
    icon: {
      color: blue ? theme.colors.blue[8] : theme.colors.gray[4],
      minWidth: big ? '1.40625rem' : undefined,
    },
    text: {
      display: 'flex',
      flexWrap: 'nowrap',
      alignItems: 'baseline',
      alignContent: 'baseline',
      gap: big ? '8px' : '4px',
      color: blue ? theme.colors.blue[6] : theme.colors.gray[6],
      fontSize: big ? theme.other.fontSizes.lg : theme.other.fontSizes.sm,
      fontWeight: light ? theme.other.fontWeights.regular : theme.other.fontWeights.medium,
    },
  })
);

export function IconText({ text, icon, light, big, blue }: IconTextProps) {
  const { classes } = useStyles({ light, big, blue });
  return (
    <Text className={classes.text}>
      <FontAwesomeIcon fixedWidth className={classes.icon} icon={icon} />
      {text}
    </Text>
  );
}
