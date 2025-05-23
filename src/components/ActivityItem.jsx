import PropTypes from "prop-types";

export const ActivityItem = ({ activity, people, date, onSelect, onBook }) => {
  const price = Number(activity.price_per_person);
  const totalPrice = (price * people).toFixed(2);

  return (
    <li className="activity-item">
      <div className="activity-info">
        <h2>{activity.title}</h2>
        <p>Precio por persona: ${price.toFixed(2)}</p>
        <p>
          Total por {people} {people === 1 ? "person" : "people"}: ${totalPrice}
        </p>
        <div className="activity-actions">
          <button onClick={() => onSelect(activity.id)}>Detalle</button>
          <button onClick={() => onBook(activity.id, people, date)}>
            Comprar
          </button>
        </div>
      </div>
    </li>
  );
};

ActivityItem.protoTypes = {
  activity: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    precie_per_person: PropTypes.number.isRequired,
  }).isRequired,
  people: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  onBook: PropTypes.func.isRequired,
};
