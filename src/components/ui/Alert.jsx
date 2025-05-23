import PropTypes from 'prop-types'
import { XMarkIcon } from '@heroicons/react/24/outline'

const Alert = ({ 
  message, 
  type = 'info', 
  onClose,
  className = ''
}) => {
  const alertStyles = {
    info: 'bg-blue-50 text-blue-800',
    success: 'bg-green-50 text-green-800',
    warning: 'bg-yellow-50 text-yellow-800',
    error: 'bg-red-50 text-red-800'
  }

  return (
    <div className={`rounded-md p-4 mb-4 ${alertStyles[type]} ${className}`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {type === 'info' && (
            <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
          )}
          {type === 'success' && (
            <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
          )}
          {type === 'warning' && (
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
          )}
          {type === 'error' && (
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          )}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="ml-auto -mx-1.5 -my-1.5 rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  )
}

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  onClose: PropTypes.func,
  className: PropTypes.string
}

export default Alert