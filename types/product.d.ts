export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  hoverImageUrl?: string;
  images: { url: string; alt?: string }[];
  category: string;
  description?: string;
  badge?: 'new' | 'sale' | 'best';
  soldOut: boolean;
  sizes: ProductSize[];
  colors: ProductColor[];
  reviewCount: number;
  avgRating: number;
  createdAt: string;
}

export interface ProductSize {
  value: string;
  label: string;
  soldOut: boolean;
}

export interface ProductColor {
  value: string;
  label: string;
  hex: string;
  soldOut: boolean;
}

export interface ProductListParams {
  category?: string;
  sort?: string;
  q?: string;
  page?: number;
  size?: number;
  minPrice?: number;
  maxPrice?: number;
}

export interface ProductListResponse {
  content: Product[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}
