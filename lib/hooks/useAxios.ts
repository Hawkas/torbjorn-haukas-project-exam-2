import { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { removeFluff } from '@helpers/fetchAccommodations';
import { Accommodations } from 'types/accommodationRaw';
import { AccommodationsArray } from 'types/accommodationClean';

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

export const useAxios = (axiosParams: AxiosRequestConfig) => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async (params: AxiosRequestConfig) => {
    try {
      const result = await axios.request(params);
      setResponse(result.data);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(axiosParams);
  }, []);

  return { response, error, loading };
};
