import { createContext, useContext, useState, ReactNode } from 'react'
import Modal from '../components/Modal'

interface ModalData {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message?: string
  duration?: number
}

interface ToastContextType {
  showModal: (modal: Omit<ModalData, 'id'>) => void
  showSuccess: (title: string, message?: string) => void
  showError: (title: string, message?: string) => void
  showInfo: (title: string, message?: string) => void
  showWarning: (title: string, message?: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

interface ToastProviderProps {
  children: ReactNode
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [modal, setModal] = useState<ModalData | null>(null)

  const showModal = (modalData: Omit<ModalData, 'id'>) => {
    const id = Date.now().toString()
    const newModal = { ...modalData, id }
    setModal(newModal)
  }

  const showSuccess = (title: string, message?: string) => {
    showModal({ type: 'success', title, message })
  }

  const showError = (title: string, message?: string) => {
    showModal({ type: 'error', title, message })
  }

  const showInfo = (title: string, message?: string) => {
    showModal({ type: 'info', title, message })
  }

  const showWarning = (title: string, message?: string) => {
    showModal({ type: 'warning', title, message })
  }

  const closeModal = () => {
    setModal(null)
  }

  const value = {
    showModal,
    showSuccess,
    showError,
    showInfo,
    showWarning
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      
      {/* Modal */}
      {modal && (
        <Modal
          {...modal}
          isOpen={!!modal}
          onClose={closeModal}
        />
      )}
    </ToastContext.Provider>
  )
}