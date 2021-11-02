import { FullModal } from '../../Modal'

export function AdminDeleteModal({ open, onClose, buttonOne, buttonTwo }) {
  return (
    <FullModal
      open={open}
      content='確定要刪除嗎？'
      onClose={onClose}
      buttonOne={buttonOne}
      buttonTwo={buttonTwo}
    />
  )
}

export function PermissionDeniedModal({ open, onClose }) {
  return (
    <FullModal open={open} content='此帳號沒有相關權限' onClose={onClose} />
  )
}
