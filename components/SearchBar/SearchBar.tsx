import { faLocationDot } from '@fortawesome/pro-regular-svg-icons';
import { faSearch } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Autocomplete, Avatar, Group, MantineColor, SelectItemProps, Text } from '@mantine/core';
import { DataProps } from 'pages';
import { forwardRef } from 'react';
import { useTextStyles } from '../../lib/styles/typography';
import { useSearchStyles } from './SearchBar.styles';

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

const datum = charactersList.map((item) => ({ ...item, value: item.label }));

interface ItemProps extends SelectItemProps {
  color: MantineColor;
  location?: string;
  image?: string;
  type?: string;
}

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ location, value, image, type, ...others }: ItemProps, ref) => {
    if (!value)
      return (
        <div ref={ref} {...others}>
          <Text weight="600" color={'red'}>
            The API seems to have disappeared, so there's nothing
          </Text>
        </div>
      );
    return (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Avatar size="xl" alt={value} src={image} />
          <div>
            <Text weight="600">{value}</Text>
            <Text size="sm" color="dimmed">
              <FontAwesomeIcon style={{ marginRight: '8px' }} icon={faLocationDot} />
              {location}
            </Text>
            <Text size="xs" color="#003355">
              {type}
            </Text>
          </div>
        </Group>
      </div>
    );
  }
);

export function SearchBar({ data }: DataProps) {
  const autoComplete = data
    ? data.map((item) => ({
        image: item.images.cover.thumbnail.src,
        value: item.name,
        location: item.location,
        type: item.type,
      }))
    : [{ value: '' }];
  const { classes, cx } = useSearchStyles();
  const {
    classes: { subHeader },
  } = useTextStyles();
  return (
    <Autocomplete
      classNames={{
        input: classes.searchbar,
        wrapper: classes.wrapper,
        label: cx(subHeader, classes.label),
        root: classes.root,
        icon: classes.icon,
      }}
      icon={<FontAwesomeIcon icon={faSearch} />}
      iconWidth={58}
      size="xl"
      label="Plan your journey"
      placeholder="Search for accommodations"
      itemComponent={AutoCompleteItem}
      data={autoComplete}
      filter={(value, item) =>
        item.value.toLowerCase().includes(value.toLowerCase().trim()) ||
        item.location.toLowerCase().includes(value.toLowerCase().trim())
      }
    />
  );
}
