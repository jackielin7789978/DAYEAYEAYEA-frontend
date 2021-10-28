import { useState } from 'react'
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
import { GeneralBtn } from '../../../components/Button'
import useFetchData from '../../../hooks/useFetchData'

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
  const [filter, setFilter] = useState('所有訂單')
  const [isViewingArchive, setIsViewingArchive] = useState(false)

  const handleFilter = (name) => {
    setFilter(name)
  }

  const handleGetArchiveOrders = () => {
    ;(async () => {
      const res = await getOrders('archive')
      if (res.ok) setOrders(res.data)
      if (!res.ok) alert('發生錯誤：' + res.message)
    })()
  }

  const handleGetActiveOrders = () => {
    ;(async () => {
      const res = await getOrders('active')
      if (res.ok) setOrders(res.data)
      if (!res.ok) alert('發生錯誤：' + res.message)
    })()
  }
  useFetchData(getOrders, setOrders, 'active')

  return (
    <PageWrapper>
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
              .map((order) => <TableItem key={order.id} order={order} />)
          : orders
              .filter((order) =>
                filter === '所有訂單' ? order : order.status === filter
              )
              .sort((a, b) => b.id - a.id)
              .map((order) => <TableItem key={order.id} order={order} />)}
      </TableItemContainer>
    </PageWrapper>
  )
}
