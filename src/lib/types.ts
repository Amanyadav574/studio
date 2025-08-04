export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  dataAiHint: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string; // Should be hashed in a real app
  role: 'admin' | 'user';
}