import { apiClient } from "./apiClient";
import { useQuery } from "@tanstack/react-query";
import { STALE_TIME_MS, PRICE_MULTIPLIER } from "@constants/student";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await apiClient.get("/products?limit=12");
  return response.data.map((item: any) => ({
    id: item.id,
    title: item.title,
    price: Math.round(item.price * PRICE_MULTIPLIER),
    description: item.description,
    image: item.image,
  }));
};

export const useProductsQuery = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: STALE_TIME_MS,
  });
};
