import axios from 'axios';
import { Restaurant } from '../types/menu';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchMenuData = async (): Promise<Restaurant> => {
  const response = await axios.get(API_URL);
  return response.data.data[0];
};