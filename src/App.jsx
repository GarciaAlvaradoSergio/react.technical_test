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
      setError("No se pudieron cargar las actividades. Inténtalo de nuevo.");
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
      setError("No se pudieron cargar los detalles de la actividad. Inténtalo de nuevo.");
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
      setError("No se pudo cargar la actividad relacionada. Inténtalo de nuevo.");
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
      setError("No se pudo completar la reserva. Inténtalo de nuevo.");
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

      <main className="row mt-5 position-relative">
        {/* Error Message */}
        {error && (
          <div className="col-12">
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setError(null)}
                aria-label="Close"
              ></button>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {loading && (
          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-light bg-opacity-75" style={{ zIndex: 1000 }}>
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2 text-primary">Cargando...</p>
            </div>
          </div>
        )}

        {/* Search Form and Activity List */}
        {!bookingResult && !selectedActivity && (
          <>
            <div className="col-lg-5 col-md-6 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <SearchForm onSearch={handleSearch} />
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  {activities.length > 0 ? (
                    <ActivityList
                      activities={activities}
                      people={searchParams.people}
                      date={searchParams.date}
                      onSelect={handleSelectActivity}
                      onBook={handleBookActivity}
                    />
                  ) : (
                    <div className="text-center py-5">
                      <i className="bi bi-calendar-event fs-1 text-muted"></i>
                      <p className="mt-3 text-muted">Realiza una búsqueda para ver las actividades disponibles</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Activity Details */}
        {selectedActivity && !bookingResult && (
          <div className="col-12">
            <ActivityDetail
              activity={selectedActivity}
              people={searchParams.people}
              date={searchParams.date}
              onBook={handleBookActivity}
              onBack={handleBackFromRelated}
              onSelectRelated={handleSelectRelatedActivity}
            />
          </div>
        )}

        {/* Booking Confirmation */}
        {bookingResult && (
          <div className="col-12">
            <BookingConfirmation
              booking={bookingResult}
              onNewSearch={handleNewSearch}
            />
          </div>
        )}
      </main>
    </div>
  );
};