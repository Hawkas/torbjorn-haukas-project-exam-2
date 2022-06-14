import type { TextInputStylesNames } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form/lib/use-form';
import type { UseListStateHandler } from '@mantine/hooks/lib/use-list-state/use-list-state';
import type { ModalsContextProps } from '@mantine/modals/lib/context';
import type { Session } from 'next-auth';
import type { SetStateAction } from 'react';
import type {
  AmenitySchema,
  ContactInfoSchema,
  EntrySchema,
  FeaturesSchema,
  ImagesSchema,
} from '../components/Modal/CreateAccom/CreateAccomValidation';
import type { AccommodationClean } from './accommodationClean';

type InputExtraClassNames = Partial<Record<TextInputStylesNames, string>> &
  Record<'numberInput' | 'featureWrap' | 'imageLabel', string>;
type EntryForm = UseFormReturnType<EntrySchema>;
type ImagesForm = UseFormReturnType<ImagesSchema>;
type FeaturesForm = UseFormReturnType<FeaturesSchema>;
type SetStateBoolean = Dispatch<SetStateAction<boolean>>;
type SetRoomsList = UseListStateHandler<number>;
type RoomsList = number[];
interface SuccessState {
  accepted: boolean;
  rejected: boolean;
  errorMessage: string;
}
type SetSuccessState = Dispatch<SetStateAction<SuccessState>>;
type Modal = ModalsContextProps;
type InitialValues = {
  formInitial: EntrySchema;
  imagesInitial: ImagesSchema;
  featuresInitial: FeaturesSchema;
};

export interface CreateAccom extends ModalStuff {
  session: Session;
  data?: AccommodationClean;
  refreshPage: () => void;
  modals: Modal;
}
export interface StepOne {
  form: EntryForm;
  amenitiesForm: UseFormReturnType<AmenitySchema>;
  contactInfoForm: UseFormReturnType<ContactInfoSchema>;
}
export interface StepTwo {
  form: EntryForm;
  featuresForm: FeaturesForm;
  rooms: RoomsList;
  setRooms: SetRoomsList;
}
export interface ImageLists {
  setPreviewImages: UseListStateHandler<string>;
  setSelectedFiles: UseListStateHandler<File | boolean | undefined>;
  imagesForm: ImagesForm;
}
export interface StepThree extends ImageLists {
  previewImages: string[];
  selectedFiles: (File | boolean | undefined)[];
  form: EntryForm;
}
export interface ImagesFields extends Omit<StepThree, 'setPreviewImages' | 'selectedFiles'> {
  classes: InputExtraClasses;
}

export interface RoomFields extends StepTwo, ImageLists {
  classes: InputExtraClassNames;
}
export interface FeatureFields extends Omit<StepTwo, 'form'> {
  index: number;
  classes: InputExtraClassNames;
}

export interface ValidateSecond {
  rooms: RoomsList;
  form: EntryForm;
  featuresForm: FeaturesForm;
  initialValues: InitialValues;
}

export interface ValidateThird {
  imagesForm: ImagesForm;
  data?: AccommodationClean;
}

export interface AddNewFeature {
  rooms: RoomsList;
  index: number;
  setRooms: SetRoomsList;
  featuresForm: FeaturesForm;
}
export interface StepCompleted {
  success: SuccessState;
  previewCard?: JSX.Element;
}
export interface StepNavigation {
  nextStep: () => void;
  prevStep: () => void;
  refreshPage: () => void;
  success: SuccessState;
  active: number;
  modals: Modal;
}
export interface TurnIntoCard {
  form: EntryForm;
  imagePreview: string;
}
export interface HandleSubmit {
  forms: { fullForm: EntryForm; images: ImagesForm };
  setLoading: SetStateBoolean;
  setSuccess: SetSuccessState;
  session: Session | null;
  method: 'POST' | 'PUT';
  data?: AccommodationClean;
  initialValues: InitialValues;
}
