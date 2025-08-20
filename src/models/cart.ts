import { ProductModel } from '@/models';

export interface CartModel {
  color: string;
  size: string;
  quantity: number;
  product: ProductModel;
  id?: number;
  documentId: string;
}
