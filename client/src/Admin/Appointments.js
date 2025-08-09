

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Appointments = () => {
  const [appointmentList, setAppointmentList] = useState([]); // State for storing appointments
  const [filterStatus, setFilterStatus] = useState('All'); // State for filtering by status
  const [filterDate, setFilterDate] = useState('All'); // State for filtering by date

  // Fetch appointments from the backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/view/');
        setAppointmentList(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  // Function to update appointment status
  const changeStatus = async (id, newStatus) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/view/${id}`, { status: newStatus });

      if (response.data && response.data.appointment) {
        setAppointmentList((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === id ? { ...appointment, status: newStatus } : appointment
          )
        );
      } else {
        console.error('Invalid response format:', response.data);
      }
    } catch (error) {
      console.error('Error updating status:', error.response ? error.response.data : error.message);
    }
  };

  // Function to complete an appointment
  const completeAppointment = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/view/${id}`, { status: 'Completed' });

      if (response.data && response.data.appointment) {
        setAppointmentList((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === id ? { ...appointment, status: 'Completed' } : appointment
          )
        );
      } else {
        console.error('Invalid response format:', response.data);
      }
    } catch (error) {
      console.error('Error completing appointment:', error.response ? error.response.data : error.message);
    }
  };

  // Helper function to check if an appointment is today
  const isToday = (appointmentDate) => {
    const today = new Date();
    const date = new Date(appointmentDate);

    return (
      today.getDate() === date.getDate() &&
      today.getMonth() === date.getMonth() &&
      today.getFullYear() === date.getFullYear()
    );
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <h2>Appointments: Admin View</h2>

      {/* Filter Dropdowns */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <label style={{ fontSize: '16px', fontWeight: 'bold' }}>Filter by Status:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ padding: '8px 12px', fontSize: '16px', borderRadius: '10px', border: '1px solid #ccc' }}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <label style={{ fontSize: '16px', fontWeight: 'bold' }}>Filter by Date:</label>
        <select
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          style={{ padding: '8px 12px', fontSize: '16px', borderRadius: '10px', border: '1px solid #ccc' }}
        >
          <option value="All">All</option>
          <option value="Today">Today</option>
        </select>
      </div>

      {/* Appointments Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', border: '1px solid transparent' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid rgba(0, 0, 0, 0.2)', fontSize: '18px',padding:'10px' }}>Owner's Name</th>
            <th style={{ border: '1px solid rgba(0, 0, 0, 0.2)', fontSize: '18px',padding:'10px' }}>Pet's Name</th>
            <th style={{ border: '1px solid rgba(0, 0, 0, 0.2)', fontSize: '18px',padding:'10px' }}>Service</th>
            <th style={{ border: '1px solid rgba(0, 0, 0, 0.2)', fontSize: '18px',padding:'10px' }}>Price</th>
            <th style={{ border: '1px solid rgba(0, 0, 0, 0.2)', fontSize: '18px',padding:'10px' }}>Date</th>
            <th style={{ border: '1px solid rgba(0, 0, 0, 0.2)', fontSize: '18px',padding:'10px' }}>Time Slot</th>
            <th style={{ border: '1px solid rgba(0, 0, 0, 0.2)', fontSize: '18px',padding:'10px' }}>Status</th>
            <th style={{ border: '1px solid rgba(0, 0, 0, 0.2)', fontSize: '18px',padding:'10px' }}>Contact</th>
            <th style={{ border: '1px solid rgba(0, 0, 0, 0.2)', fontSize: '18px',padding:'10px' }}>Address</th>
            <th style={{ border: '1px solid rgba(0, 0, 0, 0.2)', fontSize: '18px',padding:'10px' }}>Pet Image</th>
            <th style={{ border: '1px solid rgba(0, 0, 0, 0.2)', fontSize: '18px',padding:'10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointmentList
            .filter((appointment) => {
              // Filter by status
              const statusFilter = filterStatus === 'All' || appointment.status === filterStatus;

              // Filter by date (Today filter)
              const dateFilter = filterDate === 'All' || (filterDate === 'Today' && isToday(appointment.appointmentDate));

              return statusFilter && dateFilter;
            })
            .map((appointment) => (
              <tr key={appointment._id}>
                <td style={{ border: '1px solid rgba(0, 0, 0, 0.2)' }}>{appointment.ownerName}</td>
                <td style={{ border: '1px solid rgba(0, 0, 0, 0.2)' }}>{appointment.petName}</td>
                <td style={{ border: '1px solid rgba(0, 0, 0, 0.2)' }}>{appointment.service}</td>
                <td style={{ border: '1px solid rgba(0, 0, 0, 0.2)' }}>₹{appointment.price}</td>
                <td style={{ border: '1px solid rgba(0, 0, 0, 0.2)' }}>
                  {new Date(appointment.appointmentDate).toLocaleDateString()}
                </td>
                <td style={{ border: '1px solid rgba(0, 0, 0, 0.2)' }}>{appointment.timeSlot}</td>
                <td
                  style={{
                    fontWeight: 'bold',
                    color:
                      appointment.status === 'Pending'
                        ? 'blue'
                        : appointment.status === 'Confirmed'
                        ? 'green'
                        : appointment.status === 'Completed'
                        ? 'green' // Set Completed status to green
                        : 'red',
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    padding: '10px',
                  }}
                >
                  {appointment.status}
                </td>
                <td style={{ border: '1px solid rgba(0, 0, 0, 0.2)' }}>{appointment.contactInfo}</td>
                <td style={{ border: '1px solid rgba(0, 0, 0, 0.2)' }}>{appointment.address}</td>
                <td style={{ border: '1px solid rgba(0, 0, 0, 0.2)' }}>
                  {appointment.petImage && (
                    <img
                      src={appointment.petImage}
                      alt="Pet"
                      style={{ width: '50px', height: '50px', borderRadius: '5px' }}
                    />
                  )}
                </td>
                <td style={{ border: '1px solid rgba(0, 0, 0, 0.2)' }}>
                  {appointment.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => changeStatus(appointment._id, 'Confirmed')}
                        style={{
                          padding: '6px 12px',
                          fontSize: '14px',
                          background: 'linear-gradient(145deg, #4caf50, #81c784)', // Green gradient for Accept
                          color: 'white',
                          fontWeight: 'bold',
                          borderRadius: '30px',
                          border: 'none',
                          cursor: 'pointer',
                          boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '6px 6px 15px rgba(0, 0, 0, 0.2)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '4px 4px 10px rgba(0, 0, 0, 0.1)'}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => changeStatus(appointment._id, 'Cancelled')}
                        style={{
                          padding: '6px 12px',
                          fontSize: '14px',
                          background: 'linear-gradient(145deg, #f44336, #e57373)', // Red gradient for Reject
                          color: 'white',
                          fontWeight: 'bold',
                          borderRadius: '30px',
                          border: 'none',
                          cursor: 'pointer',
                          boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1)',
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '6px 6px 15px rgba(0, 0, 0, 0.2)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '4px 4px 10px rgba(0, 0, 0, 0.1)'}
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {/* Show the Complete button after Accept */}
                  {appointment.status === 'Confirmed' && (
                    <button
                      onClick={() => completeAppointment(appointment._id)}
                      style={{
                        padding: '6px 12px',
                        fontSize: '14px',
                        background: 'linear-gradient(145deg, #2196f3, #64b5f6)', // Blue gradient for Complete
                        color: 'white',
                        fontWeight: 'bold',
                        borderRadius: '30px',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => e.target.style.boxShadow = '6px 6px 15px rgba(0, 0, 0, 0.2)'}
                      onMouseLeave={(e) => e.target.style.boxShadow = '4px 4px 10px rgba(0, 0, 0, 0.1)'}
                    >
                      Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
