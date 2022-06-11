import { PrimaryButton } from '@Buttons/PrimaryButton';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Group } from '@mantine/core';
import { useCreateAccomStyles } from '../CreateAccom.styles';
import { roomFields } from '../CreateAccomListFields';
import { ImageLists, RoomFields } from '../../../../types/createAccom';

export function StepTwo({
  form,
  featuresForm,
  rooms,
  setRooms,
  imagesForm,
  setPreviewImages,
}: Omit<RoomFields, 'classes'> & ImageLists) {
  const { classes } = useCreateAccomStyles();

  return (
    <>
      {roomFields({ form, featuresForm, rooms, setRooms, classes, imagesForm, setPreviewImages })}
      <Group position="center">
        <PrimaryButton
          mt="xl"
          variant="subtle"
          rightIcon={<FontAwesomeIcon fontSize={14} icon={faPlus} />}
          onClick={() => {
            // Apply the last room's feature count as the base value for next room
            let totalFeatures = rooms[rooms.length - 1];
            setPreviewImages.append('');
            imagesForm.addListItem('rooms', { roomName: '', image: '' });
            setRooms.append(totalFeatures);
            form.addListItem('rooms', {
              roomName: '',
              price: 0,
              singleBeds: 0,
              doubleBeds: 0,
              bathrooms: 0,
              features: [],
            });
          }}
        >
          Add room
        </PrimaryButton>
      </Group>
    </>
  );
}
