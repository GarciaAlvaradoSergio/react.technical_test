export const ActivityDetail = ({
  activity,
  people,
  date,
  onBook,
  onBack,
  onSelectRelated,
}) => {
  const totalPrice = (activity.price_per_person * people).toFixed(2);
  const formattedDate = new Date(date).toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleRelatedActivityClick = (relatedActivityId) => {
    onSelectRelated(relatedActivityId);
  };


  return (
    <div className="container">
      <button onClick={onBack} className="btn btn-secondary mb-3">
        &larr; Regresar
      </button>

      <div className="row">
        <div className="col-md-8">
          <div className="card shadow-sm p-4">
            <div className="mb-4">
              <h2>{activity.title}</h2>
              <div className="badge bg-primary fs-6">
                ${totalPrice}{" "}
                <span>
                  para {people} {people === 1 ? "persona" : "personas"}
                </span>
              </div>
            </div>

            <div className="detail-content">
              <div className="detail-section">
                <h3>Descripción</h3>
                <p>{activity.description}</p>
              </div>

              <div className="detail-section">
                <h3>Fecha de la actividad</h3>
                <p>{formattedDate}</p>
              </div>
            </div>

            <div className="detail-actions">
              <button
                onClick={() => onBook(activity.id, people, date)}
                className="btn btn-success"
              >
                Confirmar reserva por ${totalPrice}
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4 mt-3">
          {activity.recommended_activities &&
            activity.recommended_activities.length > 0 && (
              <div className="card shadow-sm p-3">
                <h3 className="text-secondary">Actividades relacionadas</h3>
                <ul className="list-group">
                  {activity.recommended_activities.map((related) => (
                    <li
                      key={related.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {related.title}
                      <button
                        onClick={() => handleRelatedActivityClick(related.id)}
                        className="badge text-bg-primary border-0"
                      >
                        Ver detalle
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
