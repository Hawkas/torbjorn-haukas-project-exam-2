export interface AccommodationsArray {
  data: AccommodationClean[];
}

export interface AccommodationClean {
  id: number;
  name: string;
  location: string;
  type: string;
  contactInfo: ContactInfo;
  amenities: Amenities;
  minPrice: number;
  maxGuests: number;
  baths: string;
  beds: string;
  rooms: AccommodationsCleanRoom[];
  images: Images;
}

export interface Amenities {
  id: number;
  wifi: boolean;
  airCondition: boolean;
  elevator: boolean;
  freeParking: boolean;
  petsAllowed: boolean;
  kitchen: boolean;
  television: boolean;
  refrigerator: boolean;
}

export interface ContactInfo {
  id: number;
  email: string;
  address: string;
  phone: string;
}

export interface Images {
  cover: Cover;
  rooms: ImagesRoom[];
}

export interface Cover {
  alt: string;
  large: ImageSizes;
  medium: ImageSizes;
  thumbnail: ImageSizes;
}

export interface ImageSizes {
  src: string;
  height: number;
  width: number;
}

export interface ImagesRoom {
  id: number;
  image: Omit<Cover, 'thumbnail'>;
}

export interface AccommodationsCleanRoom {
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
