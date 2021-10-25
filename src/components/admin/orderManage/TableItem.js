import { Container, Cell } from '../TableStyle'
import { GeneralBtn } from '../../Button'
import styled from 'styled-components'

const RestyledCell = styled(Cell)`
  width: 12%;
  padding: 0 4px;
`

export default function TableItem({ order, handleOrderDetail }) {
  const calTotalPrice = (order) => {
    let format = 'NT$ X'
    let total = 80
    order.Order_items.forEach((item) => {
      total += item.Product.price
    })
    return format.replace('X', total)
  }
  return (
    <Container>
      <RestyledCell>{order.status}</RestyledCell>
      <RestyledCell style={{ width: '28%' }}>{order.ticketNo}</RestyledCell>
      <RestyledCell style={{ width: '36%' }}>{order.orderEmail}</RestyledCell>
      <RestyledCell>{calTotalPrice(order)}</RestyledCell>
      <RestyledCell>
        <GeneralBtn
          onClick={() => {
            handleOrderDetail(order.ticketNo)
          }}
          color='admin_grey'
          children={'訂單詳情'}
          buttonStyle={{ minWidth: '80px', width: '50%' }}
        />
      </RestyledCell>
    </Container>
  )
}
