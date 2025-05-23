import React from 'react';
import PropTypes from 'prop-types';

export const BookingConfirmation = ({ booking, onReturnHome }) => {
  // Función simple para formatear fechas
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div style={{
      maxWidth: '500px',
      margin: '2rem auto',
      padding: '2rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      textAlign: 'center'
    }}>
      <div style={{
        fontSize: '3rem',
        color: 'green',
        marginBottom: '1rem'
      }}>✓</div>
      
      <h2>Your booking is confirmed!</h2>
      
      <div style={{
        textAlign: 'left',
        margin: '2rem 0',
        padding: '1rem',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px'
      }}>
        <p><strong>Booking ID:</strong> #{booking.id}</p>
        <p><strong>Activity Date:</strong> {formatDate(booking.activity_date)}</p>
        <p><strong>Participants:</strong> {booking.people}</p>
        <p><strong>Booked on:</strong> {formatDate(booking.booking_date)}</p>
        <p style={{
          marginTop: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid #ddd',
          fontSize: '1.2rem'
        }}>
          <strong>Total Paid:</strong> ${booking.booking_price.toFixed(2)}
        </p>
      </div>
      
      <button 
        onClick={onReturnHome}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#0066cc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Back to Home
      </button>
    </div>
  );
}
