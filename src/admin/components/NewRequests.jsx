import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import ArrowUpButton from './ArrowUpButton';
import InitialsAvatar from './InitialsAvatar';

const NewRequests = () => {
  const [bookedServices, setBookedServices] = useState([]); // State to hold the booked services data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const navigate = useNavigate(); // Hook to handle navigation

  // useEffect hook to fetch data on component mount
  useEffect(() => {
    // Simulated placeholder data for booked services
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

    // Fetch the data and update the state
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
      setBookedServices(placeholderData); // Update state with the fetched data
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchData(); // Call the function when the component is mounted
  }, []);

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Filter services to only include those with the 'Requested' status
  const requestedStatuses = bookedServices.filter(service => service.status === 'Requested').slice(-4);

  // Handle click on the arrow button to navigate and apply the filter
  const handleArrowClick = () => {
    navigate('/admin/booked-services', { state: { filterStatus: 'Requested' } });
  };

  return (
    <div className="flex-1 bg-white p-4 border border-[#E8E9ED] rounded-lg">
      <div className="flex justify-between items-center mb-1">
        <h2 className="font-semibold text-lg">New Requests</h2>
        <ArrowUpButton onClick={handleArrowClick} /> {/* Arrow button to trigger navigation */}
      </div>

      <ul>
        {requestedStatuses.map((request) => (
          <li key={request.id} className="flex items-center justify-between py-3 border-b">
            <div className="flex items-center space-x-3">
              <InitialsAvatar name={request.customerName} /> {/* Avatar with initials of customer name */}
              <div className='pr-2'>
                <p className="font-semibold">{request.customerName}</p> {/* Customer name */}
                <p className="text-sm text-gray-500 truncate">{request.serviceName}</p> {/* Service name */}
              </div>
            </div>
            <StatusBadge status={request.status} margin='mx-0' /> {/* Status badge showing request status */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewRequests;
