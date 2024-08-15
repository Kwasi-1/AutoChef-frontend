import React, { createContext, useState, useContext } from 'react';

const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const [selectedService, setSelectedService] = useState('');

  return (
    <ServiceContext.Provider value={{ selectedService, setSelectedService }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => useContext(ServiceContext);