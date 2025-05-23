import PropTypes from 'prop-types'
import Button from './Button'

const Card = ({
  title,
  description,
  image,
  price,
  rating,
  category,
  date,
  people,
  onAction,
  onSecondaryAction,
  actionLabel = 'Reservar',
  secondaryActionLabel = 'Ver detalles',
  variant = 'default',
  loading = false
}) => {
  // Estilos base para la tarjeta
  const baseStyles = 'rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg border border-gray-100'

  // Variantes de diseño
  const variants = {
    default: 'bg-white',
    featured: 'bg-white border-2 border-blue-500',
    compact: 'bg-white max-w-xs'
  }

  return (
    <div className={`${baseStyles} ${variants[variant]}`}>
      {/* Imagen de la tarjeta */}
      {image && (
        <div className="relative h-48 bg-gray-100 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {category && (
            <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
              {category}
            </span>
          )}
        </div>
      )}

      {/* Contenido de la tarjeta */}
      <div className="p-4">
        {/* Encabezado con título y rating */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {title}
          </h3>
          {rating && (
            <span className="flex items-center bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded ml-2">
              {rating.toFixed(1)} ★
            </span>
          )}
        </div>

        {/* Descripción (opcional) */}
        {description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {description}
          </p>
        )}

        {/* Información adicional */}
        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          {date && (
            <div className="flex items-center text-gray-600">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {date}
            </div>
          )}
          
          {people && (
            <div className="flex items-center text-gray-600">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              {people} {people === 1 ? 'persona' : 'personas'}
            </div>
          )}
        </div>

        {/* Precio y acciones */}
        <div className="flex items-center justify-between">
          {price && (
            <div>
              <p className="text-xl font-bold text-blue-600">${price.toFixed(2)}</p>
              {people && (
                <p className="text-xs text-gray-500">
                  ${(price / people).toFixed(2)} por persona
                </p>
              )}
            </div>
          )}

          <div className="flex space-x-2">
            {onSecondaryAction && (
              <Button
                variant="outline"
                size="small"
                onClick={onSecondaryAction}
                disabled={loading}
              >
                {secondaryActionLabel}
              </Button>
            )}
            
            {onAction && (
              <Button
                variant="primary"
                size="small"
                onClick={onAction}
                loading={loading}
                disabled={loading}
              >
                {actionLabel}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.number,
  category: PropTypes.string,
  date: PropTypes.string,
  people: PropTypes.number,
  onAction: PropTypes.func,
  onSecondaryAction: PropTypes.func,
  actionLabel: PropTypes.string,
  secondaryActionLabel: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'featured', 'compact']),
  loading: PropTypes.bool
}

export default Card