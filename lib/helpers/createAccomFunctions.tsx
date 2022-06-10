import { RoomFields, DetailsFields, ImagesFields, EntryForm } from '../../types/createAccom';

export function addNewFeature({
  rooms,
  index,
  setRooms,
  featuresForm,
}: Omit<RoomFields, 'form' | 'classes'> & { index: number }) {
  let featuresCountPlusPrev = rooms[index] + 1;

  if (rooms[index] === 0 && index > 0) {
    setRooms.setItem(index, rooms[index - 1]);
    featuresCountPlusPrev = rooms[index - 1] + 1;
  }
  // Increment the current total by 1
  // Increment each item in the array above the current room, but only if the item has more than 0 features
  setRooms.applyWhere(
    (roomItem, roomIndex) => roomItem > rooms[index] && roomIndex > index,
    (roomItem) => roomItem + 1
  );
  // Update the feature count for the current room.
  setRooms.setItem(index, featuresCountPlusPrev);
  if (index === 0) {
    setRooms.applyWhere(
      (roomItem, roomIndex) =>
        roomItem === 0 || (roomIndex > index && roomItem < featuresCountPlusPrev),
      (roomItem) => roomItem - rooms[index] + featuresCountPlusPrev
    );
  }

  // Update the feature count on all subsequent rooms.
  // subsequentRoomNewValue = subsequentRoomOldValue - currentRoomOldValue + currentRoomNewValue
  setRooms.applyWhere(
    (roomItem, roomIndex) => roomIndex > index && roomItem < featuresCountPlusPrev,
    (roomItem) => roomItem - rooms[index] + featuresCountPlusPrev
  );

  // Add the feature input element.
  featuresForm.addListItem('features', { feature: '' });
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
  let lastRoom = 0;
  const validateArray: boolean[] = [];
  let featuresArray = [];
  rooms.forEach((room, index) => {
    validateArray.push(typeof form.validate().errors[`rooms.${index}.price`] === 'string');
    validateArray.push(typeof form.validate().errors[`rooms.${index}.roomName`] === 'string');
    validateArray.push(typeof form.validate().errors[`rooms.${index}.singleBeds`] === 'string');
    validateArray.push(typeof form.validate().errors[`rooms.${index}.doubleBeds`] === 'string');
    validateArray.push(typeof form.validate().errors[`rooms.${index}.bathrooms`] === 'string');

    if (room === lastRoom) return null;
    if ((lastRoom === 0 && index === 0) || (lastRoom === 0 && index > 0)) lastRoom = room;
    const currentRoom = form.values.rooms[index];
    featuresArray = [];
    for (let i = room - lastRoom; i < room; i += 1) {
      // Push and validate any features that are not left blank.
      if (featuresForm.values.features[i] && featuresForm.values.features[i].feature) {
        featuresArray.push(featuresForm.values.features[i]);
        validateArray.push(
          typeof featuresForm.validate().errors[`features.${i}.feature`] === 'string'
        );
      }
    }
    if (featuresArray.length > 0) {
      currentRoom.features = featuresArray;
    } else currentRoom.features = [];
    form.setListItem('rooms', index, { ...currentRoom });
    lastRoom = room;
  });
  validateArray.forEach((validationError) => {
    hasErrors = validationError ? true : hasErrors;
  });
  return hasErrors;
}

export function validateThird({ form, imagesForm }: ImagesFields) {
  let hasErrors = false;
  const validateArray = [imagesForm.validate().hasErrors];
  imagesForm.values.rooms.forEach((_item, index) =>
    validateArray.push(typeof imagesForm.validate().errors[`rooms.${index}.image`] === 'string')
  );
  const roomNamesOnly = imagesForm.values.rooms.map((item) => ({
    roomName: item.roomName,
  }));
  form.setFieldValue('images', { rooms: [...roomNamesOnly] });
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
  const { rooms, name, type, location } = form.values;
  const minPrice = Math.min(...rooms.map((o) => o.price));
  const minBaths = Math.min(...rooms.map((o) => o.bathrooms));
  const maxBaths = Math.max(...rooms.map((o) => o.bathrooms));
  const maxBeds = Math.max(...rooms.map((o) => o.doubleBeds * 2 + o.singleBeds));
  const minBeds = Math.min(...rooms.map((o) => o.doubleBeds * 2 + o.singleBeds));
  return {
    name,
    type,
    location,
    baths: minBaths === maxBaths ? `${maxBaths}` : `${minBaths}-${maxBaths}`,
    beds: minBeds === maxBeds ? `${maxBeds}` : `${minBeds}-${maxBeds}`,
    price: minPrice,
    image: {
      src: imagePreview,
      alt: 'Preview cover image',
    },
  };
}
