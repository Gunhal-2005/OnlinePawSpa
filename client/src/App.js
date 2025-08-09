import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Appointments from "./Admin/Appointments";
import ServiceForm from "./Admin/ServiceForm";
import Appointment from "./User/Appointment";
import UserAppointments from "./User/UserAppointments";
import UserFeedback from "./User/Feedback";
import UserLogin from "./Login/UserLogin";
import AdminLogin from "./Login/AdminLogin";
import LoginButtons from "./Login/LoginButtons";
import Pay from "./User/Pay";
import ServiceList from "./User/ServiceCard"; // ✅ Import new component
import Footer from "./components/Footer";
import AdminFeedback from "./Admin/AdminFeedback"; // ✅ Import AdminFeedback component

const App = () => {
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/services");

        // ✅ Ensure unique services are stored
        const uniqueServices = [...new Map(response.data.map((service) => [service._id, service])).values()];

        setServices(uniqueServices);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    const fetchAppointments = async () => {
      if (token) {
        try {
          const response = await axios.get("http://localhost:5000/api/appointments", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setAppointments(response.data);
        } catch (error) {
          console.error("Error fetching appointments:", error);
        }
      }
    };

    fetchServices();
    fetchAppointments();
  }, [token]); // ✅ Only re-fetch when token changes

  const addAppointment = async (appointment) => {
    if (!isLoggedIn) return;
    try {
      const response = await axios.post(
        "http://localhost:5000/api/appointments",
        { ...appointment, serviceName: selectedService?.name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAppointments([...appointments, response.data]);
    } catch (error) {
      console.error("Error adding appointment:", error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setToken(null);
    navigate("/");
  };

  const handleLogin = (authToken, isAdminLogin) => {
    setIsLoggedIn(true);
    setIsAdmin(isAdminLogin);
    setToken(authToken);
    navigate(isAdminLogin ? "/admin" : "/");
  };

  return (
    <div>
      <Navbar isAdmin={isAdmin} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        {!isLoggedIn ? (
          <>
            <Route path="/user-login" element={<UserLogin onLogin={(token) => handleLogin(token, false)} />} />
            <Route path="/admin-login" element={<AdminLogin onLogin={(token) => handleLogin(token, true)} />} />
            <Route path="/" element={<LoginButtons />} />
          </>
        ) : isAdmin ? (
          <>
            <Route path="/admin" element={<Appointments appointments={appointments} />} />
            <Route path="/admin/add-service" element={<ServiceForm />} />
            <Route path="/admin/feedbacks" element={<AdminFeedback />} /> {/* ✅ Admin feedback route */}
          </>
        ) : (
          <>
            {/* ✅ Uses separate ServiceList component */}
            <Route path="/service" element={<ServiceList services={services} onSelectService={setSelectedService} />} />
            <Route path="/appointment" element={<Appointment selectedService={selectedService} addAppointment={addAppointment} />} />
            <Route path="/user-appointments" element={<UserAppointments />} />
            <Route path="/feedback" element={<UserFeedback />} />
            <Route path="/pay" element={<Pay />} /> {/* ✅ Razorpay payment route */}
          </>
        )}
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
