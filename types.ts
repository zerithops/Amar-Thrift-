
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
  condition: 'Excellent' | 'Good' | 'Fair';
  size: string;
  createdAt: number;
}

export interface OrderMessage {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  customerPhone: string;
  message: string;
  timestamp: number;
}

export type ViewState = 'shop' | 'admin' | 'messages';
