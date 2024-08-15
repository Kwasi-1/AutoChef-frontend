import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowUpButton from './ArrowUpButton';
import gallery from '../../client/data/gallery';

const GalleryStatus = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch gallery images and calculate their sizes
    const fetchGalleryImages = async () => {
      try {
        const imagesWithSizes = await Promise.all(
          gallery.map(async (image) => {
            try {
              const response = await fetch(image);

              if (!response.ok) {
                throw new Error(`Network error: ${response.statusText}`);
              }

              const blob = await response.blob();

              // Validate that the fetched data is an image
              if (!blob.type.startsWith('image/')) {
                throw new Error('Invalid image data');
              }

              const size = (blob.size / (1024 * 1024)).toFixed(2); // Size in MB with two decimal places
              return { src: image, size };
            } catch (err) {
              console.error(`Error fetching image ${image}:`, err);
              throw err; // Re-throw the error to handle it in the outer catch block
            }
          })
        );
        setGalleryImages(imagesWithSizes); // Update state with fetched images and their sizes
        setLoading(false); // Set loading to false when done
      } catch (error) {
        setError(error.message || 'Failed to fetch data'); // Set specific error message
        setLoading(false); // Ensure loading is set to false even on error
      }
    };

    fetchGalleryImages(); // Call the function when the component is mounted
  }, []);

  const handleGalleryArrowClick = () => {
    navigate('/admin/gallery'); // Navigate to the gallery admin page on button click
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading message while images are being fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Display specific error message if fetching fails
  }

  // Get the last 4 images from the gallery and reverse them for display
  const recentImages = galleryImages.slice(-4).reverse();

  return (
    <div className="flex-1 bg-white p-4 border border-[#E8E9ED] rounded-lg">
      <div className="flex justify-between items-center mb-1">
        <h2 className="font-semibold text-lg">Gallery</h2>
        <ArrowUpButton onClick={handleGalleryArrowClick} />
      </div>
      <ul>
        {recentImages.map((image, index) => (
          <li key={index} className="flex items-center justify-between py-3 border-b">
            <div className="flex items-center space-x-3">
              <img
                src={image.src}
                alt={`Gallery image ${index + 1}`}
                className="w-10 h-10 bg-gray-50 rounded-md"
              />
              <div>
                <p className="font-semibold">Image {index + 1}</p>
                <p className="text-sm text-gray-500">Size: {image.size} MB</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GalleryStatus;
