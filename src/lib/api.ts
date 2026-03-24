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
  image?: { id: number; url: string } | string | null;
  products_count?: number;
}

export interface Product {
  id: string | number;
  name: string;
  price: number;
  discounted_price?: number;
  stock?: number;
  featured_image?: { id: number; url: string } | null;
  image?: string;
  category: any;
  isNew?: boolean;
  isBestseller?: boolean;
  slug?: string;
}

export interface DetailedProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  discounted_price: number | null;
  stock: number;
  is_active: boolean;
  is_featured: boolean;
  category: {
    id: number;
    name: string;
    slug: string;
    description?: string;
  };
  featured_image: {
    id: number;
    url: string;
  };
  gallery: Array<{
    id: number;
    url: string;
  }>;
}

export interface CheckoutPayload {
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: Array<{
    product_id: number;
    quantity: number;
  }>;
  shipping_method?: string;
  shipping_cost?: number;
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
  is_active?: boolean;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image: {
    id: number;
    url: string;
  };
  is_published?: boolean;
  published_at?: string;
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get('/categories');
  return response.data?.data || response.data;
};

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products');
  return response.data?.data || response.data;
};

export const getProduct = async (identifier: string): Promise<DetailedProduct> => {
  const response = await api.get(`/products/${identifier}`);
  return response.data?.data || response.data;
};

export const submitCheckout = async (payload: CheckoutPayload): Promise<any> => {
  const response = await api.post('/checkout', payload);
  return response.data;
};

export const getFaqs = async (): Promise<Faq[]> => {
  const res = await api.get('/faqs');
  return res.data?.data || res.data;
};

export const getPosts = async (): Promise<Post[]> => {
  const res = await api.get('/posts');
  return res.data?.data || res.data;
};

export const getPostBySlug = async (slug: string): Promise<Post> => {
  const res = await api.get('/posts/' + slug);
  return res.data?.data || res.data;
};

export default api;
