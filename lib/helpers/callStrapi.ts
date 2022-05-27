import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AccommodationsArray } from 'types/accommodationClean';
import { Accommodations } from 'types/accommodationRaw';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

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

export const fetchAccommodations = async () => {
  const headers = { Authorization: `Bearer ${process.env.API_PUBLIC_TOKEN}` };
  const url = `${process.env.NEXT_PUBLIC_API_URL}/accommodations?${productsQuery}`;
  const method = 'GET';
  const params = { method, url, headers };
  try {
    const results: AxiosResponse = await axios.request(params);

    const { data } = removeFluff(results.data);
    return { data };
  } catch (error: any) {
    // console.log(error);
    return { error: `${error}` };
  }
};

// Since Strapi for whatever reason decides to nest images fifteen layers deep,
// I'd rather just map out these values in a pattern I can actually remember, with only the values I'll be using.

// Boilerplate warning.

function removeFluff(rawData: Accommodations): AccommodationsArray {
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
  return { data: mappedData };
}
