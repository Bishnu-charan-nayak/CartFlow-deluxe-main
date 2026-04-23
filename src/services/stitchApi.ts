import axios from 'axios';
import { Product } from '../data/products';

// Read API keys and URLs from environment variables
const API_BASE_URL = import.meta.env.VITE_STITCH_API_URL || 'https://api.example.com/stitch';
const API_KEY = import.meta.env.VITE_STITCH_API_KEY || '';

/**
 * Axios instance configured for the Stitch API.
 */
const stitchClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
});

/**
 * Fetch the product list from the API.
 * Maps the data to match the UI Product interface.
 */
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await stitchClient.get('/products');
    
    // Example mapping if the API response differs from the UI model:
    // return response.data.map(item => ({ id: item._id, name: item.title, ... }));
    
    return response.data as Product[];
  } catch (error) {
    console.error('Error fetching products from Stitch API:', error);
    // Remember: You can handle loading/error states in your React components (e.g., using useState or React Query).
    throw error;
  }
};

export default stitchClient;
