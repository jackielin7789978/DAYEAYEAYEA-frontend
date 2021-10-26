import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ADMIN_COLOR, COLOR, FONT_SIZE } from '../../../constants/style'
import { Wrapper } from '../TableStyle'
import { ImgAnchor } from '../../../components/general'
import { GeneralBtn, LogoutBtn } from '../../Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { multiplyPrice, formatPrice } from '../../../utils'
import { getSingleOrder, updateOrderStatus } from '../../../webAPI/adminAPIs'
import { FullModal } from '../../Modal'

const PageWrapper = styled.div`
  width: 90%;
  position: relative;
  right: ${({ $isOpen }) => ($isOpen ? '-5px' : '0px')};
  margin: 40px auto;
`
const Container = styled(Wrapper)`
  width: 100%;
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
  background: ${({ $img }) => `url(${$img})`};
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
        <Pic $img={JSON.stringify(item.Product.Product_imgs[0].imgUrlSm)}>
          <ImgAnchor to={`/admin/products/${item.productId}`} />
        </Pic>
        <Name to={`/admin/products/${item.productId}`}>
          {item.Product.name}
        </Name>
      </div>
      <div>{formatPrice(item.Product.discountPrice)}</div>
      <div>{item.quantity}</div>
      <div>
        {formatPrice(multiplyPrice(item.Product.discountPrice, item.quantity))}
      </div>
    </ItemContainer>
  )
}
export default function OrderDetail({ orderDetail, setOrderDetail }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOrderStatus = (status) => {
    updateOrderStatus(orderDetail.ticketNo, status).then((res) => {
      if (!res.ok) alert('發生錯誤：' + res.message)
      if (status === 'cancel' && !isModalOpen) return setIsModalOpen(true)
      getSingleOrder(orderDetail.ticketNo).then((res) => {
        if (res.ok) setOrderDetail(res.data)
        if (!res.ok) alert('發生錯誤：' + res.message)
      })
      setIsModalOpen(false)
      alert('變更成功！')
    })
  }

  return (
    <PageWrapper $isOpen={isOpen}>
      <Link to='/admin/orders'>
        <LogoutBtn
          onClick={() => setOrderDetail(null)}
          color='admin_blue'
          children='回訂單列表'
          buttonStyle={{ width: '120px' }}
        />
      </Link>
      <Container>
        <Title>訂購明細</Title>
        <Subtotal>
          <span>
            共 <b>{orderDetail.Order_items.length}</b> 件商品
          </span>
          <span>
            合計：
            {/* 暫時擋掉 subTotal 的舊訂單 */}
            <b>{orderDetail.subTotal && formatPrice(orderDetail.subTotal)}</b>
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
          {orderDetail.Order_items.map((item) => (
            <Item key={item.productId} item={item} />
          ))}
          <PriceDetail>
            <div>
              <span>運費：</span>
              <span>{formatPrice(80)}</span>
            </div>
            <div>
              <span>合計：</span>
              <span>
                {/* 暫時擋掉 subTotal 的舊訂單 */}
                {orderDetail.subTotal && formatPrice(orderDetail.subTotal)}
              </span>
            </div>
          </PriceDetail>
        </Menu>
      </Container>
      <Container>
        <Title>訂單資料</Title>
        <OrderInfo>
          <div>訂單狀態：{orderDetail.status}</div>
          <div>訂單編號：{orderDetail.ticketNo}</div>
          <div>訂購人姓名：{orderDetail.orderName}</div>
          <div>寄送地址：{orderDetail.orderAddress}</div>
          <div>聯絡信箱：{orderDetail.orderEmail}</div>
          <div>聯絡電話：{orderDetail.orderPhone}</div>
          <div>付款方式：{orderDetail.payment}</div>
          <div>運送方式：{orderDetail.shipping}</div>
        </OrderInfo>
        <Buttons>
          <FullModal
            open={isModalOpen}
            content='確定要取消這筆訂單嗎？'
            buttonOne={
              <GeneralBtn
                onClick={() => handleOrderStatus('cancel')}
                color='admin_blue'
                children='確定'
              />
            }
            buttonTwo={
              <GeneralBtn
                onClick={() => setIsModalOpen(false)}
                color='admin_grey'
                children='返回'
              />
            }
            onClose={() => setIsModalOpen(false)}
          />
          {orderDetail.status === '處理中' && (
            <>
              <GeneralBtn
                onClick={() => handleOrderStatus('ship')}
                color='admin_blue'
                children='出貨'
              />
              <GeneralBtn
                onClick={() => handleOrderStatus('cancel')}
                color='admin_grey'
                children='取消訂單'
              />
            </>
          )}
          {orderDetail.status === '已出貨' && (
            <GeneralBtn
              onClick={() => handleOrderStatus('complete')}
              color='admin_grey'
              children='完成訂單'
            />
          )}
          {orderDetail.status === '已完成' && (
            <GeneralBtn color='admin_grey' children='封存訂單' />
          )}
        </Buttons>
      </Container>
    </PageWrapper>
  )
}
