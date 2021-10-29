import { FullModal } from '../../components/Modal'

export function AddCartModal({ isModalOpen, handleModalClose }) {
  return (
    <FullModal
      open={isModalOpen}
      content='已成功加入購物車 ! '
      onClose={handleModalClose}
    />
  )
}

export function SoldOutCartModal({ isModalOpen, handleModalClose }) {
  return (
    <FullModal
      open={isModalOpen}
      content='已購買到達庫存上限'
      onClose={handleModalClose}
    />
  )
}
