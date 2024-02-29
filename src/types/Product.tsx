import { Category } from "./Category";

//Define type for product data
export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    category: Category;
    creationAt?: string;
    updatedAt?: string;
  };

  //Define initial state for products
export type ProductState = {
    products: Product[];
    singleProduct: Product | null;
    loading: boolean;
    error: string | null;
  };

//Define type for new product
export type NewProduct = {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
};