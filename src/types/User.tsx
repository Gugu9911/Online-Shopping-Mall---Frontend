export type User = {
    id: number;
    firstname: string;
    lastname: string;
    password: string;
    email: string;
    userName: string;
    role: string;
    avatar: string;
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