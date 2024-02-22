export type User = {
    id: number;
    email: string;
    password: string; 
    name: string;
    role: 'customer' | 'admin'; 
    avatar: string;
  };
  

  
  export type SignupUser = {
    name: string;
    email: string;
    password: string;
    avatar : string;
  };

