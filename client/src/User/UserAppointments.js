
// import axios from "axios";
// import { useEffect, useState } from "react";

// const UserAppointments = () => {
//   const [appointments, setAppointments] = useState([]);

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/userview/user", {
//           withCredentials: true, // ✅ Ensures cookies (JWT) are sent
//         });
//         setAppointments(response.data);
//       } catch (error) {
//         console.error("Error fetching appointments:", error.response?.data?.message || error.message);
//       }
//     };

//     fetchAppointments();
//   }, []);

//   const handleCancel = async (id) => {
//     try {
//       await axios.patch(
//         `http://localhost:5000/api/userview/${id}/cancel`,
//         {},
//         { withCredentials: true }
//       );

//       // ✅ Update UI after cancellation
//       setAppointments((prevAppointments) =>
//         prevAppointments.map((appointment) =>
//           appointment._id === id ? { ...appointment, status: "Canceled" } : appointment
//         )
//       );
//     } catch (error) {
//       console.error("Error canceling appointment:", error.response?.data?.message || error.message);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>My Appointments</h2>
//       {appointments.length > 0 ? (
//         <ul style={styles.list}>
//           {appointments.map((appointment) => (
//             <li key={appointment._id} style={styles.listItem}>
//               <p><strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleString()}</p>
//               <p><strong>Time Slot:</strong> {appointment.timeSlot}</p>
//               <p><strong>Service:</strong> {appointment.service}</p>
//               <p><strong>Status:</strong> <span style={styles.status(appointment.status)}>{appointment.status}</span></p>
//               {appointment.status !== "Canceled" && (
//                 <button style={styles.cancelButton} onClick={() => handleCancel(appointment._id)}>Cancel</button>
//               )}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p style={styles.noAppointments}>No appointments found.</p>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: "600px",
//     margin: "20px auto",
//     padding: "20px",
//     backgroundColor: "#f9f9f9",
//     borderRadius: "8px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//   },
//   heading: {
//     textAlign: "center",
//     color: "#333",
//   },
//   list: {
//     listStyle: "none",
//     padding: 0,
//   },
//   listItem: {
//     backgroundColor: "#fff",
//     padding: "10px",
//     margin: "10px 0",
//     borderRadius: "5px",
//     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//   },
//   status: (status) => ({
//     color: status === "Canceled" ? "red" : "green",
//     fontWeight: "bold",
//   }),
//   noAppointments: {
//     textAlign: "center",
//     color: "#777",
//   },
//   cancelButton: {
//     backgroundColor: "#d9534f",
//     color: "white",
//     padding: "5px 10px",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     marginTop: "5px",
//   },
// };

// export default UserAppointments;


import axios from "axios";
import { useEffect, useState } from "react";

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/userview/user", {
          withCredentials: true, // ✅ Ensures cookies (JWT) are sent
        });
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error.response?.data?.message || error.message);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancel = async (id) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/userview/${id}/cancel`,
        {},
        { withCredentials: true }
      );

      // ✅ Update UI after cancellation
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === id ? { ...appointment, status: "Cancelled" } : appointment
        )
      );
    } catch (error) {
      console.error("Error canceling appointment:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Appointments</h2>
      {appointments.length > 0 ? (
        <ul style={styles.list}>
          {appointments.map((appointment) => (
            <li key={appointment._id} style={styles.listItem}>
              <p><strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleString()}</p>
              <p><strong>Time Slot:</strong> {appointment.timeSlot}</p>
              <p><strong>Service:</strong> {appointment.service}</p>
              <p><strong>Status:</strong> <span style={styles.status(appointment.status)}>{appointment.status}</span></p>
              {appointment.status !== "Cancelled" && (
                <button style={styles.cancelButton} onClick={() => handleCancel(appointment._id)}>Cancel</button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p style={styles.noAppointments}>No appointments found.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    color: "#333",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    backgroundColor: "#fff",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  status: (status) => ({
    color: status === "Cancelled" ? "red" : "green",
    fontWeight: "bold",
  }),
  noAppointments: {
    textAlign: "center",
    color: "#777",
  },
  cancelButton: {
    backgroundColor: "#d9534f",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "5px",
  },
};

export default UserAppointments;
