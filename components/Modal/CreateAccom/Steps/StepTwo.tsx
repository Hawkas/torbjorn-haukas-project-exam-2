import { PrimaryButton } from '@Buttons/PrimaryButton';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Group } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import type { ImageLists, StepTwo } from 'types/createAccom';
import { useCreateAccomStyles } from '../CreateAccom.styles';
import { generateRoomFields } from './ListFields/generateRoomFields';

export function StepTwo(props: StepTwo & ImageLists) {
  const { classes } = useCreateAccomStyles();
  const { form, rooms, setRooms, imagesForm, setPreviewImages, setSelectedFiles } = props;
  return (
    <>
      {generateRoomFields({ classes, ...props })}
      <Group position="center">
        <PrimaryButton
          mt="xl"
          variant="subtle"
          rightIcon={<FontAwesomeIcon fontSize={14} icon={faPlus} />}
          onClick={() => {
            // Apply the last room's feature count as the base value for next room
            const totalFeatures = rooms[rooms.length - 1];
            setPreviewImages.append('');
            setSelectedFiles.append(undefined);
            imagesForm.addListItem('rooms', { roomName: '', image: undefined, key: randomId() });
            setRooms.append(totalFeatures);
            form.addListItem('rooms', {
              roomName: '',
              price: 0,
              singleBeds: 0,
              doubleBeds: 0,
              bathrooms: 0,
              features: [],
              key: randomId(),
            });
          }}
        >
          Add room
        </PrimaryButton>
      </Group>
    </>
  );
}
