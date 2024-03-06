export type User = {
    id: number;
    email: string;
    password: string; 
    name: string;
    role: 'customer' | 'admin'; 
    avatar: string;
    creationAt: string;
    updatedAt: string;
  };
  

  export type SignupUser = {
    name: string;
    email: string;
    password: string;
    avatar : string;
  };

  export type UserInitialState = {
    user: User | null;
    users: User[];
    loading: boolean;
    error: string | null;
  };