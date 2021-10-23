import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../../context'
import { useHistory } from 'react-router'
import { getAllOrders } from '../../../webAPI/adminAPIs'
import { Search, Filter } from '../../../components/admin/orderManage/Search'
import styled from 'styled-components'
import { ADMIN_MEDIA_QUERY } from '../../../constants/style'
import {
  Wrapper,
  ColumnHeader,
  Header,
  TableItemContainer
} from '../../../components/admin/TableStyle'
import TableItem from '../../../components/admin/orderManage/TableItem'

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
const RestyleHeader = styled(Header)`
  width: 12%;
  width: ${({ $name }) => $name === 'Email' && '38%'};
  width: ${({ $name }) => $name === '訂單編號' && '26%'};
`
const headerNames = ['訂單狀態', '訂單編號', 'Email', '訂單金額', 'Edit']

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState('所有訂單')
  const history = useHistory()
  const { user } = useContext(UserContext)
  // !user && history.push('/admin/login')

  const handleFilter = (name) => {
    setFilter(name)
  }

  useEffect(() => {
    getAllOrders().then((res) => {
      setOrders(res.data)
    })
  }, [history, user])

  return (
    <PageWrapper>
      <SearchContainer>
        <Search />
        <Filter handleFilter={handleFilter} />
      </SearchContainer>
      <Wrapper>
        <ColumnHeader>
          {headerNames.map((name) => (
            <RestyleHeader key={name} $name={name}>
              {name}
            </RestyleHeader>
          ))}
        </ColumnHeader>
        <TableItemContainer>
          {orders
            .filter((order) =>
              filter === '所有訂單' ? order : order.status === filter
            )
            .sort((a, b) => b.id - a.id)
            .map((order) => (
              <TableItem key={order.id} order={order} />
            ))}
        </TableItemContainer>
      </Wrapper>
    </PageWrapper>
  )
}
