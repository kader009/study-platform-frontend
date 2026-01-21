import About from '@/shared/About';
import Banner from '@/components/Banner';
import SessionData from '@/components/SessionData';
import Testimonial from '@/components/Testimonial';
import TutorSection from '@/components/TutorSection';
import GallerySection from '@/components/GallerySection';
import BlogSection from '@/components/BlogSection';
import FeaturesSection from '@/components/FeatureSection';
import DynamicTitle from '@/components/DynamicTitle';

export default function Home() {
  return (
    <div>
      <DynamicTitle/>
      <Banner />
      <About />
      <SessionData />
      <TutorSection />
      <GallerySection />
      <BlogSection/>
      <FeaturesSection/>
      <Testimonial />
    </div>
  );
}
