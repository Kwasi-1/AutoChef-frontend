import React, { useMemo, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StatisticCard from './StatisticCard';

const StatisticsSection = ({
  bookedServices = [],
  fetchData = null,
  onFilter = (status) => console.log(`Filtering by: ${status}`),
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isBookedServices = location.pathname === '/admin/booked-services';

  const [services, setServices] = useState([]); // Initialize with an empty array to show 0 until data is fetched
  const [loading, setLoading] = useState(true); // Track loading state to show default 0s during data fetch
  const [error, setError] = useState(null); // Track errors during data fetching

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state before fetching

        let data;
        if (fetchData) {
          data = await fetchData(); // Use provided fetchData function if available
        } else {
          const response = await fetch('/api/services'); // Replace with your actual API endpoint
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          data = await response.json(); // Parse JSON data from response
        }

        setServices(data || []); // Update state with fetched data or empty array
      } catch (err) {
        setError('Failed to fetch data'); // Handle errors during fetching
      } finally {
        setLoading(false); // Set loading to false after fetching is done
      }
    };

    fetchServices();
  }, [fetchData]);

  // Memoize statistics calculation to avoid unnecessary recalculations
  const statisticsData = useMemo(() => {
    const totalInvoices = services.length;
    const completedCount = services.filter(service => service.status === 'Completed').length;
    const pendingCount = services.filter(service => service.status === 'Pending').length;
    const canceledCount = services.filter(service => service.status === 'Cancelled').length;

    return [
      {
        iconBgColor: 'bg-[#CEE0FF]',
        iconColor: 'text-[#0866FF]',
        count: loading ? 0 : totalInvoices, // Show 0 if still loading
        title: 'Total Invoice',
        arrowUpBgColor: 'bg-[#3c87ff]',
        bgColor: 'hover:bg-gradient-to-t hover:from-[#0866ff] hover:to-[#74a9ff]',
      },
      {
        iconBgColor: 'bg-[#CEF3DC]',
        iconColor: 'text-[#08C352]',
        count: loading ? 0 : completedCount, // Show 0 if still loading
        title: 'Completed',
        arrowUpBgColor: 'bg-[#10D087]',
        bgColor: 'hover:bg-gradient-to-t hover:from-[#08C352] hover:to-[#15C584]',
      },
      {
        iconBgColor: 'bg-[#FFEBCC]',
        iconColor: 'text-[#FF9900]',
        count: loading ? 0 : pendingCount, // Show 0 if still loading
        title: 'Pending',
        arrowUpBgColor: 'bg-[#fbb751]',
        bgColor: 'hover:bg-gradient-to-t hover:from-[#FF9900] hover:to-[#fad090]',
      },
      {
        iconBgColor: 'bg-[#FFE5E5]',
        iconColor: 'text-[#DE0000]',
        count: loading ? 0 : canceledCount, // Show 0 if still loading
        title: 'Canceled',
        arrowUpBgColor: 'bg-[#fd3c3c]',
        bgColor: 'hover:bg-gradient-to-t hover:from-[#DE0000] hover:to-[#f55d5d]',
      },
    ];
  }, [services, loading]);

  const handleArrowClick = (status) => {
    const filterStatus = status === 'Total Invoice' ? '' : status; // Set filter status based on the selected statistic
    onFilter(filterStatus); // Pass the filter status to the parent component
    navigate('/admin/booked-services', { state: { filterStatus } }); // Navigate with state to apply the filter
  };

  // Display error message if data fetching fails
  // if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-1 gap-6 mb-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {statisticsData.map((stat, index) => (
        <StatisticCard
          key={index}
          {...stat}
          isBookedServices={isBookedServices}
          onArrowClick={handleArrowClick}
        />
      ))}
    </div>
  );
};

export default StatisticsSection;
