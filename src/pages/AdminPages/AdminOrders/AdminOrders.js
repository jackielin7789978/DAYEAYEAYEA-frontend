import { useState, useEffect } from 'react'
import { getOrders } from '../../../webAPI/adminAPIs'
import { Search, Filter } from '../../../components/admin/orderManage/Search'
import styled from 'styled-components'
import {
  FONT_SIZE,
  ADMIN_COLOR,
  ADMIN_MEDIA_QUERY
} from '../../../constants/style'
import {
  ColumnHeader,
  Header,
  TableItemContainer
} from '../../../components/admin/TableStyle'
import TableItem from '../../../components/admin/orderManage/TableItem'
import { GeneralBtn } from '../../../components/Button'
import useFetchData from '../../../hooks/useFetchData'
import { calTotalPages } from '../../../utils'
import { AdminIsLoadingComponent } from '../../../components/admin/AdminIsLoading'

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 40px auto;
  width: 75vw;
  font-size: ${FONT_SIZE.sm};
  ${ADMIN_MEDIA_QUERY.md} {
    max-width: 1280px;
    font-size: ${FONT_SIZE.md};
  }
  ${ADMIN_MEDIA_QUERY.lg} {
    max-width: 1280px;
    font-size: ${FONT_SIZE.md};
  }
`
const SearchContainer = styled.div`
  margin: 20px auto;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 74vw;
  ${ADMIN_MEDIA_QUERY.md} {
    max-width: 1260px;
  }
  ${ADMIN_MEDIA_QUERY.lg} {
    max-width: 1260px;
  }
`
const RestyleHeader = styled(Header)`
  width: 12%;
  width: ${({ $name }) => $name === 'Email' && '36%'};
  width: ${({ $name }) => $name === '訂單編號' && '28%'};
`
const Paginator = styled.div`
  text-align: center;
  margin: 20px;
`
const PaginatorBtn = styled.button`
  background: transport;
  color: ${ADMIN_COLOR.Btn_grey};
  margin: 0px 4px;
  padding: 0px 4px;
  font-size: ${FONT_SIZE.md};

  ${(props) =>
    props.$active &&
    `
    font-weight: bold;
    border-bottom: 1px solid ${ADMIN_COLOR.border_grey};
    `}
`
const headerNames = ['訂單狀態', '訂單編號', 'Email', '訂單金額', 'Edit']

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState('所有訂單')
  const [isViewingArchive, setIsViewingArchive] = useState(false)
  const [offset, setOffset] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // 搜尋功能
  const [searchVal, setSearchVal] = useState('')
  const [searchedOrders, setSearchedOrders] = useState()
  useEffect(() => {
    let reg = new RegExp(searchVal, 'i')
    searchVal
      ? setSearchedOrders(
          orders.filter(
            (order) =>
              reg.test(order.status) ||
              reg.test(order.ticketNo) ||
              reg.test(order.orderEmail)
          )
        )
      : setSearchedOrders('')
  }, [orders, searchVal])

  const filteredOrders = orders.filter((orders) => orders.status === filter)
  const ORDERS_PER_PAGE = 10
  const TotalPages =
    filter === '所有訂單'
      ? [...Array(calTotalPages(orders.length)).keys()]
      : [...Array(calTotalPages(filteredOrders.length)).keys()]

  const handleFilter = (name) => {
    setFilter(name)
    setOffset(0)
  }

  const handleGetOrders = (condition) => {
    setIsLoading(true)
    ;(async () => {
      const res = await getOrders(condition)
      if (!res.ok) alert('發生錯誤：' + res.message)
      setOrders(res.data)
      setOffset(0)
      setIsLoading(false)
    })()
  }

  useFetchData(getOrders, setOrders, setIsLoading, 'active')

  return (
    <PageWrapper>
      <SearchContainer>
        <div>
          <Search searchVal={searchVal} setSearchVal={setSearchVal} />
          {!isViewingArchive && (
            <Filter filter={filter} handleFilter={handleFilter} />
          )}
        </div>
        {isViewingArchive ? (
          <GeneralBtn
            onClick={() => {
              handleGetOrders('active')
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
              handleGetOrders('archive')
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
      {isLoading ? (
        <AdminIsLoadingComponent />
      ) : (
        <TableItemContainer>
          {searchedOrders
            ? searchedOrders
                .sort((a, b) => b.id - a.id)
                .map((order) => <TableItem key={order.id} order={order} />)
            : isViewingArchive
            ? orders
                .sort((a, b) => b.id - a.id)
                .slice(offset, offset + ORDERS_PER_PAGE)
                .map((order) => <TableItem key={order.id} order={order} />)
            : orders
                .filter((order) =>
                  filter === '所有訂單' ? order : order.status === filter
                )
                .sort((a, b) => b.id - a.id)
                .slice(offset, offset + ORDERS_PER_PAGE)
                .map((order) => <TableItem key={order.id} order={order} />)}
        </TableItemContainer>
      )}
      {!searchVal && !isLoading && (
        <Paginator>
          {TotalPages.map((page) => (
            <PaginatorBtn
              onClick={() => setOffset(page * ORDERS_PER_PAGE)}
              key={page}
              $active={offset / 10 === page}
            >
              {page + 1}
            </PaginatorBtn>
          ))}
        </Paginator>
      )}
    </PageWrapper>
  )
}
