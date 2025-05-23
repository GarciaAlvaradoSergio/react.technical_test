import PropTypes from 'prop-types'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import Button from '../components/ui/Button'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

const BookingConfirmation = ({ booking, onReturnHome }) => {
  if (!booking) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-4">No se encontró información de la reserva</h2>
        <Button variant="primary" onClick={onReturnHome}>
          Volver al inicio
        </Button>
      </div>
    )
  }

  // Formatear fechas
  const formattedBookingDate = format(new Date(booking.booking_date), "PPPPp", { locale: es })
  const formattedActivityDate = format(new Date(booking.activity_date), "PPPP", { locale: es })

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-white bg-opacity-20 mb-4">
          <CheckCircleIcon className="h-8 w-8 text-white" aria-hidden="true" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">¡Reserva confirmada!</h2>
        <p className="text-green-100">Recibirás un correo electrónico con los detalles de tu reserva</p>
      </div>

      <div className="p-6">
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Detalles de tu reserva</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Número de reserva</h4>
              <p className="font-mono font-bold text-gray-800">{booking.id}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Fecha de la reserva</h4>
              <p className="font-medium">{formattedBookingDate}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border-t border-b border-gray-200 py-4">
              <h4 className="font-medium text-gray-800 mb-2">Actividad reservada</h4>
              <p className="text-gray-600">{booking.activity.title}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Fecha de la actividad</h4>
                <p className="font-medium">{formattedActivityDate}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Número de personas</h4>
                <p className="font-medium">{booking.people}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Precio total</h4>
              <p className="text-2xl font-bold text-green-600">${booking.booking_price.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <Button variant="outline" onClick={onReturnHome}>
            Volver al inicio
          </Button>
          <Button variant="primary" onClick={() => window.print()}>
            Imprimir confirmación
          </Button>
        </div>
      </div>
    </div>
  )
}

BookingConfirmation.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.number.isRequired,
    booking_date: PropTypes.string.isRequired,
    activity_date: PropTypes.string.isRequired,
    people: PropTypes.number.isRequired,
    booking_price: PropTypes.number.isRequired,
    activity: PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired
  }),
  onReturnHome: PropTypes.func.isRequired
}

export default BookingConfirmation