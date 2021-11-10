import styled from 'styled-components'
import { GeneralBtn } from '../../../components/Button'

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
  handleArchive
}) {
  return (
    <Wrapper>
      {orderDetail?.status === '處理中' && (
        <>
          <GeneralBtn
            onClick={() => handleOrderStatus('ship')}
            color='admin_blue'
            children='出貨'
          />
          <GeneralBtn
            onClick={() => handleOrderStatus('check cancel')}
            color='admin_grey'
            children='取消訂單'
          />
        </>
      )}
      {orderDetail?.status === '已出貨' && (
        <GeneralBtn
          onClick={() => handleOrderStatus('complete')}
          color='admin_grey'
          children='完成訂單'
        />
      )}
      {orderDetail?.status === '已完成' && !orderDetail?.isDeleted && (
        <GeneralBtn
          onClick={() => handleArchive(orderDetail?.ticketNo)}
          color='admin_grey'
          children='封存訂單'
        />
      )}
      {orderDetail?.status === '已取消' && !orderDetail?.isDeleted && (
        <GeneralBtn
          onClick={() => handleArchive(orderDetail?.ticketNo)}
          color='admin_grey'
          children='封存訂單'
        />
      )}
    </Wrapper>
  )
}
