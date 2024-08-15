import React from 'react';
import Gallery from '../components/Gallery';
import FeaturedGallery from '../components/FeaturedGallery';

const GalleryPage = () => {

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl text-gray-800 text-center font-bold mb-8">Our Stunning Gallery</h2>
        <p className="text-lg text-gray-500 text-center">
          Explore our collection of stunning images showcasing our exceptional services and the remarkable transformations we bring to your vehicles. Each picture tells a story of dedication, precision, and unmatched quality.
        </p>
      </div>
      <FeaturedGallery/>
      <div className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl text-center text-gray-700 font-bold mb-6">More from Our Gallery</h2>
      </div>
        <Gallery />
    </div>
  );
}

export default GalleryPage;
