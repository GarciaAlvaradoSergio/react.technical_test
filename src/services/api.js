import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  response => response.data, // Extraemos data directamente aquí
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const fetchActivities = (date, people) => {
  return api.get('/activities', { params: { date, people } });
};

export const fetchActivityDetails = (id) => {
  return api.get(`/activities/${id}`);
};

export const createBooking = (bookingData) => {
  return api.post('/bookings', bookingData);
};