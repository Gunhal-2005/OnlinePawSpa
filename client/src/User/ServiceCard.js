

import React, { useEffect, useState } from "react";
import { FaBook } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const ServiceCard = ({ onSelectService }) => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate(); // ✅ Initialize useNavigate

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/services");

        if (response.data && Array.isArray(response.data)) {
          // ✅ Remove duplicate services based on `_id`
          const uniqueServices = response.data.filter(
            (service, index, self) =>
              index === self.findIndex((s) => s._id === service._id)
          );

          setServices(uniqueServices);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div style={styles.pageContainer}>
      <h2 style={styles.heading}>Our Services</h2>
      <div style={styles.container}>
        {services.length > 0 ? (
          services.map((service) => (
            <div key={service._id} style={styles.card}>
              <div style={styles.content}>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <p><strong>₹{service.price}</strong></p>
              </div>
              <button
                onClick={() => {
                  onSelectService(service);
                  navigate("/appointment"); // ✅ Navigate to appointment page
                }}
                style={styles.button}
              >
                Book Now <FaBook size={20} color="white" />
              </button>
            </div>
          ))
        ) : (
          <p style={styles.noServices}>No services available.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    textAlign: "center",
    padding: "20px",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
    padding: "20px",
  },
  card: {
    border: "1px solid #ccc",
    padding: "15px",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease",
    height: "350px",
    width: "250px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  content: {
    overflowY: "auto",
    flexGrow: 1,
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
  noServices: {
    fontSize: "18px",
    color: "#777",
  },
};

export default ServiceCard;
