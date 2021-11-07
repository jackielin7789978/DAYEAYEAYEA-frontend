import { useState, useCallback } from 'react'
import { FullModal } from '../components/Modal'


const useModal = () => {
  const [isModal, setIsModal] = useState(false)
  const handleModalOpen = useCallback(() => setIsModal(true), [])
  const handleModalClose = useCallback(() => setIsModal(false), [])

  const Modal = ({ content, buttonOne, buttonTwo }) => {
    return (
      <FullModal
        open={isModal}
        content={content}
        onClose={handleModalClose}
        buttonOne={buttonOne}
        buttonTwo={buttonTwo}
      />
    )
  }

  return { isModal, setIsModal, handleModalOpen, handleModalClose, Modal }
}

export default useModal