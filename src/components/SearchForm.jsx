import { useState } from "react";

export const SearchForm = ({ onSearch }) => {
  const [date, setDate] = useState("");
  const [people, setPeople] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date) {
      alert("Por favor selecciona un fecha");
      return;
    }
    onSearch(date, people);
  };
  return (
    <>
      <div className="container my-4">
        <h3>Encuentra actividades disponibles</h3>
        <form onSubmit={handleSubmit} className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="date" className="form-label">
              Fecha de activides
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="people" className="form-label">Numero de personas</label>
            <input
              type="number"
              id="people"
              min="1"
              value={people}
              onChange={(e) => setPeople(Math.max(1, parseInt(e.target.value)))}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <button type="submit" className="btn btn-primary">
              Buscar actividad
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
