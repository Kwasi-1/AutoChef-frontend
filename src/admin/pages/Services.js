import React, { useState, useEffect } from 'react';

const Services = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: '', description: '', price: '' });

  useEffect(() => {
    fetch('/api/services')
      .then(response => response.json())
      .then(data => setServices(data))
      .catch(error => console.error('Error fetching services:', error));
  }, []);

  const handleAddService = () => {
    fetch('/api/add-service', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newService),
    })
      .then(response => response.json())
      .then(data => {
        setServices([...services, data]);
        setNewService({ name: '', description: '', price: '' });
      })
      .catch(error => console.error('Error adding service:', error));
  };

  const handleDeleteService = (id) => {
    fetch(`/api/delete-service/${id}`, { method: 'DELETE' })
      .then(() => {
        setServices(services.filter(service => service.id !== id));
      })
      .catch(error => console.error('Error deleting service:', error));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Services</h1>
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Name"
          value={newService.name}
          onChange={(e) => setNewService({ ...newService, name: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Description"
          value={newService.description}
          onChange={(e) => setNewService({ ...newService, description: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Price"
          value={newService.price}
          onChange={(e) => setNewService({ ...newService, price: e.target.value })}
          className="border p-2 w-full"
        />
        <button onClick={handleAddService} className="bg-red-500 text-white p-2">Add</button>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Description</th>
            <th className="py-3 px-4 text-left">Features</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service.id} className="border-t">
              <td className="py-3 px-4">{service.name}</td>
              <td className="py-3 px-4">{service.description}</td>
              <td className="py-3 px-4">
                <ul className="list-disc pl-5">
                  {service.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </td>
              <td className="py-3 px-4 flex gap-2">
                <button className="bg-blue-500 text-white p-1">
                  <i className="fas fa-edit"></i>
                </button>
                <button onClick={() => handleDeleteService(service.id)} className="bg-red-500 text-white p-1">
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Services;
