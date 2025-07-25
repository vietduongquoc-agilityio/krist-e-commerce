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
