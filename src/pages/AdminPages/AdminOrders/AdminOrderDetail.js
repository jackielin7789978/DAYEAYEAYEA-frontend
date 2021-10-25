import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ADMIN_COLOR, COLOR, FONT_SIZE } from '../../../constants/style'
import { Wrapper } from '../../../components/admin/TableStyle'
// import { ImgAnchor } from '../../../components/general'
import { GeneralBtn } from '../../../components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import {
  addOrderDetailToLocalSotrage,
  getOrderDetailFromLocalStorage,
  multiplyPrice
} from '../../../utils'
import { updateOrderStatus } from '../../../webAPI/adminAPIs'

const PageWrapper = styled.div`
  margin-right: ${({ $isOpen }) => ($isOpen ? '-10px' : '0px')};
`
const Container = styled(Wrapper)`
  background: ${ADMIN_COLOR.light_grey};
  border-radius: 20px;
  position: relative;
  margin: 40px auto;
  padding-bottom: 20px;
  &:first-child {
    margin-top: 10vh;
  }
`
const Title = styled.h3`
  text-align: center;
  padding: 20px;
  font-weight: bold;
`
const Subtotal = styled.div`
  text-align: center;
  span {
    margin: 0 8px;
  }
`
const Collapser = styled.div`
  margin-top: 10px;
`
const Icon = styled(FontAwesomeIcon)`
  cursor: pointer;
  transition: all 0.2s;
  ${({ $isOpen }) => $isOpen && 'transform: rotate(180deg)'};
`
const Menu = styled.div`
  height: ${({ $isOpen }) => ($isOpen ? 'unset' : 0)};
  div {
    transition: opacity 0.1s;
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  }
`
const TableHeaders = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px;
  margin: 0 20px;
  border-bottom: 1px solid ${COLOR.border_grey};
  span {
    text-align: center;
  }
  span:first-child {
    text-align: left;
    width: 70%;
  }
  span:last-child {
    text-align: right;
  }
`
const Header = styled.span`
  width: 10%;
`
const ItemContainer = styled(TableHeaders)`
  padding: 10px;
  margin: 0 20px 10px 20px;
  div {
    text-align: center;
    width: 10%;
    margin: 2px 0px;
  }
  div:first-child {
    width: 70%;
    display: flex;
  }
  div:last-child {
    text-align: right;
  }
`
const Pic = styled.div`
  max-width: 70px;
  height: 70px;
  ${'' /* background: url(${({ $img }) => ($img ? $img : $img)}); */}
  background: ${COLOR.accent};
`
const Name = styled(Link)`
  margin: 2px 10px;
  font-weight: bold;
  color: ${COLOR.text_dark};
  &:hover {
    color: ${COLOR.text_dark};
  }
`
const PriceDetail = styled.div`
  width: 100%;
  padding: 4px 30px;
  text-align: right;
  div {
    margin: 10px 0px;
  }
  div:first-child {
    font-size: ${FONT_SIZE.md};
  }
  div:last-child {
    font-size: ${FONT_SIZE.lg};
    font-weight: bold;
  }
`
const OrderInfo = styled.div`
  padding: 10px 40px;
  div {
    margin: 8px 0px;
  }
`
const Buttons = styled.div`
  position: absolute;
  top: 22%;
  right: 40px;
  display: flex;
  button {
    padding: 0 20px;
    margin: 0 8px;
    transition: 0.2s ease;
  }
`

function Item({ item }) {
  return (
    <ItemContainer>
      <div>
        <Pic />
        <Name to={`/admin/products/${item.productId}`}>
          {item.Product.name}
        </Name>
      </div>
      <div>{item.Product.discountPrice}</div>
      <div>{item.quantity}</div>
      <div>{multiplyPrice(item.Product.discountPrice, item.quantity)}</div>
    </ItemContainer>
  )
}
export default function AdminOrderDetail() {
  const [isOpen, setIsOpen] = useState(false)
  const [order, setOrder] = useState(() => {
    return JSON.parse(getOrderDetailFromLocalStorage())
  })

  const handleOrderStatus = (status) => {
    updateOrderStatus(order.ticketNo, status).then((res) => {
      if (!res.ok) alert('發生錯誤：' + res.message)
      let newStatus = ''
      switch (status) {
        case 'normal':
          newStatus = '處理中'
          break
        case 'ship':
          newStatus = '已出貨'
          break
        case 'cancel':
          newStatus = '已取消'
          break
        case 'complete':
          newStatus = '已完成'
          break
        default:
          newStatus = '處理中'
      }
      const newOrder = { ...order }
      newOrder.status = newStatus
      setOrder(newOrder)
      alert('變更成功！')
      addOrderDetailToLocalSotrage(newOrder)
    })
  }

  return (
    <PageWrapper $isOpen={isOpen}>
      <Container>
        <Title>訂購明細</Title>
        <Subtotal>
          <span>
            共 <b>{order.Order_items.length}</b> 件商品
          </span>
          <span>
            合計：<b>{order.subTotal}</b>
          </span>
          <Collapser
            onClick={() => {
              setIsOpen(!isOpen)
            }}
          >
            <Icon icon={faChevronDown} $isOpen={isOpen} />
          </Collapser>
        </Subtotal>
        <Menu $isOpen={isOpen}>
          <TableHeaders>
            <Header>商品名稱</Header>
            <Header>單件價格</Header>
            <Header>數量</Header>
            <Header>小計</Header>
          </TableHeaders>
          {order.Order_items.map((item) => (
            <Item key={item.productId} item={item} />
          ))}
          <PriceDetail>
            <div>
              <span>運費：</span>
              <span>NT$80</span>
            </div>
            <div>
              <span>合計：</span>
              <span>{order.subTotal}</span>
            </div>
          </PriceDetail>
        </Menu>
      </Container>
      <Container>
        <Title>訂單資料</Title>
        <OrderInfo>
          <div>訂單狀態：{order.status}</div>
          <div>訂單編號：{order.ticketNo}</div>
          <div>訂購人姓名：{order.orderName}</div>
          <div>寄送地址：{order.orderAddress}</div>
          <div>聯絡信箱：{order.orderEmail}</div>
          <div>聯絡電話：{order.orderPhone}</div>
          <div>付款方式：{order.payment}</div>
          <div>運送方式：{order.shipping}</div>
        </OrderInfo>
        <Buttons>
          {order.status === '處理中' && (
            <>
              <GeneralBtn
                onClick={() => handleOrderStatus('ship')}
                color={'admin_blue'}
                children={'出貨'}
              />
              <GeneralBtn
                onClick={() => handleOrderStatus('cancel')}
                color={'admin_grey'}
                children={'取消訂單'}
              />
            </>
          )}
          {order.status === '已出貨' && (
            <GeneralBtn
              onClick={() => handleOrderStatus('complete')}
              color={'admin_grey'}
              children={'完成訂單'}
            />
          )}
        </Buttons>
      </Container>
    </PageWrapper>
  )
}
