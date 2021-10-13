import Table from '../../../components/admin/orderManage/Table'
const headerNames = [
  '訂單狀態',
  '訂單編號',
  'Email',
  '付款狀態',
  '訂單金額',
  'Edit'
]
export default function AdminOrders() {
  return <Table headerNames={headerNames}></Table>
}
