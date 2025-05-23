import PropTypes from 'prop-types'
import Button from '../components/ui/Button'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import ActivityCard from '../components/ui/Card'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import Alert from '../components/ui/Alert'

const ActivityDetail = ({ 
  activity, 
  people, 
  date,
  onBook,
  loading,
  error
}) => {
  if (!activity) {
    return (
      <Alert type="info" message="Selecciona una actividad para ver los detalles" />
    )
  }

  if (loading) {
    return <LoadingSpinner size="large" />
  }

  if (error) {
    return <Alert type="error" message={error} />
  }

  // Calcular precio total
  const totalPrice = activity.price_per_person * people

  // Formatear fechas
  const formattedDate = format(new Date(date), "EEEE d 'de' MMMM 'de' yyyy", { locale: es })
  const availableFrom = format(new Date(activity.start_date), "d 'de' MMMM 'de' yyyy", { locale: es })
  const availableTo = format(new Date(activity.end_date), "d 'de' MMMM 'de' yyyy", { locale: es })

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Imagen de la actividad (puedes reemplazar con una real) */}
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">Imagen de la actividad</span>
      </div>

      <div className="p-6">
        {/* Título y popularidad */}
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{activity.title}</h2>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Popularidad: {activity.popularity}
          </span>
        </div>

        {/* Descripción */}
        <p className="text-gray-600 mb-6">{activity.description}</p>

        {/* Detalles de fecha y disponibilidad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Fecha seleccionada</h3>
            <p className="font-medium">{formattedDate}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Disponibilidad</h3>
            <p className="font-medium">Del {availableFrom} al {availableTo}</p>
          </div>
        </div>

        {/* Detalles de precio y personas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Número de personas</h3>
            <p className="font-medium">{people} {people === 1 ? 'persona' : 'personas'}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Precio total</h3>
            <p className="text-2xl font-bold text-blue-600">${totalPrice.toFixed(2)}</p>
            <p className="text-xs text-gray-500">({activity.price_per_person.toFixed(2)} por persona)</p>
          </div>
        </div>

        {/* Actividades relacionadas */}
        {activity.related_activities && activity.related_activities.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Actividades relacionadas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activity.related_activities.map(related => (
                <ActivityCard
                  key={related.id}
                  activity={related}
                  people={people}
                  date={date}
                  onBook={onBook}
                  onViewDetails={() => {}} // Aquí podrías manejar la navegación
                />
              ))}
            </div>
          </div>
        )}

        {/* Botón de reserva */}
        <div className="flex justify-end">
          <Button
            variant="primary"
            size="large"
            onClick={() => onBook(activity.id, people, date)}
            disabled={loading}
            className="w-full md:w-auto"
          >
            {loading ? 'Reservando...' : 'Reservar ahora'}
          </Button>
        </div>
      </div>
    </div>
  )
}

ActivityDetail.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    start_date: PropTypes.string.isRequired,
    end_date: PropTypes.string.isRequired,
    price_per_person: PropTypes.number.isRequired,
    popularity: PropTypes.number,
    related_activities: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price_per_person: PropTypes.number.isRequired
      })
    )
  }),
  people: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  onBook: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string
}

export default ActivityDetail