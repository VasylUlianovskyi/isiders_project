const AUTH_API_URL = 'http://localhost:5000/api/auth';

interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = async (payload: LoginPayload) => {
  const res = await fetch(`${AUTH_API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Login failed');
  }

  localStorage.setItem('token', data.token);
  localStorage.setItem('userEmail', data.user.email);
  localStorage.setItem('userId', data.user.id);
  return data;
};

interface RegisterPayload {
  email: string;
  password: string;
}

export const registerUser = async (payload: RegisterPayload) => {
  const res = await fetch(`${AUTH_API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Registration failed');
  }

  return data;
};
