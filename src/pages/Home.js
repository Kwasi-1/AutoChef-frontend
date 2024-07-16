import HeroSection from '../components/HeroSection';
import ServicesHomeSection from '../components/ServicesHomeSection';
import WhyChooseUsSection from '../components/WhyChooseUsSection';
import ContactFormSection from '../components/ContactFormSection';
import GallerySection from '../components/GallerySection';
import Contact from '../components/Contact';
import EmailSignUp from '../components/EmailSignUp';
import heroSections from '../data/heroSections';
import ReviewSection from '../components/ReviewSection';


const Home = () => {
  const heroData = heroSections.find(section => section.page === 'home');

  return ( 
    <div className="font-inter">
      <HeroSection 
        backgroundImage={heroData.backgroundImage}
        title={heroData.title}
        description={heroData.description}
      />
      <ServicesHomeSection />
      <WhyChooseUsSection />
      <ContactFormSection />
      <GallerySection />
      <ReviewSection/>
      <Contact/>
      <EmailSignUp/>
    </div>
  );
}
 
export default Home;