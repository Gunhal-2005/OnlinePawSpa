

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API_BASE_URL = 'http://localhost:5000/api/v1/users';

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Allow sending cookies
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Login failed');

      onLogin(true); // Update state to indicate login success
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Registration failed');

      setIsRegistering(false);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={{backgroundImage: `url('/images/back.jpg')`, backgroundSize: 'cover', height: '100vh'}}>
     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',backdropFilter: 'blur(5px)', padding: '20px' }}>
      
      <form onSubmit={isRegistering ? handleRegister : handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <h2 style={{color:'white',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'}}>{isRegistering ? 'Register' : 'User Login'}</h2>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
          style={{marginBottom: '10px', padding: '10px',backgroundColor: 'transparent',border:' 1px solid black',outline:'none',color:'black'}}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
          style={{ marginBottom: '10px', padding: '10px',backgroundColor: 'transparent',border:' 1px solid black',outline:'none',color:'black' }}
        />
       
 
       
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ padding: '10px', backgroundColor: 'black',  borderRadius:'8PX', fontFamily:'Poppins',fontSize:'20px',color:'white'}}>
          {isRegistering ? 'Register' : 'Login'}
        </button>
        <button 
          type="button" 
          onClick={() => setIsRegistering(!isRegistering)} 
          style={{ padding: '10px', marginTop: '10px',backgroundColor:'transparent', borderRadius:'6PX'}}
        >
          {isRegistering ? 'Already have an account? Login' : 'Don have an account? Register'}
        </button>
      </form>
      </div>
    </div>

  );
};

export default UserLogin;
