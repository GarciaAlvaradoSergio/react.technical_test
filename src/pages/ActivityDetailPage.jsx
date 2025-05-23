import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ActivityDetail from '../components/ActivityDetail'
import { fetchActivityDetails } from '../services/api'

const ActivityDetailPage = ({ searchParams, onBook }) => {
  const { id } = useParams()
  const [activity, setActivity] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadActivity = async () => {
      try {
        const data = await fetchActivityDetails(id)
        setActivity(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    loadActivity()
  }, [id])

  if (loading) return <div>Loading activity details...</div>
  if (error) return <div>Error: {error}</div>
  if (!activity) return <div>Activity not found</div>

  return (
    <ActivityDetail 
      activity={activity} 
      people={searchParams.people}
      date={searchParams.date}
      onBook={onBook}
    />
  )
}

export default ActivityDetailPage