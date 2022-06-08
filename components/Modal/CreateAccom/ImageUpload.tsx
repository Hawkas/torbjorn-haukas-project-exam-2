import { PrimaryButton } from '@Buttons/PrimaryButton';
import { FontawesomeObject } from '@fortawesome/fontawesome-svg-core';
import { faClose, faCloudUpload, faImage } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { createStyles, Group, Image, MantineTheme, Text, useMantineTheme } from '@mantine/core';
import { Dropzone, DropzoneProps, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useDidUpdate } from '@mantine/hooks';
import React, { useEffect, useRef, useState } from 'react';

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

function getActiveColor(imageStatus: boolean, status: DropzoneStatus, theme: MantineTheme) {
  return status.rejected
    ? theme.colors[theme.primaryColor][6]
    : !imageStatus
    ? theme.colors.red[6]
    : theme.colorScheme === 'dark'
    ? theme.colors.dark[0]
    : theme.black;
}

function ImageUploadIcon({
  imageStatus,
  status,
  ...props
}: Omit<React.ComponentProps<typeof FontAwesomeIcon>, 'icon'> & {
  imageStatus: boolean;
  status: DropzoneStatus;
}) {
  // Mantine has a bug with React 18 that wont be fixed until 4.3
  // All files will be rejected no matter what, so I'm just gonna piggyback the rejected state to add hover effects.
  if (status.rejected) {
    return <FontAwesomeIcon icon={faCloudUpload} {...props} />;
  }

  if (!imageStatus) {
    return <FontAwesomeIcon icon={faClose} {...props} />;
  }

  return <FontAwesomeIcon icon={faImage} {...props} />;
}

export const dropzoneChildren = (
  imageStatus: boolean,
  status: DropzoneStatus,
  theme: MantineTheme,
  preview?: string
) => (
  <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
    {preview ? (
      <Image
        height="288px"
        width="auto"
        sx={{ maxHeight: '288px', width: 'auto', overflow: 'hidden' }}
        src={preview}
      />
    ) : (
      <>
        <ImageUploadIcon
          imageStatus={imageStatus}
          status={status}
          style={{ color: getActiveColor(imageStatus, status, theme) }}
          size="6x"
        />

        <div>
          {imageStatus ? (
            <>
              <Text size="xl" inline>
                Drag image here or click to select a file
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                Attach a single image file, the file should not exceed 5mb
              </Text>
            </>
          ) : (
            <>
              <Text size="xl" inline>
                That image ain't gonna cut it bozo.
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                File should not exceed 5mb, and must be .jpg/jpeg, .png, .webp or .svg
              </Text>
            </>
          )}
        </div>
      </>
    )}
  </Group>
);

export function ImageUpload({
  onDrop,
  preview,
  name,
}: Pick<DropzoneProps, 'onDrop' | 'name'> & { preview?: string }) {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const openRef = useRef<() => void>();
  const [imageStatus, setImageStatus] = useState(true);
  useDidUpdate(() => {
    setImageStatus(true);
  }, [preview]);
  useEffect(() => {
    setTimeout(() => {
      setImageStatus(true);
    }, 10000);
  }, [imageStatus, setImageStatus]);
  return (
    <div className={classes.wrapper}>
      <Dropzone
        //@ts-ignore
        openRef={openRef}
        onDrop={onDrop}
        onReject={() => setImageStatus(false)}
        multiple={false}
        name={name}
        styles={(theme) => ({
          reject: { backgroundColor: theme.colors.blue[0], borderColor: theme.colors.blue[5] },
        })}
        className={classes.dropzone}
        radius="md"
        accept={IMAGE_MIME_TYPE}
        maxSize={3 * 1024 ** 2}
      >
        {(status) => dropzoneChildren(imageStatus, status, theme, preview)}
      </Dropzone>

      <PrimaryButton
        className={classes.control}
        size="md"
        radius="xl"
        primary
        onClick={() => openRef.current!()}
      >
        Browse files
      </PrimaryButton>
    </div>
  );
}
