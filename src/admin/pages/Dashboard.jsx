import React, { useEffect, useState } from 'react';
import Header from '../components/DashboardHeader';
import StatisticsSection from '../components/StatisticsSection';
import ProgressTable from '../components/ProgressTable';
import GalleryStatus from '../components/GalleryStatus';
import NewRequests from '../components/NewRequests';

const Dashboard = () => {
  const [bookedServices, setBookedServices] = useState([]);

  return (
    <div className="flex flex-col min-h-screen mx-4 sm:mx-8 lg:mx-12 my-4">
      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="text-2xl font-semibold mb-2">
          Welcome Frank 👋
        </div>

        {/* Dashboard header */}
        <Header />

        {/* Statistics Section */}
        <StatisticsSection bookedServices={bookedServices} />

        {/* Main content section */}
        <div className="flex flex-col md:flex-row flex-wrap justify-between mt-6 gap-4">
          <ProgressTable />
          <div className='flex-1 flex gap-4 flex-wrap'>
            <NewRequests bookedServices={bookedServices} />
            <GalleryStatus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
