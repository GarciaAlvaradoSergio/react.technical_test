import ActivityItem from './ActivityItem';

function ActivityList({ activities, onSelect, onBook, people, date }) {
  if (activities.length === 0) {
    return <p className="container text-muted">No se encontraron actividades para los criterios seleccionados.</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Actividades Disponibles</h2>
      <div className="row g-4">
        {activities.map((activity) => (
          <div key={activity.id} className="col-md-6 col-lg-4">
            <ActivityItem
              activity={activity}
              people={people}
              onSelect={onSelect}
              onBook={onBook}
              date={date}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityList;
