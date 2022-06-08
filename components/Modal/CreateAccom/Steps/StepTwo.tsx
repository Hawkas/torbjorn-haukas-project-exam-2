import { PrimaryButton } from '@Buttons/PrimaryButton';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Group } from '@mantine/core';
import { useCreateAccomStyles } from '../CreateAccom.styles';
import { roomFields } from '../CreateAccomListFields';
import { RoomFields } from '../../../../types/createAccom';

export function StepTwo({ form, featuresForm, rooms, setRooms }: Omit<RoomFields, 'classes'>) {
  const { classes } = useCreateAccomStyles();

  return (
    <>
      {roomFields({ form, featuresForm, rooms, setRooms, classes })}
      <Group position="center">
        <PrimaryButton
          mt="xl"
          variant="subtle"
          rightIcon={<FontAwesomeIcon fontSize={14} icon={faPlus} />}
          onClick={() => {
            let totalFeatures = 0;
            // Apply the last room's feature count as the base value for next room
            setRooms.apply((item) => {
              totalFeatures = item;
              return item;
            });
            setRooms.append(totalFeatures);
            form.addListItem('rooms', {
              roomName: '',
              price: 0,
              singleBeds: 0,
              doubleBeds: 0,
              bathRooms: 0,
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
