import { ActivityItem } from "./ActivityItem";

export const ActivityList = ({
  activities,
  onSelect,
  onBook,
  people,
  date,
}) => {
  if (!activities || activities.length === 0) {
    return (
      <>
        <div className="container">
          <div className="alert alert-info text-center mt-4">
            <p className="mb-0">No se a encontrado actividades.</p>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="container">
        <h5 className="mt-4 text-success">
          Actividades disponibles ({activities.length})
        </h5>
        <div className="container mb-5">
          {activities.map((activity) => (
              <ActivityItem
                key={activity.id}
                activity={activity}
                people={people}
                onSelect={onSelect}
                onBook={onBook}
                date={date}
              />
          ))}
        </div>
      </div>
    </>
  );
};
