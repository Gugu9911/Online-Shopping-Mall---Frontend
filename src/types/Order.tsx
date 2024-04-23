import { Product } from "./Product";
import { User } from "./User";

export type OrderItem = {
    id: string;
    product: Product;
    quantity: number;
  }

export type Order = {
    id: string;
    user: User;
    items: OrderItem[];
    createdAt: string;
  }

export type OrderState = {
    orders: Order[] | null;
    loading: boolean;
    error: string | null;
  }

export type OrderItemState = {
    items: OrderItem[];
    loading: boolean;
    error: string | null;
  }