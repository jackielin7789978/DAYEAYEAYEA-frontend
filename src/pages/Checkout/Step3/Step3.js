import { useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
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
import { OrderItem } from '../../../components/checkoutSystem/step3OrderItem'
import { getOrderOne } from '../../../webAPI/orderAPI'
import { formatPrice } from '../../../utils'
export default function Step3() {
  const location = useHistory()
  let { ticket } = useParams()
  const [orderData, setOrderData] = useState(() => {
    ;(async () => {
      const result = await getOrderOne(ticket)
      if (result.ok === 0) {
        console.log(result.message)
        return location.push('/')
      }
      return setOrderData(result.data)
    })()
  })
  return (
    <PageWidth>
      <Steps />
      {orderData && (
        <>
          <Title>寄送資訊</Title>
          <DeliveryData>帳號: {orderData.Member.username}</DeliveryData>
          <DeliveryData>電郵: {orderData.orderEmail}</DeliveryData>
          <DeliveryData>姓名: {orderData.orderName}</DeliveryData>
          <DeliveryData>地址: {orderData.orderAddress}</DeliveryData>
          <DeliveryData>電話: {orderData.orderPhone}</DeliveryData>

          <Title>付款方式</Title>
          <DeliveryData>{orderData.payment}</DeliveryData>
          <Title>寄送方式</Title>
          <DeliveryData>{orderData.shipping}</DeliveryData>

          <Title>訂購明細</Title>
          <CartTitles>
            <TitleWidth />
            <TitleGroup>
              <CartTitle>購買項目</CartTitle>
              <CartTitle>金額</CartTitle>
              <CartTitle>數量</CartTitle>
            </TitleGroup>
          </CartTitles>
          {orderData.Order_items.map((item) => (
            <OrderItem key={item.productId} item={item} />
          ))}
          <TotalPrice>{`小計 ${formatPrice(
            orderData.subTotal - 80
          )}`}</TotalPrice>
          <TotalPrice>運費 NT$80</TotalPrice>
          <TotalPrice>{`總金額 ${formatPrice(orderData.subTotal)}`}</TotalPrice>
        </>
      )}
      <Link to='/'>
        <BtnFlexCenter>
          <GeneralBtn
            color='primary'
            children='回到首頁'
            buttonStyle={{ marginTop: '20px' }}
          />
        </BtnFlexCenter>
      </Link>
    </PageWidth>
  )
}
