export interface Bookings {
  data: BookingObject[] | BookingObject;
  meta: Meta;
}

export interface BookingObject {
  id: number;
  attributes: BookingAttributes;
}

export interface BookingAttributes {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  checkIn: Date;
  checkOut: Date;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  room: string;
  additionalDetails: string;
  accommodation: RelatedAccommodation;
}

export interface RelatedAccommodation {
  data: Data;
}

export interface Data {
  id: number;
  attributes: DataAttributes;
}

export interface DataAttributes {
  name: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  type: string;
  description: string;
  location: string;
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
