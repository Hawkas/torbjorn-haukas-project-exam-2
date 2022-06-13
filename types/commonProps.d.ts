import type { AccommodationClean } from './accommodationClean';
import type { Accommodations } from './accommodationRaw';
import type { Bookings } from './bookings';

export interface AdminProps {
  rawData: Accommodations | null;
  bookings: Bookings | null;
  data: AccommodationClean[] | null;
}

export interface DataProps {
  data: AccommodationClean[] | null;
}

export interface EditAccom {
  data?: AccommodationClean;
}
