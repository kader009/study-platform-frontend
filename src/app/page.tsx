import About from "@/components/About";
import Banner from "@/components/Banner";
import SessionData from "@/components/SessionData";
import Testimonial from "@/components/Testimonial";
import TutorSection from "@/components/TutorSection";

export default function Home() {
  return <div >
    <Banner/>
    <About/>
    <SessionData/>
    <TutorSection/>
    <Testimonial/>
  </div>;
}
