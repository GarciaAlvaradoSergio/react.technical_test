import { useState } from 'react'
import { createBooking } from '../services/api'

export const useBookings = () => {
  const [bookingResult, setBookingResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const createBooking = async (bookingData) => {
    setLoading(true)
    setError(null)
    try {
      const result = await createBooking(bookingData)
      setBookingResult(result)
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { createBooking, bookingResult, loading, error }
}