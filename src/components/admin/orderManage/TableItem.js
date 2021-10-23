import { Container, Cell } from '../TableStyle'
import { GeneralBtn } from '../../Button'
import { ADMIN_COLOR } from '../../../constants/style'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Btn = styled(Link)`
  button {
    min-width: 80px;
    width: 50%;
    background: ${ADMIN_COLOR.Btn_grey};
    &:hover {
      background: ${ADMIN_COLOR.Btn_grey_hover};
    }
  }
`
const RestyledCell = styled(Cell)`
  width: 12%;
  word-wrap: break-word;
  padding: 0 4px;
`

export default function TableItem({ order }) {
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
      <RestyledCell style={{ width: '26%' }}>{order.ticketNo}</RestyledCell>
      <RestyledCell style={{ width: '38%' }}>{order.orderEmail}</RestyledCell>
      <RestyledCell>{calTotalPrice(order)}</RestyledCell>
      <RestyledCell>
        <Btn to={`/admin/orders/${order.ticketNo}`}>
          <GeneralBtn children={'訂單詳情'} />
        </Btn>
      </RestyledCell>
    </Container>
  )
}
