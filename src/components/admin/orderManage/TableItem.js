import { Container, Cell } from '../TableStyle'
import { GeneralBtn } from '../../Button'
import styled from 'styled-components'
import { formatPrice } from '../../../utils'
import { Link } from 'react-router-dom'

const RestyledCell = styled(Cell)`
  width: 12%;
  padding: 0 4px;
`

export default function TableItem({ order, handleOrderDetail }) {
  return (
    <Container>
      <RestyledCell>{order.status}</RestyledCell>
      <RestyledCell style={{ width: '28%' }}>{order.ticketNo}</RestyledCell>
      <RestyledCell style={{ width: '36%' }}>{order.orderEmail}</RestyledCell>
      <RestyledCell>
        {/* 暫時擋掉沒有 subTotal 的舊訂單 */}
        {order.subTotal && formatPrice(order.subTotal)}
      </RestyledCell>
      <RestyledCell>
        <Link to={`/admin/orders/${order.ticketNo}`}>
          <GeneralBtn
            onClick={() => {
              handleOrderDetail(order.ticketNo)
            }}
            color='admin_grey'
            children={'訂單詳情'}
            buttonStyle={{ minWidth: '80px', width: '50%' }}
          />
        </Link>
      </RestyledCell>
    </Container>
  )
}
