import { NextRequest, NextResponse } from 'next/server';

// Constants
import { API_ENDPOINTS } from '@/constants';

// Models
import { ProductModel } from '@/models';

// Services
import { apiClient } from '@/services';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ message: 'Product ID is required' });
  }

  const url = `${API_ENDPOINTS.PRODUCTS}/${id}?populate=*`;

  const { data, error } = await apiClient.get<{ data: ProductModel }>(url);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json(data, {
    status: 200,
  });
}
