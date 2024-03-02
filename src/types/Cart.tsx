import { Product } from "./Product";

export type CartItem = Product & {
  quantity: number;
};

export type CartState = {
  itemsByUserId: {
    [userId: string]: CartItem[];
  };
};
