export type User = {
    id: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    userName: string;
    role: string;
    avatar: string;
  };
  

  export type SignupUser = {
    firstName: string;
    lastName: string;
    userName: string;
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