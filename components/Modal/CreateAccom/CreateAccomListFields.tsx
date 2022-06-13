import { PrimaryButton } from '@Buttons/PrimaryButton';
import { faClose, faTrash } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ActionIcon,
  createStyles,
  Group,
  keyframes,
  NumberInput,
  Paper,
  Text,
  TextInput,
  Transition,
} from '@mantine/core';
import { addNewFeature } from '../../../lib/helpers/createAccomFunctions';
import { ImageLists, RoomFields } from '../../../types/createAccom';

const fadeIn = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});
const useStyles = createStyles((theme, _params, getRef) => ({
  featureWrap: {
    animation: `${fadeIn} 0.5s ease 1 backwards reverse`,
    '&:focus, &:focus-within': {
      animation: 'none',
    },
  },
}));
function generateFeatureFields({
  featuresForm,
  rooms,
  index,
  classes,
  setRooms,
}: Omit<RoomFields, 'form'> & { index: number }) {
  return featuresForm.values.features.map((featureItem, trueFeatureIndex, featureArray) => {
    let featureIndex = trueFeatureIndex;
    // Due to the way Mantine's formList is coded, I have to split this single array on any amount of rooms that may appear
    // This is very silly and confusing and I apologize. I'd definitely do it differently in the future :P

    // If room is not the first item in the array, make sure the featureIndex starts counting from where the last room left off.
    if (index > 0) {
      featureIndex += rooms[index - 1];
    }

    // If the value at this index doesn't exist, the featureIndex is greater than the total feature count from prev room minus one,
    // or if the feature count is 0, return nothing.
    if (!featureArray[featureIndex] || featureIndex > rooms[index] - 1 || rooms[index] === 0) {
      return null;
    }

    return (
      <Group className={classes.featureWrap} key={featureItem.key} mt="xl">
        <TextInput
          sx={{ flex: 1 }}
          label="Room feature"
          classNames={classes}
          placeholder="Enter room feature"
          {...featuresForm.getListInputProps('features', featureIndex, 'feature')}
          value={featuresForm.values.features[featureIndex].feature}
          //@ts-ignore
          onFocus={() => featuresForm.clearFieldError(`features.${featureIndex}.feature`)}
        />
        <ActionIcon
          sx={{ alignSelf: 'center' }}
          color="red"
          variant="hover"
          onClick={() => {
            // When removing a feature, decrement all feature counts higher or equal by 1.
            setRooms.applyWhere(
              (roomItem) => roomItem >= rooms[index],
              (roomItem) => roomItem - 1
            );
            featuresForm.removeListItem('features', featureIndex);
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </ActionIcon>
      </Group>
    );
  });
}

export function roomFields({
  form,
  featuresForm,
  rooms,
  setRooms,
  classes,
  imagesForm,
  setPreviewImages,
}: RoomFields & ImageLists) {
  return form.values.rooms.map((_item, index) => {
    const featureFields = generateFeatureFields({ featuresForm, rooms, index, setRooms, classes });
    const numberInputData: {
      label: string;
      field: 'price' | 'singleBeds' | 'doubleBeds' | 'bathrooms';
    }[] = [
      { label: 'Price (NOK)', field: 'price' },
      { label: 'Single beds', field: 'singleBeds' },
      { label: 'Double beds', field: 'doubleBeds' },
      { label: 'Bathrooms', field: 'bathrooms' },
    ];
    return (
      <Paper mt="xl" shadow="lg" p="sm" sx={{ position: 'relative' }} key={index}>
        <ActionIcon
          disabled={index === 0}
          onClick={() => {
            imagesForm.removeListItem('rooms', index);

            setPreviewImages.remove(index);
            form.removeListItem('rooms', index);

            setRooms.applyWhere(
              (_, roomIndex) => roomIndex > index,
              (roomItem) => roomItem - rooms[index] + rooms[index - 1]
            );
            setRooms.remove(index);
            const maxIndex = rooms[index] - 1;
            const minIndex = rooms[index - 1] || 0;
            if (minIndex + maxIndex < 1) return;
            // If removed room had any features, clean them up.
            const indices = Array.from({ length: maxIndex - minIndex + 1 }, (_, i) => minIndex + i);
            console.log(indices);
            featuresForm.removeListItem('features', indices);
          }}
          sx={{ position: 'absolute', top: 4, right: 4 }}
        >
          <FontAwesomeIcon icon={faClose} />
        </ActionIcon>
        <TextInput
          mt="xl"
          label="Room name"
          classNames={classes}
          placeholder="Enter room name"
          {...form.getListInputProps('rooms', index, 'roomName')}
          error={form.errors.rooms || form.errors[`rooms.${index}.roomName`]}
          onChange={(event) => {
            form.setListItem('rooms', index, {
              ...form.values.rooms[index],
              roomName: event.currentTarget.value,
            });
            imagesForm.setListItem('rooms', index, {
              ...imagesForm.values.rooms[index],
              roomName: event.currentTarget.value,
            });

            // Typescript complains, but this is assignable.
            // Only way to clear this error as the mantine hook doesn't clear errors on list fields.
            //@ts-ignore
            form.clearFieldError(`rooms.${index}.roomName`);
          }}
        />

        <Group grow mt="xl" align="start">
          {numberInputData.map((numberItem, numberIndex) => (
            <NumberInput
              hideControls
              key={numberIndex}
              className={classes.numberInput}
              classNames={classes}
              label={numberItem.label}
              {...form.getListInputProps('rooms', index, numberItem.field)}
              error={
                numberItem.field === 'doubleBeds' || numberItem.field === 'singleBeds'
                  ? form.errors[`rooms.${index}`] ||
                    form.errors[`rooms.${index}.${numberItem.field}`]
                  : form.errors[`rooms.${index}.${numberItem.field}`]
              }
              onChange={(value) => {
                form.setListItem('rooms', index, {
                  ...form.values.rooms[index],
                  [`${numberItem.field}`]: value,
                });
                //@ts-ignore
                form.clearFieldError(`rooms.${index}.${numberItem.field}`);
                //@ts-ignore
                form.clearFieldError(`rooms.${index}`);
              }}
            />
          ))}
        </Group>
        <Paper withBorder mt="xl" p="lg">
          {/* if there is no additional features beyond the total of the last room */}
          {rooms[index] === 0 || rooms[index] - rooms[index - 1] === 0 ? (
            <Text align="center" size="xl" color="dimmed">
              No features yet
            </Text>
          ) : (
            <Text size="md" weight={600}>
              Features
            </Text>
          )}
          {featureFields}
          <Group mt={40} position="right">
            <PrimaryButton
              variant="outline"
              onClick={() => addNewFeature({ rooms, index, setRooms, featuresForm })}
            >
              Add Feature
            </PrimaryButton>
          </Group>
        </Paper>
      </Paper>
    );
  });
}
