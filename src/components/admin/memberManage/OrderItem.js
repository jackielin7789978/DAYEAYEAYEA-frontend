import { Container, Cell } from '../TableStyle'
import { GeneralBtn } from '../../Button'
import styled from 'styled-components'
import { formatPrice } from '../../../utils'
import { useHistory } from 'react-router'
const RestyledCell = styled(Cell)`
  width: 12%;
  padding: 0 4px;
`

export default function TableItem({ order }) {
  const location = useHistory()
  return (
    <Container>
      <RestyledCell>{order.status}</RestyledCell>
      <RestyledCell style={{ width: '25%' }}>{order.ticketNo}</RestyledCell>
      <RestyledCell style={{ width: '39%' }}>{order.orderEmail}</RestyledCell>
      <RestyledCell>
        {formatPrice(order.subTotal ? order.subTotal : 0)}
      </RestyledCell>
      <RestyledCell>
        <GeneralBtn
          onClick={() => location.push(`/admin/orders/${order.ticketNo}`)}
          color='admin_grey'
          children={'訂單詳情'}
          buttonStyle={{ minWidth: '80px', width: '50%' }}
        />
      </RestyledCell>
    </Container>
  )
}
