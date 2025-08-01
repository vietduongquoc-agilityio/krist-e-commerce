import Link from 'next/link';
import Image from 'next/image';

// Images
import notFound from '@/public/images/not-found.webp';

export const NotFound = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-white">
      <Image
        src={notFound}
        alt="Not found image page"
        className="mb-7 w-[500px]"
        sizes="(100vw - 20px) 100vw, 500px"
      />
      <h1 className="text-4xl font-bold text-charcoal mb-4">
        Oops! Page not found
      </h1>
      <p className="text-lg mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="text-lg font-lg text-white py-3 px-8 bg-primary rounded-10 hover:bg-gray hover:text-black transition"
      >
        Go back home
      </Link>
    </section>
  );
};
