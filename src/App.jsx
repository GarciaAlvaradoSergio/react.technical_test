import React, { useState } from "react";
import { SearchForm } from "./components/SearchForm";
import { ActivityList } from "./components/ActivityList";
import { ActivityDetail } from "./components/ActivityDetail";
import {
  fetchActivities,
  fetchActivityDetails,
  createBooking,
} from "./services/api";
import { BookingConfirmation } from "./components/BookingConfirmation";

export const App = () => {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [bookingResult, setBookingResult] = useState(null);
  const [searchParams, setSearchParams] = useState({});

  const handleSearch = async (date, people) => {
    try {
      setSearchParams({ date, people });
      const data = await fetchActivities(date, people);
      setActivities(data);
      setSelectedActivity(null);
      setBookingResult(null);
    } catch (error) {
      console.error("Search error:", error);
      // Puedes mostrar un mensaje al usuario aquí
    }
  };

  const handleSelectActivity = async (id) => {
    const response = await fetchActivityDetails(id);
    setSelectedActivity(response.data);
  };

  const handleBookActivity = async (activityId, people, date) => {
    try {
      const booking = await createBooking({
        activity_id: activityId,
        people,
        activity_date: date,
      });
      setBookingResult(booking);
    } catch (error) {
      console.error("Booking error:", error);
      // Mostrar error al usuario
    }
  };

  return (
    <div className="container">
      <h1>Activity Booking System</h1>
      <SearchForm onSearch={handleSearch} />

      {bookingResult ? (
        <BookingConfirmation booking={bookingResult} />
      ) : selectedActivity ? (
        <ActivityDetail
          activity={selectedActivity}
          people={searchParams.people}
          onBook={handleBookActivity}
          onBack={() => setSelectedActivity(null)}
        />
      ) : (
        <ActivityList
          activities={activities}
          onSelect={handleSelectActivity}
          people={searchParams.people}
          date={searchParams.date}
          onBook={handleBookActivity}
        />
      )}
    </div>
  );
};
