import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    if (selectedService) {
      setName(selectedService.name || '');
      setDescription(selectedService.description || '');
      setPrice(selectedService.price || '');
    }
  }, [selectedService]);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await axios.get('http://localhost:5000/api/forms');
      setServices(response.data);
    };

    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && description && !isNaN(price) && price > 0) {
      if (selectedService) {
        const response = await axios.put(`http://localhost:5000/api/forms/${selectedService._id}`, { name, description, price: parseFloat(price) });
        setServices(services.map(service => service._id === selectedService._id ? response.data : service));
      } else {
        const response = await axios.post('http://localhost:5000/api/forms', { name, description, price: parseFloat(price) });
        setServices([...services, response.data]);
      }
      setSelectedService(null);
      setName('');
      setDescription('');
      setPrice('');
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/forms/${id}`);
    setServices(services.filter(service => service._id !== id));
    if (selectedService && selectedService._id === id) {
      setSelectedService(null);
      setName('');
      setDescription('');
      setPrice('');
    }
  };

  const styles = {
    container: { padding: '20px' },
    form: { margin: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' },
    formElement: { marginBottom: '15px' },
    input: { width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' },
    button: { backgroundColor: '#007bff', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', marginTop: '10px' },
    deleteButton: { backgroundColor: '#dc3545', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', marginTop: '10px' },
    serviceList: { marginTop: '20px' },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px' },
    tableHeader: { backgroundColor: '#f2f2f2', padding: '10px', textAlign: 'left' },
    tableCell: { padding: '10px', border: '1px solid #ccc', textAlign: 'left' },
    serviceButton: { backgroundColor: '#007bff', color: 'white', padding: '5px 10px', borderRadius: '5px', border: 'none', marginRight: '5px' },
    deleteServiceButton: { backgroundColor: 'red', color: 'white', padding: '5px 10px', borderRadius: '5px', border: 'none' },
  };

  return (
    <div style={styles.container}>
      <h2>{selectedService ? 'Update Service' : 'Add a New Service'}</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formElement}>
          <label>Service Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} />
        </div>
        <div style={styles.formElement}>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required style={styles.input}></textarea>
        </div>
        <div style={styles.formElement}>
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required style={styles.input} />
        </div>
        <button type="submit" style={styles.button}>{selectedService ? 'Update Service' : 'Add Service'}</button>

        {selectedService && <button type="button" onClick={handleDelete} style={styles.deleteButton}>Delete Service</button>}
      </form>

      {/* Service Management Table */}
      <div style={styles.serviceList}>
        <h3>Manage Services</h3>
        {services.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.tableCell}>Service Name</th>
                <th style={styles.tableCell}>Description</th>
                <th style={styles.tableCell}>Price</th>
                <th style={styles.tableCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service._id}>
                  <td style={styles.tableCell}>{service.name}</td>
                  <td style={styles.tableCell}>{service.description}</td>
                  <td style={styles.tableCell}>₹{service.price}</td>
                  <td style={styles.tableCell}>
                    <button onClick={() => setSelectedService(service)} style={styles.serviceButton}>Edit</button>
                    <button onClick={() => handleDelete(service._id)} style={styles.deleteServiceButton}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No services available.</p>
        )}
      </div>
    </div>
  );
};

export default ServiceForm;
