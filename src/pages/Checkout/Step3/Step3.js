import { useContext } from 'react'
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
import { GeneralBtn } from '../../../components/Button'
import { OrderItem } from './OrderItem'
import { LocalStorageContext } from '../../../context'

export default function Step3() {
  const { cartItems, totalPrice } = useContext(LocalStorageContext)
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
      {cartItems.map((item) => (
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
