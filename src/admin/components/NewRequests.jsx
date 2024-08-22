import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import ArrowUpButton from './ArrowUpButton';
import InitialsAvatar from './InitialsAvatar';
import SkeletonLoader from './SkeletonLoader';

const NewRequests = () => {
  const [bookedServices, setBookedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('https://api.example.com/booked-services'); // Replace with your actual API endpoint
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch booked services');
  //       }
  //       const data = await response.json();
  //       setBookedServices(data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error); // Handle error appropriately
  //     } finally {
  //       setLoading(false); // Ensure loading stops regardless of success or error
  //     }
  //   };

  //   fetchData();
  // }, []);

  // Commented out the simulation and placeholder data logic
  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const placeholderData = [
        { id: 1, invoiceNumber: '#20025785644', customerName: 'John Doe', serviceName: 'Electrical Services', date: '2024-07-25', status: 'Requested' },
        { id: 2, invoiceNumber: '#20025785645', customerName: 'Jane Smith', serviceName: 'Tire Replacement', date: '2024-07-24', status: 'Pending' },
        { id: 3, invoiceNumber: '#20025785646', customerName: 'Alice Johnson', serviceName: 'Auto Mechanic', date: '2024-07-23', status: 'Requested' },
        { id: 4, invoiceNumber: '#20025785647', customerName: 'Bob Brown', serviceName: 'Battery Replacement', date: '2024-07-22', status: 'Cancelled' },
        { id: 5, invoiceNumber: '#20025785648', customerName: 'Charlie Green', serviceName: 'Paint Correction', date: '2024-07-21', status: 'Requested' },
        { id: 6, invoiceNumber: '#20025785649', customerName: 'Daisy Blue', serviceName: 'Transmission Repair', date: '2024-07-20', status: 'Pending' },
        { id: 7, invoiceNumber: '#20025785650', customerName: 'Ella White', serviceName: 'Engine Tune-Up', date: '2024-07-19', status: 'Completed' },
        { id: 8, invoiceNumber: '#20025785651', customerName: 'Frank Black', serviceName: 'Wheel Alignment', date: '2024-07-18', status: 'Cancelled' },
        { id: 9, invoiceNumber: '#20025785652', customerName: 'Grace Pink', serviceName: 'Automobile Resprays', date: '2024-07-17', status: 'Requested' },
        { id: 10, invoiceNumber: '#20025785653', customerName: 'Henry Red', serviceName: 'Spark Plug Change', date: '2024-07-16', status: 'Pending' },
      ];

      setBookedServices(placeholderData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const requestedStatuses = bookedServices.filter(service => service.status === 'Requested').slice(-4);

  const handleArrowClick = () => {
    navigate('/admin/booked-services', { state: { filterStatus: 'Requested' } });
  };

  return (
    <div className="flex-1 bg-white p-4 border border-[#E8E9ED] rounded-lg">
      <div className="flex justify-between items-center mb-1">
        <h2 className="font-semibold text-lg">New Requests</h2>
        <ArrowUpButton onClick={handleArrowClick} />
      </div>
      {loading ? (
        <SkeletonLoader itemCount={4} layout="horizontal" type="list" />
      ) : requestedStatuses.length === 0 ? (
        <div className="flex flex-col justify-center items-center p-4 text-gray-600 h-40">
          No new requests.
        </div>
      ) : (
        <ul>
          {requestedStatuses.map((request) => (
            <li key={request.id} className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center space-x-3">
                <InitialsAvatar name={request.customerName} />
                <div className='pr-2 max-w-32'>
                  <p className="font-semibold truncate">{request.customerName}</p>
                  <p className="text-sm text-gray-500 truncate">{request.serviceName}</p>
                </div>
              </div>
              <StatusBadge status={request.status} margin="mr-0" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewRequests;
