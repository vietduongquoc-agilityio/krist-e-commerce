import { NextResponse } from 'next/server';

// Services
import { getProducts } from '@/services';

export async function GET() {
  try {
    const { productsData, error } = await getProducts();

    if (error) {
      return NextResponse.json(
        { message: 'Failed to fetch products', error },
        { status: 500 },
      );
    }

    return NextResponse.json({ data: productsData }, { status: 200 });
  } catch (err: any) {
    console.error('API Error:', err);
    return NextResponse.json(
      { message: 'Internal server error', error: err.message },
      { status: 500 },
    );
  }
}
