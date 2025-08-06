export interface ItemCardProps {
  id: string;
  documentId?: string;
  thumbnailUrl: string;
  title: string;
  price: number;
  colors?: string[];
  onChange?: (color: string) => void;
  isSoldOut?: boolean;
  color?: string;
  sizes: string[];
  quantity: number;
  stock: number;
  selectedSize?: string;
}
