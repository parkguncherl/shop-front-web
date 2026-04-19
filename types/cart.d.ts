export interface CartItem {
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  size?: string;
  color?: string;
}

export interface CartSummary {
  subtotal: number;
  shippingFee: number;
  total: number;
}
