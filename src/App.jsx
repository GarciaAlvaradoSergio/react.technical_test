import React, { useState } from "react";
import {
  getActivities,
  getActivityDetails,
  createBooking,
} from "./services/api";
import { SearchForm } from "./components/SearchForm";
import { ActivityList } from "./components/ActivityList";
import { ActivityDetail } from "./components/ActivityDetail";
import { BookingConfirmation } from "./components/BookingConfirmation";

export const App = () => {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [bookingResult, setBookingResult] = useState(null);
  const [searchParams, setSearchParams] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  const handleSearch = async (date, people) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getActivities(date, people);
      setActivities(data);
      setSearchParams({ date, people });
      setSelectedActivity(null);
      setBookingResult(null);
    } catch (err) {
      setError("Failed to load activities. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectActivity = async (id) => {
    setLoading(true);
    try {
      const data = await getActivityDetails(id);
      setSelectedActivity(data);
      setBookingResult(null);
    } catch (err) {
      setError("Failed to load activity details. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRelatedActivity = async (id) => {
    setLoading(true);
    try {
      // Agregar la actividad actual al historial antes de cargar la nueva
      if (selectedActivity) {
        setHistory((prev) => [
          ...prev,
          {
            activity: selectedActivity,
            searchParams,
          },
        ]);
      }

      const data = await getActivityDetails(id);
      setSelectedActivity(data);
      setBookingResult(null);
    } catch (err) {
      setError("Failed to load related activity. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackFromRelated = () => {
    if (history.length > 0) {
      const lastItem = history[history.length - 1];
      setSelectedActivity(lastItem.activity);
      setSearchParams(lastItem.searchParams);
      setHistory((prev) => prev.slice(0, -1));
    } else {
      setSelectedActivity(null);
    }
  };

  const handleBookActivity = async (activityId, people, date) => {
    setLoading(true);
    try {
      const booking = await createBooking({
        activity_id: activityId,
        people,
        activity_date: date,
      });
      setBookingResult(booking);
      setSelectedActivity(null);
    } catch (err) {
      setError("Failed to complete booking. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewSearch = () => {
    setBookingResult(null);
    setActivities([]);
    setSearchParams({});
  };

  return (
    <div className="container">
      <h1 className="text-center my-5 display-4 fw-bold text-primary">
        Reserva de actividades
      </h1>

      <main className="row mt-5">
        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading-overlay">Loading...</div>}

        {!bookingResult && !selectedActivity && (
          <>
            <div className="col-md-6">
              <SearchForm onSearch={handleSearch} />
            </div>
            <div className="col-md-6">
              <ActivityList
                activities={activities}
                people={searchParams.people}
                date={searchParams.date}
                onSelect={handleSelectActivity}
                onBook={handleBookActivity}
              />
            </div>
          </>
        )}

        {selectedActivity && !bookingResult && (
          <ActivityDetail
            activity={selectedActivity}
            people={searchParams.people}
            date={searchParams.date}
            onBook={handleBookActivity}
            onBack={handleBackFromRelated}
            onSelectRelated={handleSelectRelatedActivity}
          />
        )}

        {bookingResult && (
          <BookingConfirmation
            booking={bookingResult}
            onNewSearch={handleNewSearch}
          />
        )}
      </main>
    </div>
  );
};
