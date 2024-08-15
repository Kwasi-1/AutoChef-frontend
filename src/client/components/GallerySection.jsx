import { Link } from "react-router-dom";
import FeaturedGallery from "./FeaturedGallery";

// Renders a section with a title, description, featured gallery, and a "View More" link
const GallerySection = () => {
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-4 mx-auto px-8">Gallery</h1>
      <p className="mb-8 text-gray-700 mx-auto px-8">
        Explore our latest automotive triumphs - showcasing precision in every service and genuine parts, ensuring your vehicle excels on every journey.
      </p>
      <FeaturedGallery/>
      <div className="text-right mx-auto px-8">
        <Link to="/gallery" className="text-red-600 hover:underline">View More</Link>
      </div>
    </div>
  );
};

export default GallerySection;
