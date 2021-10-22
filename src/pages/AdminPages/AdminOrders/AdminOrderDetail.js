import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ADMIN_COLOR, COLOR, FONT_SIZE } from '../../../constants/style'
import { Wrapper } from '../../../components/admin/TableStyle'
// import { ImgAnchor } from '../../../components/general'
import { GeneralBtn } from '../../../components/Button'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'

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
  ${({ $isOpen }) => $isOpen && 'transform: rotate(180deg)'};
`
const Icon = styled(KeyboardArrowDownRoundedIcon)`
  cursor: pointer;
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
  button:last-child {
    &:hover {
      background: ${COLOR.grey};
    }
  }
  button:first-child {
    background: ${ADMIN_COLOR.Btn_blue};
    &:hover {
      background: ${ADMIN_COLOR.Btn_blue_hover};
    }
  }
`

function Item() {
  return (
    <ItemContainer>
      <div>
        <Pic />
        <Name to={`/products/1`}>商品名稱 商品名稱商品名稱</Name>
      </div>
      <div>NT$1800</div>
      <div>1</div>
      <div>NT$1800</div>
    </ItemContainer>
  )
}
export default function AdminOrderDetail() {
  const [order] = useState({})
  const [isOpen, setIsOpen] = useState(false)

  // 資料等 API 修改完成再補上
  return (
    <PageWrapper $isOpen={isOpen}>
      <Container>
        <Title>訂購明細</Title>
        <Subtotal>
          <span>
            共 <b>3</b> 件商品
          </span>
          <span>
            合計：<b>NT$5480</b>
          </span>
          <Collapser
            onClick={() => {
              setIsOpen(!isOpen)
            }}
            $isOpen={isOpen}
          >
            <Icon />
          </Collapser>
        </Subtotal>
        <Menu $isOpen={isOpen}>
          <TableHeaders>
            <Header>商品名稱</Header>
            <Header>單件價格</Header>
            <Header>數量</Header>
            <Header>小計</Header>
          </TableHeaders>
          <Item />
          <Item />
          <Item />
          <PriceDetail>
            <div>
              <span>運費：</span>
              <span>NT$80</span>
            </div>
            <div>
              <span>合計：</span>
              <span>NT$5480</span>
            </div>
          </PriceDetail>
        </Menu>
      </Container>
      <Container>
        <Title>訂單資料</Title>
        <OrderInfo>
          <div>訂單狀態：{order.status}</div>
          <div>訂單編號：{order.id}</div>
          <div>訂購人姓名：神恩佐</div>
          <div>寄送地址：台北市士林區中山北路六段178號2樓</div>
          <div>聯絡信箱：enzo721986091734@gmail.com</div>
          <div>聯絡電話：0912345678</div>
          <div>付款方式：信用卡</div>
          <div>運送方式：宅配</div>
        </OrderInfo>
        <Buttons>
          {order.status === '處理中' && (
            <>
              <GeneralBtn children={'出貨'} />
              <GeneralBtn children={'取消訂單'} />
            </>
          )}
          {order.status === '已出貨' && <GeneralBtn children={'完成訂單'} />}
        </Buttons>
      </Container>
    </PageWrapper>
  )
}
