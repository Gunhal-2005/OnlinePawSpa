import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginButtons = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/user-login')}>User Login</button>
      <button onClick={() => navigate('/admin-login')}>Admin Login</button>
    </div>
  );
};

export default LoginButtons;
