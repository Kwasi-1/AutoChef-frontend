import React, { useState, useEffect } from 'react';
import UploadSection from '../components/UploadSection';
import Gallery from '../../client/components/Gallery';

const GalleryUpload = () => {
  // State to store the list of images
  const [images, setImages] = useState([]);

  // State to store the selected image file for upload
  const [imageFile, setImageFile] = useState(null);

  // State to store any error messages related to image upload or deletion
  const [error, setError] = useState('');

  // Fetch initial gallery images from the server when the component mounts
  useEffect(() => {
    fetch('/api/gallery-images')
      .then(response => response.json())
      .then(data => setImages(data)) // Set the fetched images in state
      .catch(error => console.error('Error fetching gallery images:', error)); // Log any fetch errors
  }, []); // Empty dependency array ensures this runs once on mount

  // Handle changes in the file input to select an image for upload
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif']; // Allowed image types

    // Check if the selected file is a valid image type
    if (file && validImageTypes.includes(file.type)) {
      setImageFile(file); // Set the valid file in state
      setError(''); // Clear any previous error messages
    } else {
      // Set an error message for invalid file types
      setError('Please select a valid image file (jpeg, png, gif).');
      setImageFile(null); // Clear the file from state
    }
  };

  // Handle the upload of the selected image file
  const handleImageUpload = () => {
    // Check if there's no file selected for upload
    if (!imageFile) {
      setError('No image selected for upload.');
      return;
    }

    // Prepare the form data with the selected image file
    const formData = new FormData();
    formData.append('image', imageFile);

    // Send a POST request to upload the image
    fetch('/api/upload-image', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        // Add the newly uploaded image to the images state
        setImages([...images, data]);
        setImageFile(null); // Reset the image file state
        setError(''); // Clear any error messages
      })
      .catch(error => {
        // Log and display error message if upload fails
        console.error('Error uploading image:', error);
        setError('Error uploading image.');
      });
  };

  // Handle the deletion of an image by ID
  const handleImageDelete = (id) => {
    // Send a DELETE request to the server to remove the image
    fetch(`/api/delete-image/${id}`, { method: 'DELETE' })
      .then(() => {
        // Remove the deleted image from the images state
        setImages(images.filter(image => image.id !== id));
      })
      .catch(error => {
        // Log and display error message if deletion fails
        console.error('Error deleting image:', error);
        setError('Error deleting image.');
      });
  };

  return (
    <div className="flex flex-col">
      {/* Upload section for selecting and uploading new images */}
      <div className="flex-1 bg-white p-4 lg:px-12">
        <UploadSection 
          onFileChange={handleFileChange} // Handle file selection
          onUpload={handleImageUpload} // Handle image upload
          error={error} // Display any error messages
        />
      </div>

      {/* Gallery section displaying uploaded images */}
      <div className="border-t border-[#E8E9ED] pt-4 lg:pt-10">
        <h2 className='text-2xl px-8 pb-4 lg:pb-6 lg:px-16'>Gallery</h2>

        {/* Render the gallery component with the images and delete handler */}
        <Gallery 
          images={images} // List of images to display
          onDelete={handleImageDelete} // Handle image deletion
        />
      </div>
    </div>
  );
};

export default GalleryUpload;
