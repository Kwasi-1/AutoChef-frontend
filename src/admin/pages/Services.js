import React, { useState } from 'react';
import ReactDOM from 'react-dom';



// Service Form Component
function ServiceForm({ onAddService }) {
  const [service, setService] = useState({
    name: '',
    description: '',
    features: '',
  });

  const handleChange = (e) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddService({
      ...service,
      features: service.features.split(',').map(feature => feature.trim()),
    });
    setService({ name: '', description: '', features: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 mb-6 rounded shadow">
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={service.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Description</label>
        <textarea
          name="description"
          value={service.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Features (comma separated)</label>
        <input
          type="text"
          name="features"
          value={service.features}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="bg-red-600 text-white py-2 px-4 rounded">
        Add Service
      </button>
    </form>
  );
}

// Services Component
function Services() {
  const [services, setServices] = useState([
    {
      name: 'Auto Resprays',
      description: 'Revitalize your car’s appearance with our top-quality respray services...',
      features: ['Full Body Resprays', 'Panel Resprays', 'Custom Paint Jobs'],
    },
    {
      name: 'Car Detailing',
      description: 'Keep your car looking brand new with our comprehensive car detailing services...',
      features: ['Exterior Detailing', 'Interior Detailing', 'Ceramic Coating'],
    },
  ]);

  const addService = (newService) => {
    setServices([...services, newService]);
  };

  return (
    <div className="flex-grow p-6">
      <ServiceForm onAddService={addService} />
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Features</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{service.name}</td>
              <td className="py-2 px-4 border-b">{service.description}</td>
              <td className="py-2 px-4 border-b">
                <ul className="list-disc list-inside">
                  {service.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </td>
              <td className="py-2 px-4 border-b">
                <button className="text-blue-500 hover:underline mr-2">✎</button>
                <button className="text-red-500 hover:underline">🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Services;