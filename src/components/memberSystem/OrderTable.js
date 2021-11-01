import { useHistory } from 'react-router-dom'
import { Table, Button } from '../Table'


const OrderTable = ({ orders }) => {
  const history = useHistory()
  return (
    <Table col={4}>
      <thead>
        <tr>
          <th>訂單狀態</th>
          <th>訂單編號</th>
          <th>訂單金額</th>
          <th>管理</th>
        </tr>
      </thead>
      <tbody>
        { orders.map((order) => (
            <tr key={order.ticketNo + new Date().getMilliseconds}>
              <td>{ order.status }</td>
              <td>{ order.ticketNo }</td>
              <td>{ order.subTotal }</td>
              <td><Button onClick={() => history.push('/member/orders/' + order.ticketNo)}>查找</Button></td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  )
}

export default OrderTable
