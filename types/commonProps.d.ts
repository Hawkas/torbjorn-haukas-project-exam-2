export interface AdminProps {
  data: AccommodationClean[] | null;
  bookings: Bookings | null;
}

export interface DataProps {
  data: AccommodationClean[] | null;
}

export interface EditAccom {
  data?: AccommodationClean;
}
