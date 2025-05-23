import React, { useState } from 'react';

function SearchForm({ onSearch }) {
  const [date, setDate] = useState('');
  const [people, setPeople] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(date, people);
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <label htmlFor="dateInput" className="form-label">
          Fecha
        </label>
        <input
          type="date"
          id="dateInput"
          className="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="peopleInput" className="form-label">
          Número de personas
        </label>
        <input
          type="number"
          id="peopleInput"
          className="form-control"
          min="1"
          value={people}
          onChange={(e) => setPeople(parseInt(e.target.value))}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Buscar
      </button>
    </form>
  );
}

export default SearchForm;
