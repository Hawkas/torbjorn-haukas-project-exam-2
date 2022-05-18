import { forwardRef } from 'react';
import {
  Group,
  Avatar,
  Text,
  MantineColor,
  SelectItemProps,
  Autocomplete,
  createStyles,
} from '@mantine/core';
import { collectAssets } from 'next/dist/build/webpack/plugins/middleware-plugin';

const useStyles = createStyles((theme) => ({
  searchbar: {
    width: '100%',
    minHeight: '66px',
    padding: `${theme.other.smallSpacing.lg} ${theme.other.smallSpacing.xl}`,
    boxShadow: '0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.3)',
    borderRadius: theme.radius.md,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    margin: '0 auto',
    minWidth: '288px',
    maxWidth: '648px',
  },
  label: {
    fontWeight: theme.other.fontWeights.bold,
    fontSize: theme.other.fontSizes.sm,
    letterSpacing: theme.other.letterSpacing.lg,
    color: theme.white,
    textShadow: '0px 8px 12px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    marginBottom: theme.other.smallSpacing.xxl,
    textTransform: 'uppercase',
  },
}));
const charactersList = [
  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
    label: 'Bender Bending Rodríguez',
    description: 'Fascinated with cooking, though has no sense of taste',
  },

  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
    label: 'Carol Miller',
    description: 'One of the richest people on Earth',
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/homer-simpson.png',
    label: 'Homer Simpson',
    description: 'Overweight, lazy, and often ignorant',
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png',
    label: 'Spongebob Squarepants',
    description: 'Not just a sponge',
  },
];

const data = charactersList.map((item) => ({ ...item, value: item.label }));

interface ItemProps extends SelectItemProps {
  color: MantineColor;
  description: string;
  image: string;
}

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ description, value, image, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} />

        <div>
          <Text>{value}</Text>
          <Text size="xs" color="dimmed">
            {description}
          </Text>
        </div>
      </Group>
    </div>
  )
);

export function SearchBar() {
  const { classes } = useStyles();
  return (
    <Autocomplete
      classNames={{
        input: classes.searchbar,
        wrapper: classes.wrapper,
        label: classes.label,
        root: classes.root,
      }}
      label="Plan your journey"
      placeholder="Search for accommodations"
      itemComponent={AutoCompleteItem}
      data={data}
      filter={(value, item) =>
        item.value.toLowerCase().includes(value.toLowerCase().trim()) ||
        item.description.toLowerCase().includes(value.toLowerCase().trim())
      }
    />
  );
}
