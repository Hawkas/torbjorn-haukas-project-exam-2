import { AccommodationClean, ImagesRoom } from 'types/accommodationClean';
import { Accommodations } from 'types/accommodationRaw';
import { BookingCleaned, Bookings } from 'types/bookings';
import { MessageClean, MessageInc } from 'types/messages';
import { axiosFetch } from './axiosFetch';
import { getFormattedDate, slugify } from './stringConversions';

const qs = require('qs');

export const productsQuery = qs.stringify(
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
export const everythingQuery = qs.stringify(
  {
    populate: [
      'messages',
      'bookings',
      'bookings.accommodation',
      'accommodations',
      'accommodations.cover',
      'accommodations.imagesRooms',
      'accommodations.amenities',
      'accommodations.contactInfo',
      'accommodations.rooms',
      'accommodations.rooms.features',
    ],
  },
  { encodeValuesOnly: true }
);

export const rawAccommodations = async () => {
  const headers = { Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}` };
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

export function removeFluff(rawData: Accommodations): AccommodationClean[] | null {
  if (!rawData.data || !(rawData.data.length > 0)) return null;
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
    const roomsImgArray: ImagesRoom[] = [];
    // Normalizing the room images to values I will use.
    rooms.forEach((roomItem, index) => {
      // Sort the list to the correct order (i.e based on the rooms list)
      // If for whatever reason it can't find any match, (which should never happen but just in case) fallback to same index.
      const roomImg =
        imagesRooms.find(
          // image-name (sans '.jpeg') === room-name slugified
          (value) => value.attributes.name.split('.')[0] === slugify(roomItem.roomName)
        ) || imagesRooms[index];
      // In case the image uploaded isn't big enough to be formatted into 'large' format (as defined on my cloudinary processor)
      // Fallback to use the same image size in both.
      const { formats } = roomImg.attributes;
      const cardImg = formats.large ? formats.large : roomImg.attributes;
      roomsImgArray.push({
        image: {
          alt: `${hotelName} - ${roomImg.attributes.name}`,
          name: roomImg.attributes.name,
          large: {
            src: roomImg.attributes.url,
            height: roomImg.attributes.height,
            width: roomImg.attributes.width,
          },
          medium: {
            src: cardImg.url,
            height: cardImg.height,
            width: cardImg.width,
          },
        },
      });
    });
    // Further sorting the above into the correct order based on room names.
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

export const everythingFetch = async () => {
  try {
    const result = await axiosFetch({
      url: `/holidazes/1?${everythingQuery}`,
      method: 'GET',
      headers: { Authorization: `Bearer ${process.env.API_ADMIN_TOKEN}` },
    });

    const {
      accommodations,
      messages,
      bookings,
    }: { accommodations: Accommodations; messages: MessageInc; bookings: Bookings } =
      result.data.attributes;
    const cleanAccom = removeFluff(accommodations);
    const bookingData: BookingCleaned[] | [] =
      bookings.data && bookings.data.length > 0
        ? bookings.data.map((item) => {
            const {
              id,
              attributes: {
                createdAt,
                updatedAt,
                publishedAt,
                firstName,
                lastName,
                accommodation: { data: relation },
                ...rest
              },
            } = item;
            // Fallback in case database has a hiccup and doesn't create a relation
            const fallBack = { attributes: { name: 'Unknown' } };
            const {
              attributes: { name: accommodation },
            } = relation ?? fallBack;
            const name = `${firstName} ${lastName}`;
            return { id: id.toString(), name, accommodation, ...rest };
          })
        : [];
    const cleanMessages: MessageClean[] | [] =
      messages.data && messages.data.length > 0
        ? messages.data.map((item) => {
            const {
              attributes: { updatedAt, publishedAt, createdAt, ...cleanMessage },
              id,
            } = item;
            return {
              id: id.toString(),
              createdAt: getFormattedDate(new Date(createdAt)),
              ...cleanMessage,
            };
          })
        : [];
    return { cleanAccom, bookingData, cleanMessages };
  } catch (error: any) {
    return { cleanAccom: null, bookingData: [], cleanMessages: [] };
  }
};
