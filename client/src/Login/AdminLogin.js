

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/v1/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();
      console.log("🛠️ API Response:", result); // Debugging log

      if (result.success) {
        // Store the token securely in sessionStorage
        sessionStorage.setItem("token", result.token);
        onLogin(true); // Call onLogin to change login state
        navigate('/admin'); // Redirect to the admin dashboard
      } else {
        setError(result.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error("❌ Login Error:", error);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div style={{backgroundImage: `url('/images/admin.webp')`,backgroundSize: 'cover', height: '100vh'}}>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',backdropFilter: 'blur(5px)', padding: '20px' }}>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <h2 style={{color:'white',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'}}>Admin Login</h2>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          style={{marginBottom: '10px', padding: '10px',backgroundColor: 'transparent',border:' 1px solid white',outline:'none',color:'white'}}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={{marginBottom: '10px', padding: '10px',backgroundColor: 'transparent',border:' 1px solid white',outline:'none',color:'white'}} 
        />
        <style>
  {`
    ::placeholder {
      color: white; /* Change placeholder color to white */
      opacity: 1; /* Ensure full visibility */
    }
    :-ms-input-placeholder { color: white; } /* For Internet Explorer 10-11 */
    ::-ms-input-placeholder { color: white; } /* For Microsoft Edge */
  `}
</style>

       
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ padding: '10px', backgroundColor: 'black',  borderRadius:'8PX', fontFamily:'Poppins',fontSize:'20px',color:'white' }}>Login</button>
      </form>
    </div>
    </div>
  );
};

export default AdminLogin;
