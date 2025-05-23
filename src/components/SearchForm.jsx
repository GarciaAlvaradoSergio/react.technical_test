import React, { useState } from "react";

export const SearchForm = ({ onSearch }) => {
  const [date, setDate] = useState("");
  const [people, setPeople] = useState("1");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(date, parseInt(people, 10));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="date">Fecha:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
          required
        />
      </div>
      <div>
        <label htmlFor="people">Personas:</label>
        <input
          type="number"
          min="1"
          value={people}
          onChange={(e) => setPeople(e.target.value)}
          required
        />
      </div>
      <button type="submit">Buscar...</button>
    </form>
  );
};
