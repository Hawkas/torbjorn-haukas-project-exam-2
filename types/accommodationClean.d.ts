import type { Amenities, AttributesRoom, ContactInfo } from './accommodationRaw';

export interface AccommodationsArray {
  data: AccommodationClean[];
}

export interface AccommodationClean {
  id: number;
  name: string;
  slug: string;
  location: string;
  description: string;
  type: string;
  contactInfo: ContactInfo;
  amenities: Omit<Amenities, 'id'>;
  minPrice: number;
  maxGuests: number;
  baths: string;
  beds: string;
  rooms: AttributesRoom[];
  images: CleanImages;
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
  height: number;
  width: number;
}

export interface ImagesRoom {
  id: number;
  image: Omit<Cover, 'thumbnail'>;
}
