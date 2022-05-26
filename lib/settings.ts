import { MantineNumberSize } from '@mantine/core';

interface Settings {
  menuBreak: MantineNumberSize;
  headerHeight: number;
  API_URL: string;
}
export const settings: Settings = {
  menuBreak: 'sm',
  headerHeight: 60,
  API_URL: 'https://strapi-sult.onrender.com/'
};
