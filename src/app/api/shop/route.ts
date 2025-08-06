import { NextRequest, NextResponse } from 'next/server';

// Services
import { apiClient } from '@/services';

// Constants
import { API_ENDPOINTS, PAGE_SIZE } from '@/constants';

// Models
import { ProductModel } from '@/models';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const query = searchParams.get('query') ?? '';
  const page = searchParams.get('page') ?? '1';
  const pageSize = searchParams.get('pageSize');

  const params = new URLSearchParams();
  params.set('pagination[page]', page);
  params.set('pagination[pageSize]', pageSize ?? String(PAGE_SIZE));
  params.set('filters[title][$containsi]', query);

  const url = `${API_ENDPOINTS.PRODUCTS}?${params.toString()}`;

  console.log(url);

  const { data } = await apiClient.get<{
    data: ProductModel[];
    meta: any;
  }>(url, {
    next: { revalidate: 3600 },
  });

  return NextResponse.json({ data: data?.data }, { status: 200 });
}
