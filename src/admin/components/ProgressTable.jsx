import React, { useEffect, useState } from 'react';
import BookedServicesTable from './BookedServicesTable';
import { useNavigate } from 'react-router-dom';
import ArrowUpButton from './ArrowUpButton';
import SkeletonLoader from './SkeletonLoader';

const ProgressTable = () => {
  const [bookedServices, setBookedServices] = useState([]); // State to store fetched services
  const [visibleServices, setVisibleServices] = useState([]); // State to manage visible rows in the table
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to handle potential errors
  const navigate = useNavigate(); // Hook for programmatic navigation

  // useEffect(() => {
  //   // Fetch data from API
  //   const fetchBookedServices = async () => {
  //     try {
  //       const response = await fetch('https://api.example.com/booked-services'); // Replace with your actual API endpoint
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch booked services');
  //       }
  //       const data = await response.json();
  //       setBookedServices(data);
  //     } catch (err) {
  //       setError(err.message || 'Failed to fetch data');
  //     } finally {
  //       setLoading(false); // Stop loading state once the data is fetched
  //     }
  //   };

  //   fetchBookedServices();
  // }, []);


  // Comment out the simulation and placeholder data logic

  useEffect(() => {
    // Simulate a delay to showcase the loading state with placeholder data
    setLoading(true); // Start loading state
    setTimeout(() => {
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
      setLoading(false); // Stop loading state once data is set
    }, 1500); // Simulated delay of 1.5 seconds
  }, []);

  // useEffect(() => {
  //   const calculateRowsToShow = () => {
  //     const availableHeight = window.innerHeight - 1000; // Adjust based on your layout (header, margins, etc.)
  //     const rowHeight = 50; // Approximate row height (adjust based on your table's row height)
  //     const rows = Math.floor(availableHeight / rowHeight);
  //     setRowsToShow(rows);
  //   };

  //   calculateRowsToShow();
  //   window.addEventListener('resize', calculateRowsToShow);

  //   return () => window.removeEventListener('resize', calculateRowsToShow);
  // }, []);

  // useEffect(() => {
  //   setVisibleServices(bookedServices.slice(0, rowsToShow)); // Update visible services based on rows to show
  // }, [bookedServices, rowsToShow]);

  useEffect(() => {
    setVisibleServices(bookedServices.slice(0, 4));
  }, [bookedServices]);

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
      {loading ? (
        <SkeletonLoader itemCount={5} layout="horizontal" type="table" />
      ) : bookedServices.length === 0 ? (
        <div className="flex flex-col justify-center items-center p-4 text-gray-600 h-40">
          No services booked.
        </div>
      ) : (  
        <BookedServicesTable bookedServices={visibleServices} />
      )}
    </div>
  );
};

export default ProgressTable;
