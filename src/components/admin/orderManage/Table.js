import { TableItemContainer, Container, Cell } from '../TableStyle'
import { GeneralBtn } from '../../Button'
import styled from 'styled-components'
import { formatPrice } from '../../../utils'
import { Link } from 'react-router-dom'
import { ITEMS_PER_PAGE } from '../../../constants/itemsPerPage'

const RestyledCell = styled(Cell)`
  width: 12%;
  padding: 0 4px;
`

function TableItem({ order }) {
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
            color='admin_grey'
            children={'訂單詳情'}
            buttonStyle={{ minWidth: '80px', width: '50%' }}
          />
        </Link>
      </RestyledCell>
    </Container>
  )
}

export default function Table({
  orders,
  searchedOrders,
  isViewingArchive,
  filter,
  offset
}) {
  return orders ? (
    <TableItemContainer>
      {searchedOrders
        ? searchedOrders
            .sort((a, b) => b.id - a.id)
            .map((order) => <TableItem key={order.id} order={order} />)
        : isViewingArchive
        ? orders
            .sort((a, b) => b.id - a.id)
            .slice(offset, offset + ITEMS_PER_PAGE)
            .map((order) => <TableItem key={order.id} order={order} />)
        : orders
            .filter((order) =>
              filter === '所有訂單' ? order : order.status === filter
            )
            .sort((a, b) => b.id - a.id)
            .slice(offset, offset + ITEMS_PER_PAGE)
            .map((order) => <TableItem key={order.id} order={order} />)}
    </TableItemContainer>
  ) : (
    <></>
  )
}
