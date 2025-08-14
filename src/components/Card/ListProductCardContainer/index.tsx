// Services
import { getProducts } from '@/services';

// Components
import { ListProductCard } from '@/components/Card';

interface Props {
  searchParams?: {
    page: string;
    pageSize: string;
  };
}

export const ListProductCardContainer = async ({ searchParams }: Props) => {
  const { productsData } = await getProducts({ searchParams });
  return <ListProductCard productsData={productsData ?? []} />;
};
