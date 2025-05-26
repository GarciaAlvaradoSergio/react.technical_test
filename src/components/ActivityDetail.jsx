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

  const getImageUrl = () => {
    return activity.image_path
      ? `/storage/${activity.image_path}` // Ruta relativa desde el dominio
      : getDefaultImage();
  };

  return (
    <div className="container py-3 py-md-4">
      <button
        onClick={onBack}
        className="btn btn-outline-primary mb-3 mb-md-4 d-flex align-items-center gap-2"
        aria-label="Volver atrás"
      >
        <i className="bi bi-arrow-left"></i>
        Regresar
      </button>

      <div className="row g-3 g-md-4">
        {/* Columna principal */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-lg overflow-hidden">
            {/* Imagen principal */}
            <div className="ratio ratio-16x9 bg-light">
              <img
                src={getImageUrl()}
                alt={activity.title}
                className="img-fluid object-fit-cover"
                onError={(e) => {
                  e.target.src = getDefaultImage();
                }}
              />
            </div>

            {/* Contenido */}
            <div className="card-body p-3 p-md-4 p-lg-5">
              {/* Encabezado con título, precio y fecha */}
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-4">
                <div>
                  <h1 className="h2 fw-bold text-primary mb-2">
                    {activity.title}
                  </h1>
                  <div className="d-flex flex-wrap gap-2">
                    <span className="badge bg-primary bg-opacity-10 text-primary fs-6 px-3 py-2">
                      <i className="bi bi-currency-dollar me-1"></i>$
                      {totalPrice}
                      <span className="text-muted ms-1">
                        para {people} {people === 1 ? "persona" : "personas"}
                      </span>
                    </span>
                  </div>
                </div>
                <span className="badge bg-success bg-opacity-10 text-success fs-6 px-3 py-2">
                  <i className="bi bi-calendar-check me-1"></i>
                  {formattedDate}
                </span>
              </div>

              {/* Descripción */}
              <section className="mb-4" aria-labelledby="description-heading">
                <h2
                  id="description-heading"
                  className="h4 fw-bold text-primary mb-3"
                >
                  <i className="bi bi-info-circle-fill me-2"></i>
                  Descripción
                </h2>
                <p className="text-muted mb-0">{activity.description}</p>
              </section>

              {/* Botón de reserva */}
              <div className="d-grid mt-4">
                <button
                  onClick={() => onBook(activity.id, people, date)}
                  className="btn btn-primary btn-lg py-2 py-md-3 shadow"
                  aria-label={`Confirmar reserva por $${totalPrice}`}
                >
                  <i className="bi bi-check-circle-fill me-2"></i>
                  Confirmar reserva por ${totalPrice}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Columna lateral - Actividades relacionadas */}
        <div className="col-lg-4">
          {activity.recommended_activities?.length > 0 && (
            <div className="card border-0 shadow-sm sticky-md-top mb-3 mb-lg-0">
              <div className="card-header bg-white border-0 py-3">
                <h2 className="h5 m-0 text-secondary">
                  <i className="bi bi-stars me-2"></i>
                  Actividades relacionadas
                </h2>
              </div>
              <div className="card-body p-0">
                <div className="list-group list-group-flush">
                  {activity.recommended_activities.map((related) => (
                    <button
                      key={related.id}
                      onClick={() => handleRelatedActivityClick(related.id)}
                      className="list-group-item list-group-item-action border-0 py-3 px-3 px-md-4 d-flex justify-content-between align-items-center"
                      aria-label={`Ver actividad ${related.title}`}
                    >
                      <div className="d-flex align-items-center text-start">
                        <div className="me-3 text-primary">
                          <i className="bi bi-activity fs-4"></i>
                        </div>
                        <span className="fw-medium">{related.title}</span>
                      </div>
                      <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-1">
                        Ver
                      </span>
                    </button>
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
