import axios from "axios";
import { BaseProduct, Product } from "../types";

const API_URL = "http://localhost:5175/api";

export const getProducts = async (): Promise<BaseProduct[]> => {
  const response = await axios.get(`${API_URL}/Data/allProducts`);
  return response.data;
};

export const searchProducts = async (
  searchTerm: string
): Promise<BaseProduct[]> => {
  const response = await axios.get(`${API_URL}/Pricing/search-products`, {
    params: { searchTerm },
  });
  return response.data;
};

export const filterProducts = async (filters: any): Promise<BaseProduct[]> => {
  const response = await axios.get(`${API_URL}/Pricing/filter-products`, {
    params: filters,
  });
  return response.data;
};

export const getCategories = async (): Promise<string[]> => {
  const response = await axios.get(`${API_URL}/Data/subcategories`);
  return response.data;
};

export const getSegments = async (): Promise<string[]> => {
  const response = await axios.get(`${API_URL}/Data/segments`);
  return response.data;
};

export const getBrands = async (): Promise<string[]> => {
  const response = await axios.get(`${API_URL}/Data/brands`);
  return response.data;
};

export const getProductsBySKUs = async (skus: string[]): Promise<Product[]> => {
  const response = await axios.post(`${API_URL}/Pricing/fetch-by-skus`, {
    skus,
  });
  return response.data;
};

export const submitPricingProfile = async (profile: any): Promise<any> => {
  const response = await axios.post(`${API_URL}/Pricing/adjust-price`, profile);
  return response.data;
};
