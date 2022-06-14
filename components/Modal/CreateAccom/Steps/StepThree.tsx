import { InputWrapper } from '@mantine/core';
import { useDidUpdate } from '@mantine/hooks';
import { StepThree } from 'types/createAccom';
import { useCreateAccomStyles } from '../CreateAccom.styles';
import { ImageUpload } from '../ImageUpload';
import { generateImageFields } from './ListFields/generateImageFields';

export function StepThree({
  imagesForm,
  previewImages,
  setSelectedFiles,
  form,
  selectedFiles,
  setPreviewImages,
}: StepThree) {
  const { classes } = useCreateAccomStyles();

  useDidUpdate(() => {
    // if no files, clean up any images.
    // In the case of edits, where I replace the files with a truthy boolean, they will always be true until changed.
    if (selectedFiles.every((item) => !item)) {
      return setPreviewImages.apply(() => '');
    }
    // Create objectURLs whenever there's a file. If boolean, keep the boolean value.
    const objectUrls = selectedFiles.map((item) => {
      if (item instanceof File) return URL.createObjectURL(item);
      if (item) return item;
      return undefined;
    });
    objectUrls.forEach((item, index) => {
      // If string, set preview as the string.
      if (typeof item === 'string') {
        setPreviewImages.setItem(index, item);
        return;
      }
      // if boolean, do nothing.
      if (item) return;
      // if nothing, empty string.
      setPreviewImages.setItem(index, '');
    });
    // Free memory when component is unmounted
    return () =>
      objectUrls.forEach((_item, index, array) => {
        if (typeof array[index] === 'string') URL.revokeObjectURL(array[index] as string);
      });
  }, [selectedFiles]);

  return (
    <>
      <InputWrapper
        label="Cover"
        classNames={{ label: classes.imageLabel }}
        mt="xl"
        {...imagesForm.getInputProps('cover')}
      >
        <ImageUpload
          name="cover"
          onDrop={(files: File[]) => {
            setSelectedFiles.setItem(0, files[0]);
            imagesForm.setFieldValue('cover', files[0]);
            imagesForm.clearFieldError('cover');
          }}
          preview={previewImages[0]}
        />
      </InputWrapper>
      {generateImageFields({ form, classes, setSelectedFiles, previewImages, imagesForm })}
    </>
  );
}
