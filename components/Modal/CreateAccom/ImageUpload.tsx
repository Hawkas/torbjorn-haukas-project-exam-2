import { PrimaryButton } from '@Buttons/PrimaryButton';
import { faCloudUpload } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createStyles, Group, MantineTheme, Text, useMantineTheme } from '@mantine/core';
import { Dropzone, DropzoneProps, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import React, { useRef } from 'react';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    marginBottom: 30,
  },

  dropzone: {
    borderWidth: 1,
    paddingBottom: 50,
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
  },

  control: {
    position: 'absolute',
    width: 250,
    left: 'calc(50% - 125px)',
    bottom: -20,
  },
}));

function getActiveColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][6]
    : status.rejected
    ? theme.colors.red[6]
    : theme.colorScheme === 'dark'
    ? theme.colors.dark[0]
    : theme.black;
}

export function ImageUpload({ onDrop }: Omit<DropzoneProps, 'children'>) {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const openRef = useRef<() => void>();

  return (
    <div className={classes.wrapper}>
      <Dropzone
        //@ts-ignore
        openRef={openRef}
        onDrop={onDrop}
        className={classes.dropzone}
        radius="md"
        accept={IMAGE_MIME_TYPE}
        maxSize={3 * 1024 ** 2}
      >
        {(status) => (
          <div style={{ pointerEvents: 'none' }}>
            <Group position="center">
              <FontAwesomeIcon
                size="5x"
                icon={faCloudUpload}
                color={getActiveColor(status, theme)}
              />
            </Group>
            <Text
              align="center"
              weight={700}
              size="lg"
              mt="xl"
              sx={{ color: getActiveColor(status, theme) }}
            >
              {status.accepted
                ? 'Drop files here'
                : status.rejected
                ? 'Image file less than 5mb'
                : 'Upload image'}
            </Text>
            <Text align="center" size="sm" mt="xs" color="dimmed">
              Drag&apos;n&apos;drop files here to upload. files must be less than 5mb in size.
            </Text>
          </div>
        )}
      </Dropzone>

      <PrimaryButton
        className={classes.control}
        size="md"
        radius="xl"
        onClick={() => openRef.current!()}
      >
        Select files
      </PrimaryButton>
    </div>
  );
}
