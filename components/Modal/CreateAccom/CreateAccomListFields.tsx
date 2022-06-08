import { PrimaryButton } from '@Buttons/PrimaryButton';
import { faClose, faTrash } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActionIcon, Group, NumberInput, Paper, Text, TextInput } from '@mantine/core';
import { addNewFeature } from '../../../lib/helpers/createAccomFunctions';
import { RoomFields } from '../../../types/createAccom';

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
    // If room is not the first item in the array, make sure the featureIndex starts counting from where the last room left off.
    if (index > 0) {
      featureIndex += rooms[index - 1];
    }

    // If the value at this index doesn't exist, the index is greater than the total feature count from prev rooms minus one,
    // or the feature count is 0, return nothing.
    if (!featureArray[featureIndex] || featureIndex > rooms[index] - 1 || rooms[index] === 0) {
      return null;
    }

    return (
      <Group key={featureIndex} mt="xl">
        <TextInput
          sx={{ flex: 1 }}
          label="Room feature"
          classNames={classes}
          placeholder="Enter room feature"
          {...featuresForm.getListInputProps('features', featureIndex, 'feature')}
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

export function roomFields({ form, featuresForm, rooms, setRooms, classes }: RoomFields) {
  const fieldsArray = form.values.rooms.map((item, index) => {
    const featureFields = generateFeatureFields({ featuresForm, rooms, index, setRooms, classes });
    const numberInputData: {
      label: string;
      field: 'price' | 'singleBeds' | 'doubleBeds' | 'bathRooms';
    }[] = [
      { label: 'Price (NOK)', field: 'price' },
      { label: 'Single beds', field: 'singleBeds' },
      { label: 'Double beds', field: 'doubleBeds' },
      { label: 'Bathrooms', field: 'bathRooms' },
    ];
    return (
      <Paper mt="xl" shadow="lg" p="sm" sx={{ position: 'relative' }} key={index}>
        <ActionIcon
          onClick={() => form.removeListItem('rooms', index)}
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
          onChange={(event) => {
            form.setListItem('rooms', index, {
              ...form.values.rooms[index],
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
              onChange={(value) => {
                form.setListItem('rooms', index, {
                  ...form.values.rooms[index],
                  [`${numberItem.field}`]: value,
                });
                //@ts-ignore
                form.clearFieldError(`rooms.${index}.${numberItem.field}`);
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
              <Text size="xs" color="dimmed">
                Any features left blank will not be included
              </Text>
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
  return fieldsArray;
}
