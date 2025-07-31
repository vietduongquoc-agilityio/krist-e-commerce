export interface ProductModel {
  id: string;
  documentId: string;
  title: string;
  description?: string;
  price: number;
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
}
