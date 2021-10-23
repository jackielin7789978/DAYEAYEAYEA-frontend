import { useCallback } from 'react'
import { Table, Button } from '../Table'


const OrderTable = ({ orders }) => {
  const handleClick = useCallback((id) => {
    // Todo
  }, [])

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
        { orders.map((order, index) => (
            <tr key={index+10}>
              <td>處理中</td>
              <td>20210922-kw168</td>
              <td>$1380</td>
              <td><Button onClick={handleClick}>查找</Button></td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  )
}

export default OrderTable
