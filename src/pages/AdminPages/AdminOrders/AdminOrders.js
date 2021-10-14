import { useState, useEffect } from 'react'
import { adminLogin, getAllOrders } from '../../../webAPI/adminAPIs'
import Table from '../../../components/admin/orderManage/Table'

const headerNames = ['訂單狀態', '訂單編號', 'Email', '訂單金額', 'Edit']
export default function AdminOrders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    adminLogin('admin01', 'Admin1357')
    getAllOrders().then((res) => {
      setOrders(res.data)
    })
  }, [])
  return <Table headerNames={headerNames} data={orders}></Table>
}
