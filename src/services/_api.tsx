import axios from 'axios';
import { Restaurant } from '../types/menu';

const API_URL = 'https://run.mocky.io/v3/180b4edd-7baa-4e3b-aac2-4746df1ac904';

export const fetchMenuData = async (): Promise<Restaurant> => {
  const response = await axios.get(API_URL);
  return response.data.data[0];
};