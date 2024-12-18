export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface RequestItem {
  productName: string;
  description: string;
  email: string;
  timestamp: Date;
}