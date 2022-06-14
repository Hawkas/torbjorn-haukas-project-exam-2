import type { BookingAttrOutgoing } from './bookings';

export interface Accommodations {
  data: AccommodationObject[];
  meta: Meta;
}

export interface AccommodationObject {
  id: number;
  attributes: AccommodationAttributes;
}

export interface AccommodationAttributes {
  name: string;
  slug: string;
  type: string;
  description: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  amenities: Amenities;
  images: Images;
  bookings?: Bookings | null;
  rooms: AttributesRoom[];
  contactInfo: ContactInfo;
  cover: Cover;
  imagesRooms: { data: DAT[] };
}

export interface Amenities {
  [key: string]: boolean | null;
  id: any;
}

export interface Bookings {
  data: BookingsData[];
}

export interface BookingsData {
  id: number;
  attributes: BookingAttrOutgoing;
}

export interface ContactInfo {
  id: number;
  email: string;
  address: string;
  phone: string;
}

export interface Images {
  id: number;
  rooms: ImagesRoom[];
  cover: Cover;
}

export interface Cover {
  data: DAT;
}

export interface DAT {
  id: number;
  attributes: ImageAttributes;
}

export interface ImageAttributes {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: ImageSize;
  hash: string;
  ext: EXT;
  mime: MIME;
  size: number;
  url: string;
  previewURL: null;
  provider: string;
  providerMetadata: ProviderMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export enum EXT {
  JPEG = '.jpeg' | '.jpg',
  PNG = '.png',
}

export interface ImageSize {
  large: ImageFormatAttributes;
  small: ImageFormatAttributes;
  medium: ImageFormatAttributes;
  thumbnail: ImageFormatAttributes;
}

export interface ImageFormatAttributes {
  ext: EXT;
  url: string;
  hash: string;
  mime: MIME;
  name: string;
  path: null;
  size: number;
  width: number;
  height: number;
  providerMetadata: ProviderMetadata;
}

export enum MIME {
  ImageJPEG = 'image/jpeg',
  ImagePNG = 'image/png',
  ImageWEBP = 'image/webp',
}

export interface ProviderMetadata {
  publicID: string;
  resourceType: ResourceType;
}

export enum ResourceType {
  Image = 'image',
}

export interface ImagesRoom {
  id: number;
  roomName: string;
  image: Image;
}

export interface Image {
  data: DAT[];
}

export interface AttributesRoom {
  id: number;
  price: number;
  doubleBeds: number;
  singleBeds: number;
  bathrooms: number;
  roomName: string;
  features: Feature[];
}
export interface Feature {
  id: number;
  feature: string;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
