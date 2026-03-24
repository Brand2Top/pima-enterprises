import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://pima-api.aleenza.store/api',
  headers: {
    'Accept': 'application/json'
  }
});

export interface Category {
  id: number | string;
  name: string;
  slug: string;
  image?: string;
  products_count?: number;
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get('/categories');
  return response.data?.data || response.data;
};

export default api;
