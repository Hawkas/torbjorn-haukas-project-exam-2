import { RoomFields, DetailsFields } from '../../types/createAccom';

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
  let index = 0;
  const validateArray: boolean[] = [];
  let featuresArray = [];
  rooms.forEach((room) => {
    validateArray.push(typeof form.validate().errors[`rooms.${index}.price`] === 'string');
    validateArray.push(typeof form.validate().errors[`rooms.${index}.roomName`] === 'string');
    if (room === lastRoom) return null;
    if ((lastRoom === 0 && index === 0) || (lastRoom === 0 && index > 0)) lastRoom = room;
    const currentRoom = form.values.rooms[index];
    featuresArray = [];
    for (let i = room - lastRoom; i < room; i += 1) {
      if (featuresForm.values.features[i] || featuresForm.values.features[i].feature !== '') {
        featuresArray.push(featuresForm.values.features[i]);
      }
    }
    currentRoom.features = featuresArray;
    form.setListItem('rooms', index, { ...currentRoom });
    lastRoom = room;
    index += 1;
  });
  validateArray.forEach((validationError) => {
    hasErrors = validationError ? true : hasErrors;
  });
  console.log(typeof form.validate().errors['rooms.0.price'] === 'string');
  return hasErrors;
}
