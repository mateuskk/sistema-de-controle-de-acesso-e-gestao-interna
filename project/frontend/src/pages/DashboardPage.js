import React, { useEffect, useState } from 'react';
import './DashboardPage.css';

function DashboardPage() {
  const [data, setData] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:5000/api/dashboard/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setData);
  }, [token]);

  if (!data) return <div className="dashboard-container">Carregando...</div>;

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="dashboard-metric">
        Total de usuários:
        <span>{data.total_users}</span>
      </div>
      <div className="dashboard-metric">
        Total de recursos:
        <span>{data.total_resources}</span>
      </div>
    </div>
  );
}

export default DashboardPage;
