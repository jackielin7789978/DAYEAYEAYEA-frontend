import { useState, useCallback } from 'react'
import { FullModal } from '../components/Modal'


const useModal = (initialContent = '') => {
  const [isModal, setIsModal] = useState(false)
  const [value, setValue] = useState(initialContent)
  const handleModalOpen = useCallback((content) => {
    if (content) setValue(content)
    setIsModal(true)
  }, [])
  const handleModalClose = useCallback(() => {
    setValue(initialContent)
    setIsModal(false)
  }, [initialContent])

  const Modal = ({ buttonOne, buttonTwo }) => {
    return (
      <FullModal
        open={isModal}
        content={value}
        onClose={handleModalClose}
        buttonOne={buttonOne}
        buttonTwo={buttonTwo}
      />
    )
  }

  return { isModal, setIsModal, handleModalOpen, handleModalClose, Modal }
}

export default useModal