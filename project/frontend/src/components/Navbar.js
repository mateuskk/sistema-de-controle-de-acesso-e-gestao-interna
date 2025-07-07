import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/resources">Recursos</Link>
      <button onClick={handleLogout}>Sair</button>
      <span style={{ marginLeft: 10 }}>Perfil: {role}</span>
    </nav>
  );
}

export default Navbar;
