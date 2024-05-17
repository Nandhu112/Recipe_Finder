// src/App.jsx
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home");
  }, [navigate]);

  return (
    <Outlet /> 
  );
};

export default App;
