import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

export const fetchActivities = async (date, people) => {
  try {
    const response = await api.get('/activities', {
      params: { date, people }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching activities:', error)
    throw error
  }
}

export const fetchActivityDetails = async (id) => {
  try {
    const response = await api.get(`/activities/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching activity details:', error)
    throw error
  }
}

export const createBooking = async (bookingData) => {
  try {
    const response = await api.post('/bookings', bookingData)
    return response.data
  } catch (error) {
    console.error('Error creating booking:', error)
    throw error
  }
}