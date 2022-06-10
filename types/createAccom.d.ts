import { TextInputStylesNames } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form/lib/use-form';
import { UseListStateHandler } from '@mantine/hooks/lib/use-list-state/use-list-state';
import {
  AmenitySchema,
  ContactInfoSchema,
  EntrySchema,
  FeaturesSchema,
  ImagesSchema,
} from '../components/Modal/CreateAccom/CreateAccomValidation';

export type EntryFormClassType = Record<'root' | 'input' | 'label' | 'numberInput', string>;
export type EntryForm = UseFormReturnType<EntrySchema>;
export interface ImageLists {
  setPreviewImages: UseListStateHandler<string>;
  imagesForm: UseFormReturnType<ImagesSchema>;
}
export interface RoomFields {
  form: EntryForm;
  featuresForm: UseFormReturnType<{ features: FeaturesSchema }>;
  rooms: number[];
  setRooms: UseListStateHandler<number>;
  classes: Partial<Record<TextInputStylesNames, string>> & EntryFormClassType;
}

export interface DetailsFields {
  form: EntryForm;
  amenitiesForm: UseFormReturnType<AmenitySchema>;
  contactInfoForm: UseFormReturnType<ContactInfoSchema>;
}

export interface ImagesFields {
  form: EntryForm;
  imagesForm: UseFormReturnType<ImagesSchema>;
}
