import {
  ContactInfoSchema,
  contactInfoSchema,
  FeaturesSchemaWrap,
  featuresSchemaWrap,
  ImagesSchema,
  imagesSchema,
  AmenitySchema,
  amenitySchema,
  EntrySchema,
  createEntrySchema,
  FeaturesSchema,
  RoomsObject,
} from '@components/Modal/CreateAccom/CreateAccomValidation';
import { formList, useForm, zodResolver } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import { AccommodationClean } from 'types/accommodationClean';

const useAllForms = ({ data }: { data?: AccommodationClean }) => {
  const contactInfoInit: ContactInfoSchema = data
    ? (data.contactInfo as ContactInfoSchema)
    : { email: '', phone: '', address: '' };

  const featuresInit: FeaturesSchema = [];
  if (data && data.rooms.some((room) => room.features.length > 0)) {
    data.rooms.forEach((item) =>
      item.features.forEach((featureItem) =>
        featuresInit.push({
          feature: featureItem.feature,
          key: randomId(),
          id: featureItem.id,
        })
      )
    );
  } else featuresInit.push({ feature: '', key: randomId() });
  const amenitiesInit: AmenitySchema = data
    ? ({ ...data.amenities } as AmenitySchema)
    : {
        wifi: false,
        airCondition: false,
        elevator: false,
        freeParking: false,
        petsAllowed: false,
        kitchen: false,
        television: false,
        refrigerator: false,
        foodService: false,
      };
  const roomsInit: RoomsObject[] = data
    ? data.rooms.map((room) => ({ key: randomId(), ...room }))
    : [
        {
          price: 0,
          doubleBeds: 0,
          singleBeds: 0,
          bathrooms: 0,
          roomName: '',
          features: [] as FeaturesSchema,
          key: randomId(),
        },
      ];

  const entryInit: EntrySchema = data
    ? {
        id: data.id,
        name: data.name,
        type: data.type,
        location: data.location,
        description: data.description,
        contactInfo: contactInfoInit,
        amenities: amenitiesInit,
        rooms: formList([...roomsInit]),
      }
    : {
        name: '',
        type: '',
        location: '',
        description: '',
        contactInfo: contactInfoInit,
        amenities: amenitiesInit,
        rooms: formList([...roomsInit]),
      };
  const imagesInit: ImagesSchema = data
    ? {
        cover: undefined,
        rooms: formList(
          data.rooms.map((item) => ({
            roomName: item.roomName,
            image: true as any,
            key: randomId(),
          }))
        ),
      }
    : {
        cover: undefined,
        rooms: formList([{ roomName: '', image: undefined as any, key: randomId() }]),
      };
  const contactInfoForm = useForm<ContactInfoSchema>({
    schema: zodResolver(contactInfoSchema),
    initialValues: contactInfoInit,
  });

  const featuresForm = useForm<FeaturesSchemaWrap>({
    schema: zodResolver(featuresSchemaWrap),
    initialValues: {
      features: formList(featuresInit),
    },
  });

  const imagesForm = useForm<ImagesSchema>({
    schema: zodResolver(imagesSchema),
    initialValues: imagesInit,
  });

  const amenitiesForm = useForm<AmenitySchema>({
    schema: zodResolver(amenitySchema),
    initialValues: amenitiesInit,
  });
  const form = useForm<EntrySchema>({
    schema: zodResolver(createEntrySchema),
    initialValues: entryInit,
  });
  return { form, contactInfoForm, imagesForm, featuresForm, amenitiesForm };
};

export default useAllForms;
