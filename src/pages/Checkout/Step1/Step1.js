import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { PageWidth } from '../../../components/general'
import {
  Title,
  Steps,
  TitleWidth,
  TitleGroup,
  CartTitles,
  CartTitle,
  TotalPrice,
  BtnFlex,
  LinkStyle
} from '../../../components/checkoutSystem/Step'
import { LocalStorageContext, ModalContext } from '../../../context'
import { GeneralBtn } from '../../../components/Button'
import { Cart } from '../../../components/checkoutSystem/step1CartItem'
import { addItemsToLocalStorage, formatPrice } from '../../../utils'
import { FullModal } from '../../../components/Modal'
export default function Step1() {
  const { isModalOpen, handleModalClose } = useContext(ModalContext)
  const [notAllowed, setNotAllowed] = useState('')
  const location = useHistory()
  const { cartItems, setCartItems, totalItems, handleRemoveCartItem } =
    useContext(LocalStorageContext)

  const totalPrice = useMemo(() => {
    if (!cartItems?.length) return
    return cartItems
      .map((item) => item.discountPrice * item.quantity)
      .reduce((total, num) => total + num)
  }, [cartItems])

  useEffect(() => {
    if (!cartItems || !cartItems.length) location.push('/')
    addItemsToLocalStorage(cartItems)
  }, [cartItems, location])

  const handleUpdateCount = useCallback(
    (quantity, id) => {
      setCartItems((c) =>
        c.map((item) => {
          if (item.id !== id) return item
          return {
            ...item,
            quantity: quantity
          }
        })
      )
    },
    [setCartItems]
  )
  return (
    <PageWidth>
      <FullModal
        open={isModalOpen}
        content={'部分商品庫存有異動，請更新購物車再購買'}
        onClose={handleModalClose}
      />
      {cartItems && (
        <>
          <Steps />
          <Title>{`購物車( ${totalItems} 件)`}</Title>
          <CartTitles>
            <TitleWidth />
            <TitleGroup>
              <CartTitle>購買項目</CartTitle>
              <CartTitle>金額</CartTitle>
              <CartTitle>數量</CartTitle>
            </TitleGroup>
          </CartTitles>
          {cartItems.map((item) => (
            <Cart
              key={item.id}
              item={item}
              handleRemoveCartItem={handleRemoveCartItem}
              handleUpdateCount={handleUpdateCount}
              $setNotAllowed={setNotAllowed}
            />
          ))}
          <TotalPrice>{`小計 ${formatPrice(
            totalPrice ? totalPrice : 0
          )}`}</TotalPrice>
          <TotalPrice>運費 NT$80</TotalPrice>
          <TotalPrice>{`總金額 ${formatPrice(totalPrice + 80)}`}</TotalPrice>
          <BtnFlex>
            <Link style={LinkStyle} to='/'>
              <GeneralBtn color='accent' children='繼續購物' />
            </Link>
            {notAllowed ? (
              <Link style={LinkStyle} to='/checkout/step1'>
                <GeneralBtn
                  color='light_grey'
                  buttonStyle={{ cursor: 'not-allowed' }}
                  children='前往結帳'
                />
              </Link>
            ) : (
              <Link style={LinkStyle} to='/checkout/step2'>
                <GeneralBtn color='primary' children='前往結帳' />
              </Link>
            )}
          </BtnFlex>
        </>
      )}
    </PageWidth>
  )
}
