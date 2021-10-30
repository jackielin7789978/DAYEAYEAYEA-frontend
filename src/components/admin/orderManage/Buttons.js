import styled from 'styled-components'
import { GeneralBtn } from '../../../components/Button'
import { FullModal } from '../../Modal'

const Wrapper = styled.div`
  position: absolute;
  top: 22%;
  right: 40px;
  display: flex;
  button {
    padding: 0 20px;
    margin: 0 8px;
    transition: 0.2s ease;
  }
`

export default function Buttons({
  orderDetail,
  handleOrderStatus,
  handleArchive,
  isModalOpen,
  setIsModalOpen
}) {
  return (
    <Wrapper>
      {orderDetail.status === '處理中' && (
        <>
          <GeneralBtn
            onClick={() => handleOrderStatus('ship')}
            color='admin_blue'
            children='出貨'
          />
          <GeneralBtn
            onClick={() => handleOrderStatus('cancel')}
            color='admin_grey'
            children='取消訂單'
          />
        </>
      )}
      {orderDetail.status === '已出貨' && (
        <GeneralBtn
          onClick={() => handleOrderStatus('complete')}
          color='admin_grey'
          children='完成訂單'
        />
      )}
      {orderDetail.status === '已完成' && !orderDetail.isDeleted && (
        <GeneralBtn
          onClick={() => handleArchive(orderDetail.ticketNo)}
          color='admin_grey'
          children='封存訂單'
        />
      )}
      {orderDetail.status === '已取消' && !orderDetail.isDeleted && (
        <GeneralBtn
          onClick={() => handleArchive(orderDetail.ticketNo)}
          color='admin_grey'
          children='封存訂單'
        />
      )}
      <FullModal
        open={isModalOpen}
        content='確定要取消這筆訂單嗎？'
        buttonOne={
          <GeneralBtn
            onClick={() => handleOrderStatus('cancel')}
            color='admin_blue'
            children='確定'
          />
        }
        buttonTwo={
          <GeneralBtn
            onClick={() => setIsModalOpen(false)}
            color='admin_grey'
            children='返回'
          />
        }
        onClose={() => setIsModalOpen(false)}
        position={{ left: '56%' }}
      />
    </Wrapper>
  )
}
