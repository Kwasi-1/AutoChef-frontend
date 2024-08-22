import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "react-modal";

// Admin Components
import AdminDashboard from "./admin/pages/Dashboard";
import AdminBookedServices from "./admin/pages/BookedServices";
import AdminGallery from "./admin/pages/GalleryUpload";
import AdminServices from "./admin/pages/Services";
import AdminSidebar from "./admin/components/Sidebar";

// Client Components
import Home from "./client/pages/Home";
import About from "./client/pages/About";
import ContactPage from "./client/pages/ContactPage";
import GalleryPage from "./client/pages/GalleryPage";
import Header from "./client/components/Header";
import Footer from "./client/components/Footer";
import ServicesPage from "./client/pages/ServicesPage";
import BookingPage from "./client/pages/BookingPage";
import { ServiceProvider } from "./client/context/ServiceContext";
import { UserProvider } from "./client/context/UserContext";
import EmailSignUp from "./client/components/EmailSignUp";
import heroSections from "./client/data/heroSections";
import HeroSection from "./client/components/HeroSection";
import { BookingProvider } from "./client/context/BookingContext";

Modal.setAppElement("#root");

function App() {
  return (
    <UserProvider>
      <ServiceProvider>
        <BookingProvider>
          <Router>
            <Routes>
              <Route path="/admin/*" element={<AdminLayout />} />
              <Route path="/*" element={<ClientLayout />} />
            </Routes>
          </Router>
        </BookingProvider>
      </ServiceProvider>
    </UserProvider>
  );
}

const AdminLayout = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 bg-[#F9FAFC] ml-16 sm:ml-20 lg:ml-72">
        <Routes>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="booked-services" element={<AdminBookedServices />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="/" element={<AdminDashboard />} />
        </Routes>
      </div>
    </div>
  );
};

const ClientLayout = () => {
  return (
    <div className="App">
      <Header />
      {/* {JSON.stringify(process.env)} */}
      <CurrentHeroSection />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="booking" element={<BookingPage />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<ContactPage />} />
      </Routes>
      <ShowFooter />
    </div>
  );
};

const CurrentHeroSection = () => {
  const location = useLocation();
  const heroData = heroSections.find(
    (section) => section.page === location.pathname
  );

  if (!heroData) return null;

  return (
    <HeroSection
      backgroundImage={heroData.backgroundImage}
      title={heroData.title}
      description={heroData.description}
      description2={heroData.description2}
    />
  );
};

const ShowFooter = () => {
  const location = useLocation();
  const hideFooter =
    location.pathname === "/gallery" || location.pathname === "/booking";
  return !hideFooter ? (
    <>
      {" "}
      <Footer />{" "}
    </>
  ) : null;
};

export default App;
