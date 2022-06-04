import axios, { AxiosRequestConfig } from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
//? This function only fetches files using an internal address to my API, which is hosted on the same local network as the site.
//* But since my fetches will always run server-side UNLESS it's from the admin dashboard with authorization, that's aight.

export const axiosFetch = async (axiosParams: AxiosRequestConfig) => {
  console.log(axiosParams.data);
  try {
    const result = await axios.request(axiosParams);
    return result.data;
  } catch (error: any) {
    console.error(error);
    return error;
  }
};
