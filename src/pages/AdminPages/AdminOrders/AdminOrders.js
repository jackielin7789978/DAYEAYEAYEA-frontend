import { useState, useEffect } from 'react'
import { adminLogin, getAllOrders } from '../../../webAPI/adminAPIs'
import Table from '../../../components/admin/orderManage/Table'
import { Search, Filter } from '../../../components/admin/orderManage/Search'
import styled from 'styled-components'
import { ADMIN_MEDIA_QUERY } from '../../../constants/style'

const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid transparent;
  padding: 40px 0px;
`
const SearchContainer = styled.div`
  margin: 20px auto;
  display: flex;
  width: 78vw;
  ${ADMIN_MEDIA_QUERY.md} {
    width: 68vw;
    max-width: 1180px;
  }
  ${ADMIN_MEDIA_QUERY.lg} {
    max-width: 1180px;
  }
`

const headerNames = ['訂單狀態', '訂單編號', 'Email', '訂單金額', 'Edit']
export default function AdminOrders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    adminLogin('admin01', 'Admin1357')
    getAllOrders().then((res) => {
      setOrders(res.data)
    })
  }, [])
  return (
    <PageWrapper>
      <SearchContainer>
        <Search />
        <Filter />
      </SearchContainer>
      <Table headerNames={headerNames} data={orders}></Table>
    </PageWrapper>
  )
}
