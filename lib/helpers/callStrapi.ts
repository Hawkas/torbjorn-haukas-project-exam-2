import axios, { AxiosResponse } from 'axios';

import { AccommodationClean, AccommodationsArray } from 'types/accommodationClean';
import { Accommodations } from 'types/accommodationRaw';

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
const wildcardQuery = qs.stringify(
  {
    populate: '*',
  },
  { encodeValuesOnly: true }
);
//? This function only fetches files using an internal address to my API, which is hosted on the same cloud application as the site.
//* As such, it will never work if run client-side. But it shouldn't rerun unless the page is rebuilt anyway.
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
export const rawAccommodations = async () => {
  const headers = { Authorization: `Bearer ${process.env.API_PUBLIC_TOKEN}` };
  const url = `/accommodations?${productsQuery}`;
  const method = 'GET';
  const params = { method, url, headers };

  try {
    const results: AxiosResponse = await axios.request(params);
    console.log('PERFORMED API CALL CALLSTRAPI!!');
    return results.data;

    // Stringify and push to array.
  } catch (error: any) {
    console.log(error);
    return;
  }
};

// I preserve the raw data above for later use.
export const fetchAccommodations = async () => {
  const rawData = await rawAccommodations();
  if (!rawData) return null;
  return removeFluff(await rawData);
};

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
      images,
      amenities,
      contactInfo,
      rooms,
    } = item.attributes;
    const { attributes: coverImg } = images.cover.data;

    // My cards need these values, so I'll just calculate them all here.
    const minPrice = Math.min(...rooms.map((o) => o.price));
    const minBaths = Math.min(...rooms.map((o) => o.bathrooms));
    const maxBaths = Math.max(...rooms.map((o) => o.bathrooms));
    const maxBeds = Math.max(...rooms.map((o) => o.doubleBeds * 2 + o.singleBeds));
    const minBeds = Math.min(...rooms.map((o) => o.doubleBeds * 2 + o.singleBeds));

    // Since this part is an array with arbitrary length, and everything is nested to Narnia
    // it gets its own little cleanup
    const { rooms: dirtyImgArray } = images;
    const roomsImgArray = dirtyImgArray.map((room) => ({
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
      location,
      type,
      contactInfo,
      amenities,
      minPrice,
      maxGuests: maxBeds,
      baths: `${minBaths}-${maxBaths}`,
      beds: `${minBeds}-${maxBeds}`,
      rooms,
      images: {
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
