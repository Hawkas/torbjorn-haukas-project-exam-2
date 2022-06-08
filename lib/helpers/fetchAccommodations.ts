import { AccommodationClean } from 'types/accommodationClean';
import { Accommodations } from 'types/accommodationRaw';
import { axiosFetch } from './axiosFetch';

const qs = require('qs');

const productsQuery = qs.stringify(
  {
    populate: [
      'amenities',
      'images',
      'images.cover',
      'images.rooms',
      'images.rooms.image',
      'bookings',
      'rooms',
      'rooms.features',
      'contactInfo',
    ],
  },
  { encodeValuesOnly: true }
);

export const rawAccommodations = async () => {
  const headers = { Authorization: `Bearer ${process.env.API_PUBLIC_TOKEN}` };
  const url = `/accommodations?${productsQuery}`;
  const method = 'GET';
  const params = { method, url, headers };
  const res = await axiosFetch(params);
  return res;
};

// I preserve the raw data above for later use.

// Since I decided to use Strapi's components system to make collection types where,
// for example, the amount of room-types per hotel may vary, the data structure is deeply nested and messy.

// On top of that, images are bundled with a ton of extra information that I have no use of in the front-end.
// I'd rather just map out these values in a pattern I can actually remember, with only the values I'll be using.

// Boilerplate warning.

export function removeFluff(rawData: Accommodations): AccommodationClean[] {
  const mappedData = rawData.data.map((item) => {
    // Unpackage all the stuff that's already easy to reach.
    const {
      name: hotelName,
      location,
      type,
      images: { id: imagesId, ...images },
      amenities,
      description,
      contactInfo,
      rooms,
      slug,
    } = item.attributes;

    const { attributes: coverImg } = images.cover.data;

    // My cards need these values, so I'll just calculate them all here.
    const minPrice = Math.min(...rooms.map((o) => o.price));
    const minBaths = Math.min(...rooms.map((o) => o.bathrooms));
    const maxBaths = Math.max(...rooms.map((o) => o.bathrooms));
    const maxBeds = Math.max(...rooms.map((o) => o.doubleBeds * 2 + o.singleBeds));
    const minBeds = Math.min(...rooms.map((o) => o.doubleBeds * 2 + o.singleBeds));

    // Since this part is an array with arbitrary length, and everything is also nested to Narnia
    // it gets some extra cleanup
    const { rooms: dirtyImgArray } = images;
    const roomsImgArray = dirtyImgArray.map((room) => ({
      // Keep the id to allow changing the images for each room selectively from the dashboard.
      // This is NOT the id for the image data, just the component they are nested in.
      // Omitting this ID in a 'PUT' request will end up recreating the component, only including the changed value.
      id: room.id,
      image: {
        alt: `${hotelName} - ${room.roomName}`,
        large: {
          src: room.image.data[0].attributes.url,
          height: room.image.data[0].attributes.height,
          width: room.image.data[0].attributes.width,
        },
        medium: {
          src: room.image.data[0].attributes.formats.large.url,
          height: room.image.data[0].attributes.formats.large.height,
          width: room.image.data[0].attributes.formats.large.width,
        },
      },
    }));

    // Assemble
    return {
      id: item.id,
      name: hotelName,
      slug,
      location,
      description,
      type,
      contactInfo,
      amenities,
      minPrice,
      maxGuests: maxBeds,
      baths: `${minBaths}-${maxBaths}`,
      beds: `${minBeds}-${maxBeds}`,
      rooms,
      images: {
        id: imagesId,
        cover: {
          alt: hotelName,
          large: {
            src: coverImg.url,
            height: coverImg.height,
            width: coverImg.width,
          },
          medium: {
            src: coverImg.formats.large.url,
            height: coverImg.formats.large.height,
            width: coverImg.formats.large.width,
          },
          thumbnail: {
            src: coverImg.formats.thumbnail.url,
            height: coverImg.formats.thumbnail.height,
            width: coverImg.formats.thumbnail.width,
          },
        },
        rooms: roomsImgArray,
      },
    };
  });
  return mappedData;
}

export const fetchAccommodations = async () => {
  const rawData = await rawAccommodations();
  if (!rawData) return null;
  return removeFluff(rawData);
};
