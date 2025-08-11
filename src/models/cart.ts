import { ProductModel } from '@/models/product';

export interface CartModel {
  color: string;
  size?: string;
  quantity: number;
  product: ProductModel;
  id: string;
  documentId: string;
}
