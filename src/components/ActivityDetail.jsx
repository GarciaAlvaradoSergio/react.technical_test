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

  // Función para obtener imagen por defecto
  const getDefaultImage = () => {
    // Opción 1: Imagen aleatoria de un servicio
    //return `https://picsum.photos/600/800?random=${Math.floor(Math.random() * 1000)}`;

    // Opción 2: Imagen local por defecto (debe estar en la carpeta public)
    return "/images/default.jpg";
  };

  return (
    <div className="container py-4">
      <button
        onClick={onBack}
        className="btn btn-outline-primary mb-4 d-flex align-items-center gap-2"
      >
        <i className="bi bi-arrow-left"></i>
        Regresar
      </button>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-lg overflow-hidden transition-all hover:shadow-xl">
            <div className="card-body p-0">
              <div className="mb-4 rounded-3 overflow-hidden shadow-sm">
                <img
                  src={activity.image_url || getDefaultImage()}
                  alt={activity.title}
                  className="img-fluid w-100 object-cover"
                  style={{ height: "400px" }}
                  onError={(e) => {
                    e.target.src = getDefaultImage();
                  }}
                />
              </div>
              <div className="p-5">
                <div className="d-flex justify-content-between align-items-start mb-4">
                  <div>
                    <h2 className="fw-bold text-gradient text-primary mb-2">
                      {activity.title}
                    </h2>
                    <span className="badge bg-primary bg-opacity-10 text-primary fs-6 px-3 py-2">
                      <i className="bi bi-currency-dollar me-1"></i>$
                      {totalPrice}
                      <span className="text-muted ms-1">
                        para {people} {people === 1 ? "persona" : "personas"}
                      </span>
                    </span>
                  </div>
                  <span className="badge bg-success bg-opacity-10 text-success fs-6 px-3 py-2">
                    <i className="bi bi-calendar-check me-1"></i>
                    {formattedDate}
                  </span>
                </div>

                <div className="mb-4">
                  <h3 className="fw-bold text-primary mb-3">
                    <i className="bi bi-info-circle-fill me-2"></i>
                    Descripción
                  </h3>
                  <p className="lead text-muted">{activity.description}</p>
                </div>

                <div className="d-grid">
                  <button
                    onClick={() => onBook(activity.id, people, date)}
                    className="btn btn-primary btn-lg  py-3 shadow"
                  >
                    <i className="bi bi-check-circle-fill me-2"></i>
                    Confirmar reserva por ${totalPrice}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          {activity.recommended_activities?.length > 0 && (
            <div
              className="card border-0 shadow-sm sticky-top"
              style={{ top: "20px" }}
            >
              <div className="card-header bg-white border-0 py-3">
                <h3 className="m-0 text-secondary">
                  <i className="bi bi-stars me-2"></i>
                  Actividades relacionadas
                </h3>
              </div>
              <div className="card-body p-0">
                <div className="list-group list-group-flush">
                  {activity.recommended_activities.map((related) => (
                    <div
                      key={related.id}
                      className="list-group-item list-group-item-action border-0 py-3 px-4 d-flex justify-content-between align-items-center transition-all hover-bg-light"
                    >
                      <div className="d-flex align-items-center">
                        <div className="me-3">
                          <i className="bi bi-activity text-primary fs-4"></i>
                        </div>
                        <span className="fw-medium">{related.title}</span>
                      </div>
                      <button
                        onClick={() => handleRelatedActivityClick(related.id)}
                        className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1"
                      >
                        Ver
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
