import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, X, Info } from 'lucide-react'

export interface ModalProps {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message?: string
  duration?: number
  isOpen: boolean
  onClose: (id: string) => void
}

const Modal = ({ id, type, title, message, duration = 5000, isOpen, onClose }: ModalProps) => {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose(id)
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [id, duration, onClose, isOpen])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case 'error':
        return <AlertCircle className="h-6 w-6 text-red-500" />
      case 'warning':
        return <AlertCircle className="h-6 w-6 text-yellow-500" />
      case 'info':
        return <Info className="h-6 w-6 text-blue-500" />
      default:
        return <Info className="h-6 w-6 text-gray-500" />
    }
  }

  const getColors = () => {
    switch (type) {
      case 'success':
        return 'border-green-200'
      case 'error':
        return 'border-red-200'
      case 'warning':
        return 'border-yellow-200'
      case 'info':
        return 'border-blue-200'
      default:
        return 'border-gray-200'
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => onClose(id)}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -50 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className={`bg-white rounded-lg shadow-xl border-2 ${getColors()} max-w-md w-full mx-4`}>
              <div className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {getIcon()}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {title}
                    </h3>
                    {message && (
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {message}
                      </p>
                    )}
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <button
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      onClick={() => onClose(id)}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                {/* Auto-close progress bar */}
                {duration > 0 && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <motion.div
                        className="h-1 rounded-full bg-gray-400"
                        initial={{ width: "100%" }}
                        animate={{ width: "0%" }}
                        transition={{ duration: duration / 1000, ease: "linear" }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Modal