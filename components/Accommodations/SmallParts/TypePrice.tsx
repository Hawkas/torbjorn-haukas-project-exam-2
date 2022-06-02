import { createStyles, Group, Text } from '@mantine/core';
import { useTextStyles } from '@styles/typography';

const useStyles = createStyles((theme) => ({
  wrapper: {
    padding: `${theme.other.smallSpacing.lg} 0`,
  },
}));
export function TypePrice({ type, price }: { type: string; price: string | number }) {
  const { classes: textClass } = useTextStyles();
  const { classes } = useStyles();
  return (
    <Group noWrap spacing={8} className={classes.wrapper} position="apart">
      <Text>{type}</Text>
      <Text>
        from{' '}
        <Text component="span" color="dark" className={textClass.priceSmall}>
          {price} NOK
        </Text>
      </Text>
    </Group>
  );
}
