import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import engineImage from '../assets/engine-block.png';

const Contact = () => {
  // State to manage the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle the selection of contact options
  const handleSelectOption = (option) => {
    handleCloseModal();
    if (option === 'email') {
      // Redirect to email client
      window.location.href = 'mailto:autochef83@gmail.com';
    } else if (option === 'phone') {
      // Redirect to phone dialer
      window.location.href = 'tel:+1234567890'; 
    }
  };

  // Disable scrolling on the background when the modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup when component unmounts or modal closes
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  return (
    <div className="relative flex flex-col lg:flex-row justify-between my-24 px-4">
      {/* Contact information section */}
      <div className="lg:absolute top-0 w-full lg:w-3/4 bg-red-600 text-white p-8 md:p-16 z-0 lg:ml-8">
        <div className="lg:mr-4">
          <h2 className="text-3xl md:text-5xl font-semibold mb-8 md:mb-16">Easy To Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:w-7/12">
            {/* Opening hours information */}
            <div className="mb-6">
              <h3 className="text-lg md:text-xl font-semibold mb-2">Opening Hours</h3>
              <p>Monday - Saturday</p>
              <p>7:00 AM - 9:00 PM</p>
              <p className="mt-2">Sunday</p>
              <p>10:00 AM - 6:00 PM</p>
            </div>
            {/* Location and contact information */}
            <div className="mb-6">
              <h3 className="text-lg md:text-xl font-semibold mb-2">Our Location</h3>
              <div className="flex items-center mb-2">
                <div className="bg-white rounded-full p-3 mr-3 min-w-fit">
                  <a href="https://maps.app.goo.gl/Kdr4PQ27nfd6ukvJ7" target='_blank' rel='noopener noreferrer'>
                    <img src={require('../assets/contact-location.png')} alt="Location" className="w-5 h-5" />
                  </a>
                </div>
                <p>Achimota Mile 7</p>
              </div>
              <div className="flex items-center">
                <div className="bg-white rounded-full p-3 mr-3 min-w-fit">
                  <a href="mailto:autochef83@gmail.com">
                    <img src={require('../assets/contact-email.png')} alt="Email" className="w-5 h-5" />
                  </a>
                </div>
                <p>autochef83@gmail.com</p>
              </div>
            </div>
          </div>
          {/* Button to open the contact modal */}
          <button onClick={handleOpenModal} className="bg-white text-red-600 py-2 px-4 w-full lg:w-1/2 font-semibold rounded-lg hover:bg-gray-100 mt-4 md:mt-8">
            Contact
          </button>
        </div>
      </div>
      
      {/* Image of an engine */}
      <div className="relative z-10 mt-8 ml-auto pt-12 lg:mt-0 lg:mr-28 w-5/12 h-3/5 align-bottom hidden lg:block">
        <img 
          src={engineImage} 
          alt="Engine" 
          className="w-full lg:w-[600px] h-[300px] lg:h-[490px] object-cover rounded-lg" 
          loading='lazy'
        />
      </div>
      
      {/* Modal for contact options */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Contact Options"
        className="bg-white p-10 md:p-16 rounded-lg shadow-lg max-w-sm mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-center items-center"
      >
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="mb-5">Please select an option to contact us:</p>
        <button
          onClick={() => handleSelectOption('email')}
          className="text-red-600 border border-red-300 hover:bg-red-600 hover:text-white py-2 px-4 rounded-lg mb-6 w-full"
        >
          Email
        </button>
        <button
          onClick={() => handleSelectOption('phone')}
          className="text-red-600 border border-red-300 hover:bg-red-600 hover:text-white py-2 px-4 rounded-lg mb-6 w-full"
        >
          Phone
        </button>
      </Modal>
    </div>
  );
};

export default Contact;
