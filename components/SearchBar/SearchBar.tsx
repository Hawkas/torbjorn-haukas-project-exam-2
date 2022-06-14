import { faLocationDot, faSearch } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Autocomplete,
  Avatar,
  Box,
  Group,
  Loader,
  MantineColor,
  SelectItemProps,
  Text,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { forwardRef, useState } from 'react';
import { DataProps } from 'types/commonProps';
import { useTextStyles } from '../../lib/styles/typography';
import { useSearchStyles } from './SearchBar.styles';

interface ItemProps extends SelectItemProps {
  color: MantineColor;
  location?: string;
  image?: string;
  type?: string;
  slug: string;
}

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ location, value, image, type, slug, ...others }: ItemProps, ref) => {
    // As this list isn't actually rendered as HTML under the input itself,
    // I can't make use of next/link, and I have to push the url with router
    //* This makes the page transition rather slow, but oh well.
    //! Never mind, it's actually way too fast in production, so it flickers.

    if (!value)
      // In case of API failure, or when I inevitably take down the API.
      return (
        <div ref={ref} {...others}>
          <Text weight="600" color="red">
            The API is gone, so there&apos;s nothing
          </Text>
        </div>
      );
    return (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Avatar size="xl" alt={value} src={image} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              gap: '8px',
              alignSelf: 'center',
              minHeight: '100%',
            }}
          >
            <Text weight="600" sx={{ lineHeight: 1.1 }}>
              {value}
            </Text>
            <Box>
              <Text
                size="sm"
                color="dimmed"
                sx={{
                  display: 'flex',
                  gap: '4px',
                  alignContent: 'baseline',
                  alignItems: 'baseline',
                }}
              >
                <FontAwesomeIcon
                  style={{ color: ' #a7acb4', fontSize: '10px', lineHeight: 1 }}
                  icon={faLocationDot}
                />
                {location}
              </Text>
              <Text size="xs" color="#003355">
                {type}
              </Text>
            </Box>
          </Box>
        </Group>
      </div>
    );
  }
);

export function SearchBar({ data, noLabel }: DataProps & { noLabel?: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const autoComplete = data
    ? data.map((item) => ({
        image: item.images.cover.thumbnail!.src,
        value: item.name,
        location: item.location,
        type: item.type,
        slug: item.slug,
      }))
    : [{ value: '' }];
  const { classes, cx } = useSearchStyles({ noLabel });
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
        dropdown: classes.dropdown,
      }}
      disabled={loading}
      icon={loading ? <Loader size={20} /> : <FontAwesomeIcon icon={faSearch} />}
      iconWidth={58}
      size="xl"
      dropdownPosition="bottom"
      nothingFound={
        <div>
          <Text weight="600">No results matching your query</Text>
        </div>
      }
      onItemSubmit={(item) => {
        setLoading(true);
        // I am desperately trying to figure out why this is so fast and flickery in production.
        setTimeout(() => {
          router.push(`/accommodations/${item.slug}`, undefined, { shallow: true });
        }, 400);
      }}
      label={noLabel ? undefined : 'Plan your journey'}
      placeholder="Search for accommodations"
      itemComponent={AutoCompleteItem}
      data={autoComplete}
      filter={(value, item) =>
        item.value.toLowerCase().includes(value.toLowerCase().trim()) ||
        item.location.toLowerCase().includes(value.toLowerCase().trim()) ||
        item.type.toLowerCase().includes(value.toLowerCase().trim())
      }
    />
  );
}
