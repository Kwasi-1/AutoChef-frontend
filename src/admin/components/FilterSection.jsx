import React, { useMemo } from 'react';
import serviceData from '../../client/data/serviceData'; // Ensure this path is correct

const FilterSection = ({ onFilterChange }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  // Memoize the service options to avoid re-computation on every render
  const serviceOptions = useMemo(
    () =>
      serviceData.map((service) => (
        <option key={service.id} value={service.title}>
          {service.title}
        </option>
      )),
    []
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center mb-6">
      {/* Customer Filter */}
      <div className="w-full">
        <label htmlFor="customer-filter" className="sr-only">
          Select Customer
        </label>
        <select
          id="customer-filter"
          name="customerName"
          className="p-2 bg-white border border-[#E8E9ED] rounded-lg text-[#6E7786] w-full"
          onChange={handleFilterChange}
        >
          <option value="">All Customers</option>
          {/* Add unique customer options dynamically as needed */}
        </select>
      </div>

      {/* Status Filter */}
      <div className="w-full">
        <label htmlFor="status-filter" className="sr-only">
          Select Status
        </label>
        <select
          id="status-filter"
          name="status"
          className="p-2 bg-white border border-[#E8E9ED] rounded-lg text-[#6E7786] w-full"
          onChange={handleFilterChange}
        >
          <option value="">All Status</option>
          <option value="Requested">Requested</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Services Filter */}
      <div className="w-full">
        <label htmlFor="service-filter" className="sr-only">
          Select Service
        </label>
        <select
          id="service-filter"
          name="serviceName"
          className="p-2 bg-white border border-[#E8E9ED] rounded-lg text-[#6E7786] w-full"
          onChange={handleFilterChange}
        >
          <option value="">All Services</option>
          {serviceOptions}
        </select>
      </div>

      {/* Date Picker */}
      <div className="w-full">
        <label htmlFor="date-filter" className="sr-only">
          Select Date
        </label>
        <input
          id="date-filter"
          type="date"
          name="date"
          className="p-2 bg-white border border-[#E8E9ED] rounded-lg text-[#6E7786] w-full"
          onChange={handleFilterChange}
        />
      </div>
    </div>
  );
};

export default FilterSection;
