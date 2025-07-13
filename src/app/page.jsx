import Banner from "@/components/Banner";
import FeaturedCollege from "@/components/FeaturedCollege";
import GraduationGallery from "@/components/GraduationGallery";
import ResearchSection from "@/components/ResearchSection";
import ReviewSection from "@/components/ReviewSection";
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <FeaturedCollege></FeaturedCollege>
      <GraduationGallery></GraduationGallery>
      <ResearchSection></ResearchSection>
      <ReviewSection></ReviewSection>
      <Footer></Footer>
    </div>
  );
}
