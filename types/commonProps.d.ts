import type { AccommodationClean } from './accommodationClean';
import type { BookingCleaned } from './bookings';

export interface AdminProps {
  bookings: BookingCleaned[] | [];
  data: AccommodationClean[] | null;
  messageData: Message[] | [];
}

export interface DataProps {
  data: AccommodationClean[] | null;
}

export interface EditAccom {
  data?: AccommodationClean;
}
