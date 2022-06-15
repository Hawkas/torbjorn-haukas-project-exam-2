import { PrimaryButton } from '@Buttons/PrimaryButton';
import { faClose } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addNewFeature } from '@helpers/createAccomFunctions';
import { ActionIcon, Group, NumberInput, Paper, Text, TextInput } from '@mantine/core';
import type { RoomFields } from 'types/createAccom';
import { generateFeatureFields } from './generateFeatureFields';

export function generateRoomFields({
  form,
  featuresForm,
  rooms,
  setRooms,
  classes,
  imagesForm,
  setPreviewImages,
  setSelectedFiles,
}: RoomFields) {
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

            setPreviewImages.remove(index + 1);
            setSelectedFiles.remove(index + 1);
            form.removeListItem('rooms', index);

            // Update feature counts for all rooms following the removed entity
            // OldValue - RemovedRoomsValue + RoomBeforeRemovedRoomsValue
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
