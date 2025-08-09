
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { FaQrcode } from 'react-icons/fa';


// const Appointment = ({ selectedService }) => {
//   const [formData, setFormData] = useState({
//     ownerName: '',
//     petName: '',
//     service: selectedService?.name || 'Grooming',
//     price: selectedService?.price || '',
//     appointmentDate: '',
//     timeSlot: '9:00 AM',
//     petImage: '',
//     email: '',
//     contactInfo: '',
//     address: '',
//   });
//   const noteStyle = {
//     margin: '20px auto',
//     padding: '15px',
//     borderRadius: '8px',
//     backgroundColor: '#fff3cd',
//     borderLeft: '5px solid #ffa500',
//     textAlign: 'center',
//     width: '60%',
//     fontSize: '16px',
//     color: '#856404',
//     fontWeight: 'bold',
//     boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
//   };

//   const timeSlots = [
//     "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"
//   ];

//   useEffect(() => {
//     if (selectedService) {
//       setFormData((prevData) => ({
//         ...prevData,
//         service: selectedService.name,
//         price: selectedService.price,
//       }));
//     }
//   }, [selectedService]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.ownerName || !formData.petName || !formData.appointmentDate || !formData.email || !formData.petImage) {
//       alert('Please fill in all the required fields, including the pet image.');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/api/appointments', formData, { withCredentials: true });
//       alert(response.data.message);
//       setFormData({
//         ownerName: '',
//         petName: '',
//         service: selectedService?.name || 'Grooming',
//         price: selectedService?.price || '',
//         appointmentDate: '',
//         timeSlot: '9:00 AM',
//         petImage: '',
//         email: '',
//         contactInfo: '',
//         address: '',
//       });
//     } catch (error) {
//       alert(error.response?.data?.message || 'Error booking appointment');
//     }
//   };

//   return (
//     <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
//       <h2 style={{ textAlign: 'center' }}>Book Appointment</h2>
//       <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//         <input type="text" name="ownerName" placeholder="Owner's Name" value={formData.ownerName} onChange={handleChange} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
//         <input type="text" name="petName" placeholder="Pet's Name" value={formData.petName} onChange={handleChange} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
//         <input type="text" name="service" value={formData.service} readOnly style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#e9ecef' }} />
//         <input type="text" name="price" value={`₹${formData.price}`} readOnly style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#e9ecef' }} />
//         <input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
//         <select name="timeSlot" value={formData.timeSlot} onChange={handleChange} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
//           {timeSlots.map((slot) => (
//             <option key={slot} value={slot}>{slot}</option>
//           ))}
//         </select>
//         <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
//         <input type="text" name="contactInfo" placeholder="Phone Number" value={formData.contactInfo} onChange={handleChange} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
//         <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', resize: 'none' }} />
//         <input type="file" onChange={(e) => setFormData({ ...formData, petImage: URL.createObjectURL(e.target.files[0]) })} accept="image/*" required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
//         {formData.petImage && <img src={formData.petImage} alt="Pet" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '5px', marginTop: '10px' }} />}
//         <button type="submit" style={{ padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#28a745', color: 'white', cursor: 'pointer' }}>Submit</button>
//       </form>
//       <div style={noteStyle}>
//         <h2>Note</h2>
//         <h6>
//           Confirm your appointment by paying ₹200.
//           <br />
//           Pay by clicking here:
//           <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', marginLeft: '8px' }}>
//             <Link to="/pay">
//               <FaQrcode style={{ fontSize: '18px', color: '#000' }} />
//             </Link>
//           </span>
//         </h6>
//       </div>
      
//     </div>
//   );
// };

// export default Appointment;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaQrcode } from 'react-icons/fa';

const Appointment = ({ selectedService }) => {
  const [formData, setFormData] = useState({
    ownerName: '',
    petName: '',
    service: selectedService?.name || 'Grooming',
    price: selectedService?.price || '',
    appointmentDate: '',
    timeSlot: '9:00 AM',
    petImage: '',
    email: '',
    contactInfo: '',
    address: '',
  });

  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"];

  useEffect(() => {
    if (selectedService) {
      setFormData((prevData) => ({
        ...prevData,
        service: selectedService.name,
        price: selectedService.price,
      }));
    }
  }, [selectedService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle file selection and convert to Base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          petImage: reader.result, // Stores image as Base64
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.ownerName || !formData.petName || !formData.appointmentDate || !formData.email || !formData.petImage) {
      alert('Please fill in all the required fields, including the pet image.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/appointments', formData, { withCredentials: true });
      alert(response.data.message);
      setFormData({
        ownerName: '',
        petName: '',
        service: selectedService?.name || 'Grooming',
        price: selectedService?.price || '',
        appointmentDate: '',
        timeSlot: '9:00 AM',
        petImage: '',
        email: '',
        contactInfo: '',
        address: '',
      });
    } catch (error) {
      alert(error.response?.data?.message || 'Error booking appointment');
    }
  };

  return (
    <div>
      <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ textAlign: 'center' }}>Book Appointment</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" name="ownerName" placeholder="Owner's Name" value={formData.ownerName} onChange={handleChange} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <input type="text" name="petName" placeholder="Pet's Name" value={formData.petName} onChange={handleChange} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <input type="text" name="service" value={formData.service} readOnly style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#e9ecef' }} />
        <input type="text" name="price" value={`₹${formData.price}`} readOnly style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#e9ecef' }} />
        <input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <select name="timeSlot" value={formData.timeSlot} onChange={handleChange} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>{slot}</option>
          ))}
        </select>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <input type="text" name="contactInfo" placeholder="Phone Number" value={formData.contactInfo} onChange={handleChange} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', resize: 'none' }} />
        
        {/* Image Upload Input */}
        <input type="file" onChange={handleFileChange} accept="image/*" required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        
        {/* Display Uploaded Image */}
        {formData.petImage && (
          <img src={formData.petImage} alt="Pet" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '5px', marginTop: '10px' }} />
        )}

        <button type="submit" style={{ padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#28a745', color: 'white', cursor: 'pointer' }}>Submit</button>
      </form>
    </div>
    {/* Payment Section */}
    <div style={{ margin: '20px auto', padding: '15px', borderRadius: '8px', backgroundColor: '#fff3cd', borderLeft: '5px solid #ffa500', textAlign: 'center', width: '60%', fontSize: '16px', color: '#856404', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
        <h2>Note</h2>
        <h6>
          Confirm your appointment by paying ₹200.
          <br />
          Pay by clicking here:
          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', marginLeft: '8px' }}>
            <Link to="/pay">
              <FaQrcode style={{ fontSize: '18px', color: '#000' }} />
            </Link>
          </span>
        </h6>
      </div>
    </div>
  );
};

export default Appointment;
