import Image from 'next/image';

// constants
import { MODEL_BANNER } from '@/constants';

export const ModelSection = () => {
  return (
    <section className="flex flex-col gap-24 w-full max-w-[1920px] mx-auto items-center py-24">
      <div className="flex flex-col gap-5 max-w-[620px] w-full items-center text-center">
        <h3 className="font-secondary text-charcoal text-[46px]">
          Follow Us On Instagram
        </h3>
        <p className="text-gray">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
          duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices
          sollicitudin
        </p>
      </div>
      <Image
        src={MODEL_BANNER}
        alt="Brand model banner"
        width={1920}
        height={256}
        sizes="(100vw - 20px) 100vw, 1920px"
      />
    </section>
  );
};
