import { AccommodationClean } from 'types/accommodationClean';
import { Accommodations } from 'types/accommodationRaw';
import { axiosFetch } from './axiosFetch';

const qs = require('qs');

const productsQuery = qs.stringify(
  {
    populate: [
      'amenities',
      'cover',
      'imagesRooms',
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

//* EDIT: I ended up changing this, as I couldn't for the life of me figure out how to upload files to nested components.
//******* I changed the data structure from the API drastically, but kept the old structure on the front-end.
//******* The new data structure has images in one single media field and one multiple media field rather than repeatable components.
//******* What this means is that the order of the images in the API is something I have NO control over.
//******* So I had to sort the images by naming the images the same as the room.
// Boilerplate warning.

export function removeFluff(rawData: Accommodations): AccommodationClean[] {
  const mappedData = rawData.data.map((item) => {
    // Unpackage all the stuff that's already easy to reach.
    const {
      name: hotelName,
      location,
      type,
      amenities,
      description,
      contactInfo,
      rooms,
      slug,
      cover: {
        data: {
          attributes: coverImg,
          attributes: { formats: coverImgFormats },
        },
      },
      imagesRooms: { data: imagesRooms },
    } = item.attributes;

    // My cards need these values, so I'll just calculate them all here.
    const minPrice = Math.min(...rooms.map((o) => o.price));
    const minBaths = Math.min(...rooms.map((o) => o.bathrooms));
    const maxBaths = Math.max(...rooms.map((o) => o.bathrooms));
    const maxBeds = Math.max(...rooms.map((o) => o.doubleBeds * 2 + o.singleBeds));
    const minBeds = Math.min(...rooms.map((o) => o.doubleBeds * 2 + o.singleBeds));

    // Sorting the room images array by room name.
    const roomsImgArray = imagesRooms.map((room) => {
      // In case the image uploaded isn't big enough to be formatted into 'large' format (as defined on my cloudinary processor)
      // Fallback to use the same image size in both.
      const { formats } = room.attributes;
      const cardImg = formats.large ? formats.large : room.attributes;
      return {
        image: {
          alt: `${hotelName} - ${room.attributes.name}`,
          name: room.attributes.name,
          large: {
            src: room.attributes.url,
            height: room.attributes.height,
            width: room.attributes.width,
          },
          medium: {
            src: cardImg.url,
            height: cardImg.height,
            width: cardImg.width,
          },
        },
      };
    });
    // Similar to above, fallback in case image sizes aren't as expected
    const coverImgCardSize = coverImgFormats.large ? coverImgFormats.large : coverImg;
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
      baths: minBaths === maxBaths ? `${maxBaths}` : `${minBaths}-${maxBaths}`,
      beds: minBeds === maxBeds ? `${maxBeds}` : `${minBeds}-${maxBeds}`,
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
            src: coverImgCardSize.url,
            height: coverImgCardSize.height,
            width: coverImgCardSize.width,
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
