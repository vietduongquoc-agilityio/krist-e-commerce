import { BannerMainContent } from './BannerMainContent';
import { BannerAside } from './BannerAside';

export const Banner = () => {
  return (
    <section className="relative w-full pt-20">
      <BannerMainContent />
      <BannerAside />
    </section>
  );
};
