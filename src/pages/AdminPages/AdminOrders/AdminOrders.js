import { useState, useEffect } from 'react'
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
import OrderDetail from '../../../components/admin/orderManage/OrderDetail'

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid transparent;
  margin: 40px auto;
  width: 76%;
  ${ADMIN_MEDIA_QUERY.md} {
    width: 60%;
  }
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
  width: ${({ $name }) => $name === 'Email' && '36%'};
  width: ${({ $name }) => $name === '訂單編號' && '28%'};
`
const headerNames = ['訂單狀態', '訂單編號', 'Email', '訂單金額', 'Edit']

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [orderDetail, setOrderDetail] = useState(null)
  const [filter, setFilter] = useState('所有訂單')
  const [isLoading, setIsLoading] = useState(true)

  const handleFilter = (name) => {
    setFilter(name)
  }

  const handleOrderDetail = (ticketNo) => {
    const order = orders.filter((order) => order.ticketNo === ticketNo)
    setOrderDetail(() => order[0])
  }

  useEffect(() => {
    getAllOrders().then((res) => {
      setIsLoading(false)
      setOrders(res.data)
    })
  }, [])

  return isLoading ? (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '28px'
      }}
    >
      Loading...
    </div>
  ) : (
    <PageWrapper>
      {!orderDetail && (
        <>
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
                  <TableItem
                    key={order.id}
                    order={order}
                    handleOrderDetail={handleOrderDetail}
                  />
                ))}
            </TableItemContainer>
          </Wrapper>
        </>
      )}
      {orderDetail && (
        <OrderDetail
          orderDetail={orderDetail}
          setOrderDetail={setOrderDetail}
        />
      )}
    </PageWrapper>
  )
}
