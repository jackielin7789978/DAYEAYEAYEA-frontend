import { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  FONT_SIZE,
  ADMIN_MEDIA_QUERY,
  ADMIN_COLOR
} from '../../../constants/style'
import { ColumnHeader, Header } from '../../../components/admin/TableStyle'
import { GeneralBtn } from '../../../components/Button'
import { AdminIsLoadingComponent } from '../../../components/admin/AdminIsLoading'
import { Table, Search, Filter } from '../../../components/admin/orderManage'
import useFetch from '../../../hooks/useFetch'
import { ITEMS_PER_PAGE } from '../../../constants/itemsPerPage'
import { calTotalPages } from '../../../utils'

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 40px auto;
  width: 75vw;
  font-size: ${FONT_SIZE.sm};
  ${ADMIN_MEDIA_QUERY.md} {
    max-width: 1680px;
    font-size: ${FONT_SIZE.md};
  }
  ${ADMIN_MEDIA_QUERY.lg} {
    max-width: 1680px;
    font-size: ${FONT_SIZE.md};
  }
`
const SearchContainer = styled.div`
  margin: 20px auto;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
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
  const [isViewingArchive, setIsViewingArchive] = useState(false)
  const [filter, setFilter] = useState('所有訂單')
  const [offset, setOffset] = useState(0)
  const [pages, setPages] = useState()
  const handleFilter = (name) => {
    setFilter(name)
    setOffset(0)
  }
  // 抓所有訂單
  const {
    isLoading,
    value: orders,
    fetchData: getOrders
  } = useFetch('/admin/orders/')

  useEffect(() => {
    getOrders({
      suffixPath: 'active'
    })
  }, [getOrders])

  // 查看所有/封存訂單
  const handleGetOrders = (condition) => {
    getOrders({ suffixPath: condition })
    setOffset(0)
    setFilter('所有訂單')
    if (condition === 'archive') {
      setIsViewingArchive(true)
    }
  }
  // 根據訂單比數計算頁數並產生 array
  useEffect(() => {
    if (orders?.data) {
      setPages(() => {
        if (filter === '所有訂單')
          return [...Array(calTotalPages(orders?.data?.length)).fill()]
        return [
          ...Array(
            calTotalPages(
              orders?.data?.filter((order) => order.status === filter).length
            )
          ).fill()
        ]
      })
    }
  }, [filter, orders])

  // 搜尋功能
  const [searchVal, setSearchVal] = useState('')
  const [searchedOrders, setSearchedOrders] = useState()
  useEffect(() => {
    if (!orders?.data) return
    let reg = new RegExp(searchVal, 'i')
    searchVal
      ? setSearchedOrders(
          orders?.data.filter(
            (order) =>
              reg.test(order.status) ||
              reg.test(order.ticketNo) ||
              reg.test(order.orderEmail)
          )
        )
      : setSearchedOrders('')
  }, [orders, searchVal])

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
        <Table
          orders={orders?.data}
          searchedOrders={searchedOrders}
          isViewingArchive={isViewingArchive}
          filter={filter}
          offset={offset}
        />
      )}
      {!searchVal && !isLoading && orders?.data && (
        <Paginator>
          {pages.map((page, index) => (
            <PaginatorBtn
              onClick={() => setOffset(index * ITEMS_PER_PAGE)}
              key={`page-${index}`}
              $active={offset / 10 === index}
            >
              {index + 1}
            </PaginatorBtn>
          ))}
        </Paginator>
      )}
    </PageWrapper>
  )
}
