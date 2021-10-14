import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { PageWidth } from '../../../components/general'
import {
  Title,
  Steps,
  TitleWidth,
  TitleGroup,
  CartTitles,
  CartTitle,
  TotalPrice,
  BtnFlexCenter,
  DeliveryData
} from '../../../components/checkoutSystem/Step'
import { getCartItems } from '../../../utils'
import { GeneralBtn } from '../../../components/Button'
import { OrderItem } from './OrderItem'
export default function Step3() {
  const [cart, setCart] = useState(() => {
    if (getCartItems()) {
      let itemData = getCartItems()
      return JSON.parse(itemData)
    }
    return []
  })
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    setTotalPrice(
      cart.reduce((total, item) => {
        return total + item.price * item.count
      }, 0)
    )
  }, [cart])

  return (
    <PageWidth>
      <Steps />

      <Title>寄送資訊</Title>
      <DeliveryData>帳號: username</DeliveryData>
      <DeliveryData>電郵: 1234@gmail.com</DeliveryData>
      <DeliveryData>姓名: fullname</DeliveryData>
      <DeliveryData>地址: 台北市信義區吳興街111巷32號</DeliveryData>
      <DeliveryData>電話: 0912345678</DeliveryData>

      {/* <Title>付款方式</Title>
          <DeliveryData>貨到付款</DeliveryData>
          <Title>寄送方式</Title>
          <DeliveryData>超商取貨</DeliveryData> */}

      <Title>訂購明細</Title>
      <CartTitles>
        <TitleWidth />
        <TitleGroup>
          <CartTitle>購買項目</CartTitle>
          <CartTitle>金額</CartTitle>
          <CartTitle>數量</CartTitle>
        </TitleGroup>
      </CartTitles>
      {cart.map((item) => (
        <OrderItem key={item.id} item={item} />
      ))}
      <TotalPrice>{`總金額 NT$ ${totalPrice}`}</TotalPrice>
      <BtnFlexCenter>
        <Link to='/'>
          <GeneralBtn color='primary' children='回到首頁' />
        </Link>
      </BtnFlexCenter>
    </PageWidth>
  )
}
