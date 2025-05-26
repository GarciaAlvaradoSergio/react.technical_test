import React from 'react';
import PropTypes from 'prop-types';

export const BookingConfirmation = ({ booking, onNewSearch }) => {
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
      margin: '1rem auto',
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
      
      <h2 className='text-success' >¡Su reserva está confirmada!</h2>
      
      <div style={{
        textAlign: 'left',
        margin: '2rem 0',
        padding: '1rem',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px'
      }}>
        <p><strong>Reserva ID:</strong> #{booking.id}</p>
        <p><strong>Fecha de la actividad:</strong> {formatDate(booking.activity_date)}</p>
        <p><strong>Participantes:</strong> {booking.people}</p>
        <p><strong>Reservado el:</strong> {formatDate(booking.booking_date)}</p>
        <p style={{
          marginTop: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid #ddd',
          fontSize: '1.2rem'
        }}>
          <strong>Total a pagar:</strong> ${Number(booking.booking_price).toFixed(2)}
        </p>
      </div>
      
      <button 
        onClick={onNewSearch}
        className='btn btn-primary'
      >
        Regresar a inicio
      </button>
    </div>
  );
}
