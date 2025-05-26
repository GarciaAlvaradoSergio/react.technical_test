import PropTypes from "prop-types";

export const ActivityItem = ({ activity, people, date, onSelect, onBook }) => {
  const price = Number(activity.price_per_person);
  const totalPrice = (price * people).toFixed(2);


  return (
    <li className="list-group-item d-flex justify-content-between align-items-start">
      <div className="ms-2 me-auto">
        <div className="fw-bold">{activity.title}</div>
        Total por {people} {people === 1 ? "persona" : "personas"}: $
        {totalPrice}
        <div className="mt-2">
          <button
            className="btn btn-outline-secondary btn-sm me-2"
            onClick={() => onSelect(activity.id)}
          >
            Detalle
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onBook(activity.id, people, date)}
          >
            Comprar
          </button>
        </div>
      </div>
      <span className="badge text-bg-primary rounded-pill">
        ${price.toFixed(2)}
      </span>
    </li>
  );
};

ActivityItem.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price_per_person: PropTypes.number.isRequired,
  }).isRequired,
  people: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  onBook: PropTypes.func.isRequired,
};
