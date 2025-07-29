export interface ProductCardProps {
  id: string;
  documentId: string;
  thumbnailUrl: string;
  title: string;
  brand?: string;
  rating: number;
  slug?: string;
  reviews?: string;
  price: number;
  status?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ItemCardProps {
  id: string;
  documentId: string;
  thumbnailUrl: string;
  title: string;
  price: number;
  colors?: string[];
  onChange?: (color: string) => void;
  isSoldOut?: boolean;
}

export interface ProductModel {
  id: string;
  documentId: string;
  title: string;
  description?: string;
  price: number;
  salePrice?: number;
  thumbnailUrl: string;
  colors: string[];
  sizes: string[];
  rating: number;
  reviewCount: number;
  viewerCount?: number;
  saleEndsIn?: string; // "00:05:59:47"
  onChange?: (color: string) => void;
  createdAt?: string;
  updatedAt?: string;
  stock: number; // available quantity
  maxStock: number;
}
