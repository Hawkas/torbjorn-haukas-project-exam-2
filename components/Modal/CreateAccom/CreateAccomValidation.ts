import { FormList } from '@mantine/form/lib/form-list/form-list';
import { z } from 'zod';

export const contactInfoSchema = z.object({
  email: z.string().email({ message: 'Must be a valid email address' }),
  address: z.string().min(1, { message: 'Must include an address' }),
  phone: z
    .string()
    .trim()
    .min(7, { message: 'Must be a valid phone number' })
    .max(15, { message: 'This 👏 is 👏 too 👏 long' })
    .refine((val) => !Number.isNaN(Number(val)), { message: 'Must be a number' }),
});
export const featuresSchema = z.array(
  z.object({
    id: z.number().optional(),
    feature: z.string().min(1, { message: "You can't create an empty feature" }),
  })
);
export const roomsObject = z.object({
  id: z.number().optional(),
  price: z.number().gt(100, { message: 'Nice joke' }),
  doubleBeds: z.number(),
  singleBeds: z.number(),
  bathRooms: z.number().min(1, { message: 'Buckets count as toilets too, just add one' }),
  roomName: z.string().min(3, { message: 'Must include room name with at least 3 letters' }),
  features: featuresSchema.optional(),
});
export const roomsSchema = z.array(roomsObject);
export const imagesSchema = z.object({
  // id will only be included when updating
  id: z.number().optional(),
  cover: z.any().refine((val) => val instanceof File, { message: 'Must include cover image' }),
  rooms: z
    .array(
      z.object({
        id: z.number().optional(),
        roomName: z.string().min(1, { message: 'Must include room name' }),
        image: z.any().refine((val) => val instanceof File, { message: 'Must include room image' }),
      })
    )
    .nonempty({ message: 'Must include at least one room' }),
});
export const amenitySchemaRaw = z.object({
  wifi: z.boolean(),
  airCondition: z.boolean(),
  elevator: z.boolean(),
  freeParking: z.boolean(),
  petsAllowed: z.boolean(),
  kitchen: z.boolean(),
  television: z.boolean(),
  refrigerator: z.boolean(),
  foodService: z.boolean(),
  id: z.any().optional(),
});
export const amenitySchema = amenitySchemaRaw.refine(
  (object) => {
    const { id, ...amenities } = object;
    let hasAtleastOne = false;
    Object.entries(amenities).forEach(([_key, value]) => {
      if (value) {
        hasAtleastOne = value;
      }
    });
    return hasAtleastOne;
  },
  { message: 'You need at least one amenity' }
);
export const createEntrySchema = z.object({
  // id will only be included when updating
  id: z.number().optional(),
  name: z.string().trim().min(1, { message: "Enter the accommodation's name" }),
  type: z.string().trim().min(1, { message: 'You must select a type' }),
  location: z.string().trim().min(1, { message: 'You must select a location' }),
  description: z
    .string()
    .trim()
    .min(30, { message: 'Must be at least 30 characters' })
    .max(1000, { message: 'Must be less than 1000 characters' }),
  contactInfo: contactInfoSchema,
  images: imagesSchema,
  amenities: amenitySchema,
  rooms: roomsSchema,
});
// Extracting types from schemas
type EntrySchemaPure = z.infer<typeof createEntrySchema>;
type RoomsObjectPure = z.infer<typeof roomsObject>;
export type ImagesSchema = z.infer<typeof imagesSchema>;
export type AmenitySchema = z.infer<typeof amenitySchemaRaw>;

export type ContactInfoSchema = z.infer<typeof contactInfoSchema>;
// Adding Mantine's FormList type for compatibility
export type FeaturesSchema =
  | FormList<{ feature: string; id?: number }>
  | { feature: string; id?: number }[];
export type RoomsObject = RoomsObjectPure & { features: FeaturesSchema };

export type EntrySchema = EntrySchemaPure & { rooms: FormList<RoomsObject> | RoomsObject[] };
