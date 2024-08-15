import React, { useEffect, useState } from 'react';
import BookedServicesTable from './BookedServicesTable';
import { useNavigate } from 'react-router-dom';
import ArrowUpButton from './ArrowUpButton';

const ProgressTable = () => {
  const [bookedServices, setBookedServices] = useState([]);
  const [visibleServices, setVisibleServices] = useState([]);
  const [rowsToShow, setRowsToShow] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Placeholder data
    const placeholderData = [
      { id: 1, invoiceNumber: '#20025785644', customerName: 'John Doe', serviceName: 'Oil Change', date: '2024-07-25', status: 'Requested' },
      { id: 2, invoiceNumber: '#20025785645', customerName: 'Jane Smith', serviceName: 'Tire Replacement', date: '2024-07-24', status: 'Pending' },
      { id: 3, invoiceNumber: '#20025785646', customerName: 'Alice Johnson', serviceName: 'Brake Inspection', date: '2024-07-23', status: 'Completed' },
      { id: 4, invoiceNumber: '#20025785647', customerName: 'Bob Brown', serviceName: 'Battery Replacement', date: '2024-07-22', status: 'Cancelled' },
      { id: 5, invoiceNumber: '#20025785648', customerName: 'Charlie Green', serviceName: 'Paint Correction', date: '2024-07-21', status: 'Requested' },
      { id: 6, invoiceNumber: '#20025785649', customerName: 'Daisy Blue', serviceName: 'Transmission Repair', date: '2024-07-20', status: 'Pending' },
      { id: 7, invoiceNumber: '#20025785650', customerName: 'Ella White', serviceName: 'Engine Tune-Up', date: '2024-07-19', status: 'Completed' },
      { id: 8, invoiceNumber: '#20025785651', customerName: 'Frank Black', serviceName: 'Wheel Alignment', date: '2024-07-18', status: 'Cancelled' },
      { id: 9, invoiceNumber: '#20025785652', customerName: 'Grace Pink', serviceName: 'Air Filter Replacement', date: '2024-07-17', status: 'Requested' },
      { id: 10, invoiceNumber: '#20025785653', customerName: 'Henry Red', serviceName: 'Spark Plug Change', date: '2024-07-16', status: 'Pending' },
    ];

    setBookedServices(placeholderData);
  }, []);

  useEffect(() => {
    const calculateRowsToShow = () => {
      const availableHeight = window.innerHeight - 1000; // Adjust based on your layout (header, margins, etc.)
      const rowHeight = 50; // Approximate row height (adjust based on your table's row height)
      const rows = Math.floor(availableHeight / rowHeight);
      setRowsToShow(rows);
    };

    calculateRowsToShow();
    window.addEventListener('resize', calculateRowsToShow);

    return () => window.removeEventListener('resize', calculateRowsToShow);
  }, []);

  useEffect(() => {
    setVisibleServices(bookedServices.slice(0, rowsToShow));
  }, [bookedServices, rowsToShow]);

  const handleArrowClick = () => {
    navigate('/admin/booked-services');
  };

  return (
    <div className="flex-1 bg-white rounded-lg py-3">
      <div className="flex justify-between mx-4 items-center">
        <h2 className="font-semibold text-lg">Progress Statistics</h2>

        <div className="flex items-center gap-3">
          <div>
            <input type="date" className="text-[#6E7786] border border-[#E8E9ED] rounded-full px-4 py-2" />
          </div>
          <ArrowUpButton onClick={handleArrowClick} />
        </div>
      </div>
      <BookedServicesTable bookedServices={visibleServices} />
    </div>
  );
};

export default ProgressTable;
