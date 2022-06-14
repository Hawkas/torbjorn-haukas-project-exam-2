export interface Bookings {
  data: BookingObject[];
  meta: Meta;
}

export interface BookingObject {
  id: number;
  attributes: BookingAttrIngoing;
}
export interface BookingObjectIngoing {
  id: number;
  attributes: BookingAttrIngoing;
}

export interface BookingCleaned {
  name: string;
  email: string;
  phoneNumber: string;
  checkIn: string;
  checkOut: string;
  accommodation: string;
  room: string;
  additionalDetails?: string;
  id: string;
}

export interface BookingAttrOutgoing {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  checkIn?: Date;
  checkOut?: Date;
  room: string;
  additionalDetails?: string;
  accommodation: number | string;
}
export interface BookingAttrIngoing {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  checkIn: string;
  checkOut: string;
  createdAt?: Date;
  updatedAt?: Date;
  publishedAt?: Date;
  room: string;
  additionalDetails?: string;
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
