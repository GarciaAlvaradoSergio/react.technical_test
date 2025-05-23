import { ActivityItem } from "./ActivityItem";

export const ActivityList = ({
  activities,
  onSelect,
  onBook,
  people,
  date,
}) => {
  if (!activities || activities.length === 0) {
    return <p>No se encontró ninguna actividad</p>;
  }

  return (
    <>
      <h2>Actividades disponibles</h2>
      <ul>
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
      </ul>
    </>
  );
};
