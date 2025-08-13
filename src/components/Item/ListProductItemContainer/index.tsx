// Components
import { ListProductItem } from '@/components';

// Services
import { getProducts } from '@/services';

interface ListProductItemContainerProps {
  searchParams: {
    page?: string;
    pageSize?: string;
    size?: string;
    color?: string;
    brand?: string;
    price?: string;
    search?: string;
  };
}

export const ListProductItemContainer = async ({
  searchParams,
}: ListProductItemContainerProps) => {
  const { productsData, meta } = await getProducts({ searchParams });

  return <ListProductItem items={productsData || []} meta={meta} />;
};
