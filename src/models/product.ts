export interface ProductModel {
  id: string;
  documentId: string;
  title: string;
  description?: string;
  price: number;
  slug?: string;
  salePrice?: number;
  thumbnailUrl: string;
  colors: string[];
  images: string[];
  sizes: string[];
  rating: number;
  quantity: number;
  reviewCount: number;
  createdAt?: string;
  updatedAt?: string;
  stock: number;
  brand?: string;
  status?: string;
  reviews?: string;
  isSoldOut?: boolean;
}
