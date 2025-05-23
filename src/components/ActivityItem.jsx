import PropTypes from 'prop-types'
import Button from '../components/ui/Button'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

const ActivityItem = ({ 
  activity, 
  people, 
  date,
  onSelect,
  onBook 
}) => {
  // Calcular precio total
  const totalPrice = (activity.price_per_person * people).toFixed(2)
  const pricePerPerson = activity.price_per_person.toFixed(2)

  // Formatear fecha
  const formattedDate = format(new Date(date), "EEEE d 'de' MMMM", { locale: es })

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="p-4">
        {/* Encabezado con título y popularidad */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {activity.title}
          </h3>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {activity.popularity} ★
          </span>
        </div>

        {/* Detalles de precio */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-2xl font-bold text-blue-600">${totalPrice}</p>
            <p className="text-xs text-gray-500">
              ${pricePerPerson} por persona
            </p>
          </div>
        </div>

        {/* Información adicional */}
        <div className="text-sm text-gray-600 space-y-1 mb-4">
          <p className="flex items-center">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            {formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}
          </p>
          <p className="flex items-center">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            {people} {people === 1 ? 'persona' : 'personas'}
          </p>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="small"
            className="flex-1"
            onClick={() => onSelect(activity.id)}
          >
            Ver detalles
          </Button>
          <Button
            variant="primary"
            size="small"
            className="flex-1"
            onClick={() => onBook(activity.id, people, date)}
          >
            Reservar
          </Button>
        </div>
      </div>
    </div>
  )
}

ActivityItem.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price_per_person: PropTypes.number.isRequired,
    popularity: PropTypes.number
  }).isRequired,
  people: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  onBook: PropTypes.func.isRequired
}

export default ActivityItem