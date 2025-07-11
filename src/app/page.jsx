import Banner from "@/components/Banner";
import GraduationGallery from "@/components/GraduationGallery";
import ResearchSection from "@/components/ResearchSection";
import ReviewSection from "@/components/ReviewSection";
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
    <div>
      <Banner></Banner>

      <GraduationGallery></GraduationGallery>
      <ResearchSection></ResearchSection>
      <ReviewSection></ReviewSection>
      <Footer></Footer>
    </div>
  );
}
