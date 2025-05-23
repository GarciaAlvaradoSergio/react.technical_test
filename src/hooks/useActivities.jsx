import { useState, useEffect } from 'react'
import { fetchActivities, fetchActivityDetails } from '../services/api'

export const useActivities = (initialDate, initialPeople) => {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const searchActivities = async (date, people) => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchActivities(date, people)
      setActivities(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    if (initialDate && initialPeople) {
      searchActivities(initialDate, initialPeople)
    }
  }, [])
  
  return { activities, loading, error, searchActivities }
}