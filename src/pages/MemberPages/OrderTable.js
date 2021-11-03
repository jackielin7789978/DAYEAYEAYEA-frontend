import { useState, useEffect, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { COLOR } from '../../constants/style'
import { Table, Button } from '../../components/Table'
import { formatPrice } from '../../utils'


const H3 = styled.h3`
  padding-top: 24px;
  text-align: center;
`

const PageListWrapper = styled.ul`
  display: flex;
  justify-content: center;
  margin: 16px auto 4px;
`

const Li = styled.li`
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  user-select: none;
  
  & + & {
    margin-left: 8px;
  }
`

const PageLi = styled(Li)`
  border: 1px solid #111;
  cursor: pointer;
  transition: background .3s;

  ${({ $active }) => $active && `
    color: ${COLOR.light};
    background: ${COLOR.primary_light_hover};
    border: ${COLOR.border_light_grey};
  `}

  &:hover {
    color: ${COLOR.light};
    background: ${COLOR.primary_light_hover};
    border: ${COLOR.border_light_grey};
  }
`

const PageList = ({ currPage, arr, setCurrPage }) => {
  return (
    <PageListWrapper>
      { 
        arr.map((i, index) => (
          <PageLi 
            key={'page' + index}
            $active={currPage === index + 1} 
            onClick={() => setCurrPage(index + 1)}>
            {index + 1}
          </PageLi>
        ))
      }
    </PageListWrapper>
  )
}


const OrderTable = ({ pageBar, orders }) => {
  const [data, setData] = useState([])
  const [currPage, setCurrPage] = useState(1)
  const history = useHistory()
  const maxPage = useMemo(() => Math.ceil(data.length / 5), [data])
  const pageData = useMemo(() => {
    return data.slice((currPage - 1) * 5, currPage * 5)
  }, [data, currPage])


  useEffect(() => {
    setData([...orders].reverse())
  }, [orders])
  return (
    <>
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
          { 
            Array.isArray(data) && pageData.map((order) => (
              <tr key={order.ticketNo + new Date().getMilliseconds}>
                <td>{ order.status }</td>
                <td>{ order.ticketNo }</td>
                <td>{ order?.subTotal && formatPrice(order.subTotal) }</td>
                <td><Button onClick={() => history.push('/member/orders/' + order.ticketNo)}>查找</Button></td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      { !orders.length && <H3>暫無訂單</H3> }
      { pageBar && <PageList currPage={currPage} arr={Array(maxPage).fill()} setCurrPage={setCurrPage} / > }
    </>
  )
}

export default OrderTable
