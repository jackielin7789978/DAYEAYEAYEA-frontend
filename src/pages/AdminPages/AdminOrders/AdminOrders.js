import { useState, useEffect } from 'react'
import { getOrders } from '../../../webAPI/adminAPIs'
import { Search, Filter } from '../../../components/admin/orderManage/Search'
import styled from 'styled-components'
import { ADMIN_MEDIA_QUERY } from '../../../constants/style'
import {
  ColumnHeader,
  Header,
  TableItemContainer
} from '../../../components/admin/TableStyle'
import TableItem from '../../../components/admin/orderManage/TableItem'
import OrderDetail from '../../../components/admin/orderManage/OrderDetail'
import { GeneralBtn } from '../../../components/Button'

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 40px auto;
  width: 76vw;
  ${ADMIN_MEDIA_QUERY.md} {
    width: 60vw;
    max-width: 1180px;
  }
  ${ADMIN_MEDIA_QUERY.lg} {
    max-width: 1180px;
  }
`
const SearchContainer = styled.div`
  margin: 20px auto;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 75vw;
  ${ADMIN_MEDIA_QUERY.md} {
    width: 59vw;
    max-width: 1180px;
  }
  ${ADMIN_MEDIA_QUERY.lg} {
    max-width: 1150px;
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
  const [isViewingArchive, setIsViewingArchive] = useState(false)

  const handleFilter = (name) => {
    setFilter(name)
  }

  const handleOrderDetail = (ticketNo) => {
    const order = orders.filter((order) => order.ticketNo === ticketNo)
    setOrderDetail(() => order[0])
  }

  const handleGetArchiveOrders = () => {
    ;(async () => {
      const res = await getOrders('archive')
      setIsLoading(false)
      if (res.ok) setOrders(res.data)
      if (!res.ok) alert('發生錯誤：' + res.message)
    })()
  }
  const handleGetActiveOrders = () => {
    ;(async () => {
      const res = await getOrders('active')
      setIsLoading(false)
      if (res.ok) setOrders(res.data)
      if (!res.ok) alert('發生錯誤：' + res.message)
    })()
  }

  useEffect(
    (ticketNo) => {
      let isMounted = true
      const order = orders.filter((order) => order.ticketNo === ticketNo)
      if (isMounted) setOrderDetail(() => order[0])
      return () => (isMounted = false)
    },
    [orders]
  )

  useEffect(() => {
    let isMounted = true
    getOrders('active').then((res) => {
      if (isMounted) {
        setIsLoading(false)
        setOrders(res.data)
      }
    })
    return () => (isMounted = false)
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
            <div>
              <Search />
              {!isViewingArchive && (
                <Filter
                  filter={filter}
                  handleFilter={handleFilter}
                  handleGetArchiveOrders={handleGetArchiveOrders}
                />
              )}
            </div>
            {isViewingArchive ? (
              <GeneralBtn
                onClick={() => {
                  handleGetActiveOrders()
                  setIsLoading(true)
                  setIsViewingArchive(false)
                  setFilter('所有訂單')
                }}
                color='admin_blue'
                children='查看所有訂單'
                buttonStyle={{ width: '120px', marginRight: '20px' }}
              />
            ) : (
              <GeneralBtn
                onClick={() => {
                  handleGetArchiveOrders()
                  setIsLoading(true)
                  setIsViewingArchive(true)
                }}
                color='admin_grey'
                children='查看封存訂單'
                buttonStyle={{ width: '120px', marginRight: '20px' }}
              />
            )}
          </SearchContainer>
          <ColumnHeader>
            {headerNames.map((name) => (
              <RestyleHeader key={name} $name={name}>
                {name}
              </RestyleHeader>
            ))}
          </ColumnHeader>
          <TableItemContainer>
            {isViewingArchive
              ? orders
                  .sort((a, b) => b.id - a.id)
                  .map((order) => (
                    <TableItem
                      key={order.id}
                      order={order}
                      handleOrderDetail={handleOrderDetail}
                    />
                  ))
              : orders
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
