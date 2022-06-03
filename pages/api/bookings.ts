import { NextApiRequest, NextApiResponse } from 'next';
import type { BookingAttributes } from 'types/bookings';
import { getSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

//! Taken from https://dev.to/ecyrbe/comment/1ei8n and adjusted slightly

//? This hook should only be used to do direct API calls, specifically for POST/PUT/DELETE calls to the external API post build.
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

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const axiosFetch = async ({ ...data }: BookingAttributes) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.API_ADMIN_TOKEN}`,
  };
  const url = process.env.NEXT_PUBLIC_API_URL + `/bookings`;
  try {
    const result = await axios.post(url, {
      data,
      headers,
    });
    return result.data;
  } catch (error: any) {
    return false;
  }
};

export default async function messageHandler(
  req: NextApiRequest,
  res: NextApiResponse<BookingAttributes>
) {
  const { method } = req;
  switch (method) {
    case 'POST':
      const {
        booking: { ...newBooking },
      } = req.body;
      const response = await axiosFetch({ ...newBooking });
      console.log(response);
      if (!response) res.status(400).end('uhh idk');
      if (response) res.status(201).json(newBooking);
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
