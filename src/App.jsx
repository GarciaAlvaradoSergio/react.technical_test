import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useActivities } from './hooks/useActivities'
import { useBookings } from './hooks/useBookings'
import SearchForm from './components/SearchForm'
import ActivityList from './components/ActivityList'
import ActivityDetail from './components/ActivityDetail'
import BookingConfirmation from './components/BookingConfirmation'
import Layout from './components/ui/Layout'
import Home from './pages/Home'
import ActivityDetailPage from './pages/ActivityDetailPage'
import './App.css'

function App() {
  const [searchParams, setSearchParams] = useState({
    date: '',
    people: 1
  })
  
  const navigate = useNavigate()
  const { activities, loading, error, searchActivities } = useActivities()
  const { createBooking, bookingResult } = useBookings()

  const handleSearch = (date, people) => {
    setSearchParams({ date, people })
    searchActivities(date, people)
    navigate('/')
  }

  const handleBookActivity = async (activityId, people, date) => {
    try {
      await createBooking({
        activity_id: activityId,
        people,
        activity_date: date
      })
      navigate('/confirmation')
    } catch (error) {
      console.error('Booking error:', error)
    }
  }

  return (
    <Layout>
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <SearchForm 
                initialDate={searchParams.date}
                initialPeople={searchParams.people}
                onSearch={handleSearch}
              />
              <ActivityList 
                activities={activities}
                loading={loading}
                error={error}
                searchParams={searchParams}
              />
            </>
          } 
        />
        
        <Route 
          path="/activity/:id" 
          element={
            <ActivityDetailPage 
              searchParams={searchParams}
              onBook={handleBookActivity}
            />
          } 
        />
        
        <Route 
          path="/confirmation" 
          element={
            <BookingConfirmation 
              booking={bookingResult} 
              onReturnHome={() => navigate('/')}
            />
          } 
        />
      </Routes>
    </Layout>
  )
}

export default App