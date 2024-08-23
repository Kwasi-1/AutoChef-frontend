import React, { useState, useEffect } from 'react';

function ServiceDropdown({ formData, handleInputChange }) {
  // State to store service names fetched from the API
  const [services, setServices] = useState([]);

  // Fetch the services data when the component mounts
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/services`) //'http://localhost:8080/api/services'
      .then(response => {
         if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Extract the service names and update the state
        setServices(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []); 

  return (
    <select
      name="service"
      value={formData.service}
      onChange={handleInputChange}
      className="appearance-none border border-gray-300 bg-gray-50 rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="service"
      required
    >
      <option value="">--Select Service--</option>
      {services.map((service, index) => (
        <option key={index} value={service.name}>
          {service.name}
        </option>
      ))}
    </select>
  );
}

export default ServiceDropdown;
