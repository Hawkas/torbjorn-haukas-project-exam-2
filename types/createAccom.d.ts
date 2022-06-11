import { TextInputStylesNames } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form/lib/use-form';
import { UseListStateHandler } from '@mantine/hooks/lib/use-list-state/use-list-state';
import { Session } from 'next-auth';
import {
  AmenitySchema,
  ContactInfoSchema,
  EntrySchema,
  FeaturesSchema,
  ImagesSchema,
} from '../components/Modal/CreateAccom/CreateAccomValidation';

export type EntryFormClassType = Record<
  'root' | 'input' | 'label' | 'numberInput' | 'featureWrap',
  string
>;
export type EntryForm = UseFormReturnType<EntrySchema>;
export type ImagesForm = UseFormReturnType<ImagesSchema>;
export type SetStateBoolean = Dispatch<SetStateAction<boolean>>;
export type SetSuccessState = Dispatch<
  SetStateAction<{
    [key: string]: string | boolean;
  }>
>;
export interface ImageLists {
  setPreviewImages: UseListStateHandler<string>;
  imagesForm: ImagesForm;
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
  imagesForm: UseFormReturnType<ImagesSchema>;
}

export interface HandleSubmit {
  forms: { fullForm: EntryForm; images: ImagesForm };
  setLoading: SetStateBoolean;
  setSuccess: SetSuccessState;
  session: Session | null;
  method: 'POST' | 'PUT';
}
