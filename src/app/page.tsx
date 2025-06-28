import About from '@/components/About';
import Banner from '@/components/Banner';
import SessionData from '@/components/SessionData';
import Testimonial from '@/components/Testimonial';
import TutorSection from '@/components/TutorSection';
import GallerySection from '@/components/GallerySection';
import BlogSection from '@/components/BlogSection';
import FeaturesSection from '@/components/FeatureSection';

export default function Home() {
  return (
    <div>
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
