import Link from 'next/link';
import { Suspense } from 'react';

// Components
import {
  AboutSection,
  ArrivalSection,
  Banner,
  ModelSection,
  Button,
  ListProductCardSkeleton,
  ListProductCardContainer,
} from '@/components';

export default async function LandingPage() {
  return (
    <div>
      {/* Banner */}
      <Banner />

      {/* Arrival Section */}
      <section className="flex flex-col gap-[50px] w-full max-w-[1281px] mx-auto items-center py-36">
        <ArrivalSection />

        {/* Product list */}
        <Suspense fallback={<ListProductCardSkeleton />}>
          <ListProductCardContainer />
        </Suspense>

        {/* View more button */}
        <Link href="/shop">
          <Button variant="solid" className="py-4 w-[220px]">
            View More
          </Button>
        </Link>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Model Section */}
      <ModelSection />
    </div>
  );
}
