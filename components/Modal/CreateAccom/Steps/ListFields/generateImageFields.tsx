import { InputWrapper } from '@mantine/core';
import { ImagesFields } from 'types/createAccom';
import { ImageUpload } from '../../ImageUpload';

export function generateImageFields({
  imagesForm,
  classes,
  setSelectedFiles,
  form,
  previewImages,
}: ImagesFields): JSX.Element[] {
  return imagesForm.values.rooms.map((item, index) => {
    const { error } = imagesForm.getListInputProps('rooms', index, 'image');
    return (
      <InputWrapper
        key={item.key}
        label={imagesForm.values.rooms[index].roomName}
        classNames={{ label: classes.imageLabel }}
        mt="xl"
        {...{ error }}
      >
        <ImageUpload
          name={`rooms-${index}`}
          onDrop={(files: File[]) => {
            setSelectedFiles.setItem(index + 1, files[0]);
            imagesForm.setListItem('rooms', index, {
              roomName: form.values.rooms[index].roomName,
              image: files[0],
              key: item.key,
            });
            //@ts-ignore
            imagesForm.clearFieldError(`rooms.${index}.image`);
          }}
          preview={previewImages[index + 1]}
        />
      </InputWrapper>
    );
  });
}
