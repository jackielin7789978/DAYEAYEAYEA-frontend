import { useState } from 'react'
import { FullModal } from '../Modal'


const MemberModal = ({ isModalOpen, handleModalClose }) => {
  const [isModal, serIsModal] = useState(false)
  return (
    <FullModal
      open={isModalOpen}
      content='已更新會員資訊 ! '
      onClose={handleModalClose}
    />
  )
}

export default MemberModal