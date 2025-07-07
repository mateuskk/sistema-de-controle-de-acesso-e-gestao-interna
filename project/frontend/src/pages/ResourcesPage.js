import React, { useEffect, useState } from 'react';
import './ResourcesPage.css';
import { authFetch } from '../utils/authFetch';

function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  useEffect(() => {
    async function fetchResources() {
      try {
        const res = await authFetch('http://localhost:5000/api/resources/');
        const data = await res.json();
        if (Array.isArray(data)) {
          setResources(data);
        } else {
          setError(data.msg || 'Erro ao carregar recursos');
          setResources([]);
        }
      } catch {
        setError('Erro de conexão');
        setResources([]);
      }
    }
    fetchResources();
  }, [token]);

  const handleAdd = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await authFetch('http://localhost:5000/api/resources/', {
        method: 'POST',
        body: JSON.stringify({ name, type, description })
      });
      if (res.status === 201) {
        setName(''); setType(''); setDescription('');
        setSuccess('Recurso adicionado com sucesso!');
        const updated = await authFetch('http://localhost:5000/api/resources/').then(r => r.json());
        if (Array.isArray(updated)) {
          setResources(updated);
        } else {
          setError(updated.msg || 'Erro ao carregar recursos');
        }
      } else {
        const data = await res.json();
        setError(data.msg || 'Erro ao adicionar recurso');
      }
    } catch {
      setError('Erro de conexão');
    }
  };

  const handleDelete = async (id) => {
    try {
      await authFetch(`http://localhost:5000/api/resources/${id}`, {
        method: 'DELETE'
      });
      setResources(resources.filter(r => r.id !== id));
    } catch {}
  };

  return (
    <div className="resources-container">
      <h2>Recursos</h2>
      {role === 'admin' && (
        <form className="resources-form" onSubmit={handleAdd}>
          <input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} required />
          <input placeholder="Tipo" value={type} onChange={e => setType(e.target.value)} required />
          <input placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} />
          <button type="submit">Adicionar</button>
        </form>
      )}
      {error && <p className="error">{error}</p>}
      {success && <p style={{color:'#4caf50',textAlign:'center',marginBottom:10}}>{success}</p>}
      <ul className="resources-list">
        {Array.isArray(resources) && resources.map(r => (
          <li key={r.id}>
            <div className="info">
              <span className="label">Nome:</span>
              <span className="name">{r.name}</span>
              <span className="label">Tipo:</span>
              <span className="type-value">{r.type}</span>
              <span className="label">Descrição:</span>
              <span className="desc">{r.description}</span>
            </div>
            {role === 'admin' && (
              <button onClick={() => handleDelete(r.id)}>Remover</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResourcesPage;
