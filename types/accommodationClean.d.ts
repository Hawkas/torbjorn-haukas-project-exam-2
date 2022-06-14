import type { Amenities, AttributesRoom, ContactInfo } from './accommodationRaw';

export interface AccommodationsArray {
  data: AccommodationClean[];
}

export interface AccommodationClean {
  id?: number;
  name: string;
  slug: string;
  location: string;
  description: string;
  type: string;
  contactInfo: ContactClean;
  amenities: Amenities;
  minPrice: number;
  baths: string;
  beds: string;
  rooms: AttributesRoom[];
  images: CleanImages;
}
export interface ContactClean {
  [key: string];
  [key: 'address']: string;
  [key: 'email']: string;
  [key: 'phone']: string;
}
export interface CleanImages {
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
  height?: number;
  width?: number;
}

export interface ImagesRoom {
  image: {
    alt: string;
    name: string;
    large: ImageSizes;
    medium: ImageSizes;
  };
}
