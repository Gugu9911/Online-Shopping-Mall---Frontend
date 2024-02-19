export type User = {
    id: number;
    email: string;
    password: string; 
    name: string;
    role: 'customer' | 'admin'; 
    avatar: string;
  };
  

  // types.tsx
export type AuthFormProps = {
    onSubmit: (data: { 
        email: string; 
        password: string; 
        name?: string 
    }) => void;
  };
  