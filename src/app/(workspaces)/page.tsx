import {
  AboutSection,
  ArrivalSection,
  Banner,
  ModelSection,
} from '@/components';

export default async function LandingPage() {
  return (
    <div>
      {/* Banner */}
      <Banner />

      {/* Arrival Sections */}
      <ArrivalSection />

      {/* About Section */}
      <AboutSection />

      {/* Model Section */}
      <ModelSection />
    </div>
  );
}
