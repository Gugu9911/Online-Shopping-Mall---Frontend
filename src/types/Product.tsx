import { Category } from "./Category";

//Define type for product data
export type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    category: Category;
    image: string;
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
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export type UpdatedProduct = {
  name?: string;
  price?: number;
  description?: string;
  category?: string;
  image?: string;
};

export type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};