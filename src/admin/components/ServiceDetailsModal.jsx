import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect } from 'react';
import Modal from 'react-modal';


const ServiceDetailsModal = ({ service, onClose }) => {
  useEffect(() => {
    if (service) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [service]);

  return (
    <Modal
      isOpen={!!service}
      onRequestClose={onClose}
      contentLabel="Booking Details"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      className="bg-white p-6 pb-10 rounded-lg shadow-lg w-96 border-2 border-gray-500 "
    >
      {service && (
        <div className='relative'>
          <h2 className="text-xl font-bold mb-4">Booking Details</h2>
          <p className='pb-1'><strong>Customer Name:</strong> {service.customerName}</p>
          <p className='pb-1'><strong>Service Name:</strong> {service.serviceName}</p>
          <p className='pb-1'><strong>Date:</strong> {service.date}</p>
          <p className='pb-1'><strong>Status:</strong> {service.status}</p>
          <p className='pb-1'><strong>Contact:</strong> {service.contact}</p>
          <p className='pb-1'><strong>Email:</strong> {service.email}</p>
          <p className='pb-1'><strong>Description:</strong> {service.description}</p>
          <button 
            onClick={onClose}
            className="absolute -top-2 right-0 border border-gray-300 text-gray-300 hover:border-red-500 active:bg-red-500 hover:text-red-500 active:text-white py-2 px-[10px] rounded-lg"
          >
            <Icon icon='iconamoon:close' className='h-5 w-5' />
          </button>
        </div>
      )}
    </Modal>
  );
};

export default ServiceDetailsModal;
