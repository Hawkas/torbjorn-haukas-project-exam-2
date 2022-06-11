import { randomId } from '@mantine/hooks';
import { AccommodationClean } from 'types/accommodationClean';

import type {
  RoomFields,
  DetailsFields,
  ImagesFields,
  EntryForm,
  HandleSubmit,
} from '../../types/createAccom';
import { axiosFetch } from './axiosFetch';
import { slugify } from './stringConversions';

export function addNewFeature({
  rooms,
  index,
  setRooms,
  featuresForm,
}: Omit<RoomFields, 'form' | 'classes'> & { index: number }) {
  // Since any time a room is added, the feature count is set to be where the previous room left off
  // the 'plusPrev' is already in there, so I only increment the current value by 1.
  let featuresCountPlusPrev = rooms[index] + 1;

  // But just in case, if the value is at 0, and the current room is not the first
  // Correct it.
  if (rooms[index] === 0 && index > 0) {
    featuresCountPlusPrev = rooms[index - 1] + 1;
  }
  // Increment each feature count in the rooms following the current room
  // If the following room has 0 features, its current value should be the same as the current room's value before the new feature.
  // nextRoomNewValue = nextRoomOldValue - currentRoomOldValue + currentRoomNewValue
  setRooms.applyWhere(
    (roomItem, roomIndex) => roomItem >= rooms[index] && roomIndex > index,
    (roomItem) => roomItem - rooms[index] + featuresCountPlusPrev
  );

  if (index === 0) {
    setRooms.applyWhere(
      (roomItem, roomIndex) =>
        roomItem === 0 || (roomIndex > index && roomItem < featuresCountPlusPrev),
      (roomItem) => roomItem - rooms[index] + featuresCountPlusPrev
    );
  }
  // // Update the feature count on all subsequent rooms.
  // // subsequentRoomNewValue = subsequentRoomOldValue - currentRoomOldValue + currentRoomNewValue
  // setRooms.applyWhere(
  //   (roomItem, roomIndex) => roomIndex > index && roomItem < featuresCountPlusPrev,
  //   (roomItem) => roomItem - rooms[index] + featuresCountPlusPrev
  // );
  // Update the feature count for the current room.
  setRooms.setItem(index, featuresCountPlusPrev);

  // Add the feature input element.
  featuresForm.addListItem('features', { feature: '', key: randomId() });
}
export function validateFirst({ form, contactInfoForm, amenitiesForm }: DetailsFields) {
  let hasErrors = false;
  form.setFieldValue('amenities', amenitiesForm.values);
  form.setFieldValue('contactInfo', contactInfoForm.values);
  const validateArray = [
    form.validateField('name').hasError,
    form.validateField('type').hasError,
    form.validateField('location').hasError,
    form.validateField('description').hasError,
    form.validateField('amenities').hasError,
    contactInfoForm.validate().hasErrors,
  ];
  validateArray.forEach((validationError) => {
    hasErrors = validationError ? true : hasErrors;
  });
  return hasErrors;
}

export function validateSecond({
  rooms,
  form,
  featuresForm,
}: Omit<RoomFields, 'classes' | 'setRooms'>) {
  let hasErrors = false;
  let lastRoomFeatureCount = 0;
  const validateArray: boolean[] = [];
  let featuresArray = [];
  rooms.forEach((roomFeatureCount, index) => {
    validateArray.push(typeof form.validate().errors[`rooms.${index}.price`] === 'string');
    validateArray.push(typeof form.validate().errors[`rooms.${index}.roomName`] === 'string');
    validateArray.push(typeof form.validate().errors[`rooms.${index}.singleBeds`] === 'string');
    validateArray.push(typeof form.validate().errors[`rooms.${index}.doubleBeds`] === 'string');
    validateArray.push(typeof form.validate().errors[`rooms.${index}.bathrooms`] === 'string');

    const currentRoom = form.values.rooms[index];

    // If the starting index is the same as last room's, i.e the room is not supposed to have any features
    // Clean it up in case it does, and return.
    if (roomFeatureCount === lastRoomFeatureCount) {
      currentRoom.features = [];
      form.setListItem('rooms', index, { ...currentRoom });
    }
    // If it's the very first room, or the previous rooms didn't have any features
    // Make lastRoom and room be the same value, so the index starts at 0
    if ((lastRoomFeatureCount === 0 && index === 0) || (lastRoomFeatureCount === 0 && index > 0))
      lastRoomFeatureCount = roomFeatureCount;
    featuresArray = [];
    //* This loop iterates only the features that belong to each room specifically.
    // roomFeatureCount is always greater than the value of the last room's if it gets to here
    // And the starting index is then found by subtracting the previous rooms feature count.
    // The feature count is the amount of features; think array length. The actual index should be 1 less of course.
    for (let i = roomFeatureCount - lastRoomFeatureCount; i < roomFeatureCount; i += 1) {
      // Push and validate any features that are not left blank.
      if (featuresForm.values.features[i] && featuresForm.values.features[i].feature) {
        featuresArray.push(featuresForm.values.features[i]);
        validateArray.push(
          typeof featuresForm.validate().errors[`features.${i}.feature`] === 'string'
        );
      }
    }
    if (featuresArray.length > 0) currentRoom.features = featuresArray;
    form.setListItem('rooms', index, { ...currentRoom });
    lastRoomFeatureCount = roomFeatureCount;
  });
  validateArray.push(typeof form.validate().errors['rooms'] === 'string');
  validateArray.forEach((validationError) => {
    hasErrors = validationError ? true : hasErrors;
  });
  return hasErrors;
}

export function validateThird({ imagesForm, data }: ImagesFields & { data?: AccommodationClean }) {
  if (data) return false;
  let hasErrors = false;
  const validateArray = [imagesForm.validate().hasErrors];
  imagesForm.values.rooms.forEach((_item, index) =>
    validateArray.push(typeof imagesForm.validate().errors[`rooms.${index}.image`] === 'string')
  );
  console.log(imagesForm.values);
  validateArray.forEach((validationError) => {
    hasErrors = validationError ? true : hasErrors;
  });
  return hasErrors;
}

export function turnIntoCardData({
  form,
  imagePreview,
}: {
  form: EntryForm;
  imagePreview: string;
}) {
  const { rooms, name } = form.values;
  const slug = slugify(name);
  const minPrice = Math.min(...rooms.map((o) => o.price));
  const minBaths = Math.min(...rooms.map((o) => o.bathrooms));
  const maxBaths = Math.max(...rooms.map((o) => o.bathrooms));
  const maxBeds = Math.max(...rooms.map((o) => o.doubleBeds * 2 + o.singleBeds));
  const minBeds = Math.min(...rooms.map((o) => o.doubleBeds * 2 + o.singleBeds));
  return {
    ...(form.values as unknown as AccommodationClean),
    baths: minBaths === maxBaths ? `${maxBaths}` : `${minBaths}-${maxBaths}`,
    beds: minBeds === maxBeds ? `${maxBeds}` : `${minBeds}-${maxBeds}`,
    minPrice,
    id: 134125,
    images: {
      cover: {
        src: imagePreview,
        alt: 'Preview cover image',
      },
    },
    slug,
  };
}

export const handleSubmit = async (
  e: React.FormEvent,
  { forms, setLoading, setSuccess, session, method }: HandleSubmit
) => {
  e.preventDefault();
  setLoading(true);
  const { fullForm, images } = forms;
  const formData = new FormData();
  if (method === 'PUT') {
    formData.append('refId', `${fullForm.values.id}`);
    formData.append('ref', 'api::accommodation.accommodation');
  }
  const files = [];

  if (images.values.cover instanceof File)
    files.push({
      name: 'cover',
      file: images.values.cover as File,
      fileName: `${slugify(fullForm.values.name)}-cover`,
    });
  formData.append('field', 'cover');
  if (images.values.rooms.some((img) => img.image instanceof File))
    images.values.rooms.forEach((item, index) => {
      if (!(item.image instanceof File)) return;
      files.push({
        name: `imagesRooms`,
        file: item.image as File,
        fileName: `${slugify(fullForm.values.rooms[index].roomName)}`,
      });
    });
  formData.append('field', 'imagesRooms');
  files.forEach((item) => formData.append(`files.${item.name}`, item.file, item.fileName));
  formData.append(
    'data',
    JSON.stringify({ slug: slugify(fullForm.values.name), ...fullForm.values })
  );
  const response = await axiosFetch({
    method,
    url: method === 'PUT' ? `/accommodations/${fullForm.values.id}` : '/accommodations',
    headers: {
      Authorization: `Bearer ${session!.jwt}`,
    },
    data: formData,
  });
  if (response.data) {
    setSuccess({ accepted: true, rejected: false });
    setLoading(false);
    console.log(response);
    return;
  }
  console.log(response);
  setSuccess({
    accepted: false,
    rejected: true,
    errorMessage: response.response.data.error.message,
  });
  setLoading(false);
};
