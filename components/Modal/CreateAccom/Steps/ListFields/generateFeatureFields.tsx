import { faTrash } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ActionIcon, Group, TextInput } from '@mantine/core';
import { FeatureFields } from 'types/createAccom';

export function generateFeatureFields({
  featuresForm,
  rooms,
  index,
  classes,
  setRooms,
}: FeatureFields) {
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
