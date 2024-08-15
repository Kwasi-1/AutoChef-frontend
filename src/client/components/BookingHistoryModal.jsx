import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import StatusBadge from '../../admin/components/StatusBadge';

const BookingHistoryModal = ({ isOpen, onClose }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const data = [
        { service: 'Full Body Spray', date: '20th July, 2024', status: 'Pending' },
        { service: 'Full Body Spray', date: '20th July, 2024', status: 'Requested' },
        { service: 'Full Body Spray', date: '20th July, 2024', status: 'Cancelled' },
        { service: 'Full Body Spray', date: '20th July, 2024', status: 'Completed' },
        { service: 'Full Body Spray', date: '20th July, 2024', status: 'Pending' },
      ];
      setBookings(data);
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Booking History"
      className="relative w-full max-w-lg max-h-[95%] bg-[#F9FAFC] text-black rounded-xl shadow-md p-6 mx-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-5 text-gray-600 text-2xl"
      >
        &times;
      </button>
      <h2 className="text-center text-2xl font-semibold mb-4">Booking History</h2>
      <div className="bg-white w-full border border-[#E8E9ED] rounded-xl p-4">
        <div className="flex justify-between border-b bg-[#F5F6F8] p-3">
          <div>Service</div>
          <div>Date</div>
          <div>Status</div>
        </div>
        <div className="px-4 overflow-y-auto max-h-[500px]">
          {bookings.map((booking, index) => (
            <div key={index} className="border-b ">
              <div className="flex justify-between pt-2 items-center">
                <div className="p-1">{booking.service}</div>
                <div className="p-1">{booking.date}</div>
                <div className="p-1 text-right">
                  <StatusBadge status={booking.status} />
                </div>
              </div>
             
              <button
                className={`bg-[rgba(110,119,134,0.2)] text-[#6E7786] p-[6px] my-3 w-full rounded-lg ${
                  booking.status === 'Pending'
                    ? 'cursor-not-allowed'
                    : 'hover:bg-[#d04343] active:bg-[#DE0000] hover:text-white active:text-white'
                }`}
                disabled={booking.status === 'Pending'}
              >
                {booking.status === 'Requested' ? 'Cancel'  : 'Close' }
                
              </button>
              
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default BookingHistoryModal;
