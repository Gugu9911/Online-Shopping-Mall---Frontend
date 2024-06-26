//Define type for category of product data
export type Category = {
    id: string;
    name: string;
  };

  //Define type for category state
export type CategoryState = {
  categories: Category[];
  loading: boolean;
  error: string | null;
};