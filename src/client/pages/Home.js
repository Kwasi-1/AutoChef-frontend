import ServicesHomeSection from '../components/ServicesHomeSection';
import WhyChooseUsSection from '../components/WhyChooseUsSection';
import ContactFormSection from '../components/ContactFormSection';
import GallerySection from '../components/GallerySection';
import Contact from '../components/Contact';
import ReviewSection from '../components/ReviewSection';


const Home = () => {

  return ( 
    <div className="font-inter">
      <ServicesHomeSection />
      <WhyChooseUsSection />
      {/* <ContactFormSection /> */}
      <GallerySection />
      <ReviewSection/>
      <Contact/>
    </div>
  );
}
 
export default Home;