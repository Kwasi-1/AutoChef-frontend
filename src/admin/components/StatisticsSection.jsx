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

  const [services, setServices] = useState(bookedServices);

  // Fetch data if fetchData function is provided
  useEffect(() => {
    if (fetchData) {
      fetchData().then((data) => {
        setServices(data || []);
      });
    }
  }, [fetchData]);

  // Calculate statistics data
  const statisticsData = useMemo(() => {
    const totalInvoices = services.length;
    const completedCount = services.filter(service => service.status === 'Completed').length;
    const pendingCount = services.filter(service => service.status === 'Pending').length;
    const canceledCount = services.filter(service => service.status === 'Cancelled').length;

    return [
      {
        iconBgColor: 'bg-[#CEE0FF]',
        iconColor: 'text-[#0866FF]',
        count: totalInvoices,
        title: 'Total Invoice',
        arrowUpBgColor: 'bg-[#3c87ff]',
        bgColor: 'hover:bg-gradient-to-t hover:from-[#0866ff] hover:to-[#74a9ff]',
      },
      {
        iconBgColor: 'bg-[#CEF3DC]',
        iconColor: 'text-[#08C352]',
        count: completedCount,
        title: 'Completed',
        arrowUpBgColor: 'bg-[#10D087]',
        bgColor: 'hover:bg-gradient-to-t hover:from-[#08C352] hover:to-[#15C584]',
      },
      {
        iconBgColor: 'bg-[#FFEBCC]',
        iconColor: 'text-[#FF9900]',
        count: pendingCount,
        title: 'Pending',
        arrowUpBgColor: 'bg-[#fbb751]',
        bgColor: 'hover:bg-gradient-to-t hover:from-[#FF9900] hover:to-[#fad090]',
      },
      {
        iconBgColor: 'bg-[#FFE5E5]',
        iconColor: 'text-[#DE0000]',
        count: canceledCount,
        title: 'Canceled',
        arrowUpBgColor: 'bg-[#fd3c3c]',
        bgColor: 'hover:bg-gradient-to-t hover:from-[#DE0000] hover:to-[#f55d5d]',
      },
    ];
  }, [services]);

  // Handle arrow button clicks to filter and navigate
  const handleArrowClick = (status) => {
    const filterStatus = status === 'Total Invoice' ? '' : status;
    onFilter(filterStatus); // Pass the filter status to the parent component
    navigate('/admin/booked-services', { state: { filterStatus } }); // Navigate with state
  };

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
