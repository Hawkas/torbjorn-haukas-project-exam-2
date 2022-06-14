import { randomId } from '@mantine/hooks';
import axios from 'axios';
import { AccommodationClean } from 'types/accommodationClean';

import type {
  AddNewFeature,
  HandleSubmit,
  StepOne,
  TurnIntoCard,
  ValidateSecond,
  ValidateThird,
} from 'types/createAccom';

import { slugify } from './stringConversions';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_LIVE_API;

export function addNewFeature({ rooms, index, setRooms, featuresForm }: AddNewFeature) {
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
export function validateFirst({ form, contactInfoForm }: StepOne) {
  let hasErrors = false;
  // This is to retain the state of the form's initial state to validate if nothing is changed.
  if (
    JSON.stringify({ ...form.values.contactInfo }) !== JSON.stringify({ ...contactInfoForm.values })
  ) {
    form.setFieldValue('contactInfo', contactInfoForm.values);
  }
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

export function validateSecond({ rooms, form, featuresForm, initialValues }: ValidateSecond) {
  if (
    form.values.id &&
    JSON.stringify(initialValues.featuresInitial) === JSON.stringify(featuresForm.values) &&
    JSON.stringify(initialValues.formInitial.rooms) === JSON.stringify(form.values.rooms)
  ) {
    return false;
  }
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
    // Ensure there is at least one bed
    validateArray.push(typeof form.validate().errors[`rooms.${index}`] === 'string');

    const currentRoom = form.values.rooms[index];
    // If the starting index is the same as last room's, i.e the room is not supposed to have any features
    // Clean it up in case it does, and return.
    if (roomFeatureCount - lastRoomFeatureCount === 0) {
      currentRoom.features = [];
      form.setListItem('rooms', index, { ...currentRoom });
      return;
    }

    featuresArray = [];
    //* This loop iterates only the features that belong to each room specifically.
    // roomFeatureCount is always greater than the value of the last room's if it gets to here
    // The starting index is where the last one left off.
    // The feature count is the amount of features, i.e array length. The actual index is of course 1 less.
    for (let i = lastRoomFeatureCount; i < roomFeatureCount; i += 1) {
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
  validateArray.push(typeof form.validate().errors.rooms === 'string');
  validateArray.forEach((validationError) => {
    hasErrors = validationError ? true : hasErrors;
  });
  return hasErrors;
}

export function validateThird({ imagesForm, data }: ValidateThird) {
  let hasErrors = false;

  // I skip the validation where it's not needed, i.e on edits where there already is an image
  // But it's not as a file, so it would fail validation.
  if (data) {
    if (
      imagesForm.values.rooms.every(
        (obj) => typeof obj.image === 'boolean' || obj.image instanceof File
      ) &&
      imagesForm.values.cover
    )
      return hasErrors;
    // If it gets to here one of the images fields were, but not correctly. Validate those fields specifically.
    if (typeof imagesForm.values.cover !== 'boolean') imagesForm.validateField('cover');
    imagesForm.values.rooms.forEach((obj, index) => {
      if (typeof obj.image !== 'boolean') imagesForm.validateField(`rooms.${index}.image`);
    });
    hasErrors = true;
    // And return true to prevent going to the next step.
    return hasErrors;
  }

  const validateArray = [imagesForm.validateField('cover').hasError];
  imagesForm.values.rooms.forEach((_item, index) =>
    validateArray.push(imagesForm.validateField(`rooms.${index}.image`).hasError)
  );
  validateArray.forEach((validationError) => {
    hasErrors = validationError ? true : hasErrors;
  });
  return hasErrors;
}

export function turnIntoCardData({ form, imagePreview }: TurnIntoCard) {
  const { rooms, name } = form.values;
  const slug = slugify(name);
  const minPrice = Math.min(...rooms.map((o) => o.price));
  const minBaths = Math.min(...rooms.map((o) => o.bathrooms));
  const maxBaths = Math.max(...rooms.map((o) => o.bathrooms));
  const maxBeds = Math.max(...rooms.map((o) => o.doubleBeds * 2 + o.singleBeds));
  const minBeds = Math.min(...rooms.map((o) => o.doubleBeds * 2 + o.singleBeds));
  return {
    ...(form.values as Omit<AccommodationClean, 'minPrice' | 'beds' | 'baths' | 'slug' | 'images'>),
    baths: minBaths === maxBaths ? `${maxBaths}` : `${minBaths}-${maxBaths}`,
    beds: minBeds === maxBeds ? `${maxBeds}` : `${minBeds}-${maxBeds}`,
    minPrice,
    images: {
      cover: {
        medium: {
          src: imagePreview,
        },
        alt: 'Preview cover image',
      },
    },
    slug,
  };
}

export const handleSubmit = async (
  e: React.FormEvent,
  { forms, setLoading, setSuccess, session, method, data, initialValues }: HandleSubmit
) => {
  e.preventDefault();
  const { fullForm, images } = forms;
  const { formInitial, imagesInitial } = initialValues;
  if (
    JSON.stringify(fullForm.values) === JSON.stringify(formInitial) &&
    JSON.stringify(images.values) === JSON.stringify(imagesInitial)
  ) {
    setSuccess({ accepted: false, rejected: true, errorMessage: "You haven't changed a thing" });
    return;
  }

  setLoading(true);

  const formData = new FormData();
  if (method === 'PUT') {
    formData.append('refId', `${fullForm.values.id}`);
    formData.append('ref', 'api::accommodation.accommodation');
    formData.append('field', 'imagesRooms');
  }
  const files = [];
  const fileExtensions: { cover: string; rooms: string[] } = {
    cover: '',
    rooms: [],
  };
  // If there is an imagefile for the 'cover' field. If not an edit, there always will be.
  if (images.values.cover instanceof File) {
    const [, coverExtension] = images.values.cover.name.split('.');
    fileExtensions.cover = coverExtension;
    files.push({
      name: 'cover',
      file: images.values.cover as File,
      fileName: `${slugify(fullForm.values.name)}-cover.${fileExtensions.cover}`,
    });
    // if this is an edit, append the old image's name (which I have designed to always follow a set pattern)
    // This is so I can delete it using my code extension on Strapi's core controller.
    if (data && method === 'PUT') formData.append('replaceCover', `${slugify(data.name)}-cover`);
  } else if (data && data.name !== fullForm.values.name) {
    formData.append('renameCover', `${slugify(fullForm.values.name)}-cover`);
  }

  const imagesToRename: { from: string; to: string }[] = [];
  const imagesToReplace: string[] = [];
  images.values.rooms.forEach((item, index) => {
    if (item.image instanceof File) {
      fileExtensions.rooms.push(item.image.name.split('.')[1]);
      files.push({
        //Field name for strapi attribute
        name: 'imagesRooms',
        // The image file, duh
        file: item.image as File,
        // The name of the file in storage/cloudinary
        fileName: `${slugify(fullForm.values.rooms[index].roomName)}.${
          fileExtensions.rooms[index]
        }`,
      });
      // If this is an edit, push the name of the old image to the array above, so I can delete it in Strapi.
      if (data && data.rooms.some((oldRooms) => oldRooms.roomName === item.roomName)) {
        imagesToReplace.push(slugify(data.rooms[index].roomName));
      }
    } else {
      fileExtensions.rooms.push('');
      // If this is an edit, and the room at the specified index exists in the old data.
      if (data && data.rooms[index]) {
        const { roomName: oldRoomName } = data.rooms[index];
        const { roomName: newRoomName } = fullForm.values.rooms[index];
        if (oldRoomName !== newRoomName) {
          imagesToRename.push({
            from: slugify(data.rooms[index].roomName),
            to: slugify(fullForm.values.rooms[index].roomName),
          });
        }
      }
    }
  });
  if (imagesToRename.length > 0) formData.append('imagesToRename', JSON.stringify(imagesToRename));
  if (imagesToReplace.length > 0) {
    formData.append('replaceRoomImages', JSON.stringify(imagesToReplace));
  }

  if (files.length > 0) {
    files.forEach((item) => formData.append(`files.${item.name}`, item.file, item.fileName));
  }
  formData.append(
    'data',
    JSON.stringify({ slug: slugify(fullForm.values.name), holidaze: 1, ...fullForm.values })
  );
  try {
    const response = await axios.request({
      method,
      url: method === 'PUT' ? `/accommodations/${fullForm.values.id}` : '/accommodations',
      headers: {
        Authorization: `Bearer ${session!.jwt}`,
      },
      data: formData,
    });
    if (response.data) {
      setSuccess({ accepted: true, rejected: false });
    }
  } catch (error: any) {
    const successObj = { accepted: false, rejected: true, errorMessage: '' };
    if (error.response) {
      const errorMsg = error.response.data;
      successObj.errorMessage = errorMsg.error
        ? `${error.message}: ${errorMsg.error.message}`
        : `${error.message}: ${errorMsg}`;
      setSuccess(successObj);
    } else if (error.request) {
      successObj.errorMessage =
        'The request was made but no response was received. The API is probably gone.';
      setSuccess(successObj);
    } else {
      successObj.errorMessage = error.message;
    }
  } finally {
    setLoading(false);
  }
};
