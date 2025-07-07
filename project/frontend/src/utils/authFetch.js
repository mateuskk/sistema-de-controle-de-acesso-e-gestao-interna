// utils/authFetch.js
export async function authFetch(url, options = {}) {
  let token = localStorage.getItem('token');
  let refreshToken = localStorage.getItem('refresh_token');
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  let response = await fetch(url, options);

  if (response.status === 401 || response.status === 422) {
    // Tenta renovar o token
    const refreshRes = await fetch('http://localhost:5000/api/auth/refresh', {
      method: 'POST',
      headers: { Authorization: `Bearer ${refreshToken}` }
    });
    if (refreshRes.ok) {
      const data = await refreshRes.json();
      localStorage.setItem('token', data.token);
      options.headers.Authorization = `Bearer ${data.token}`;
      response = await fetch(url, options);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
      return;
    }
  }
  return response;
}
