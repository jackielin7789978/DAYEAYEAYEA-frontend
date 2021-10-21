import { useCallback, useContext, useEffect, useMemo } from 'react'
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
import { LocalStorageContext } from '../../../context'
import { GeneralBtn } from '../../../components/Button'
import { Cart } from '../../../components/checkoutSystem/step1CartItem'
import { addItemsToLocalStorage } from '../../../utils'
export default function Step1() {
  const location = useHistory()
  const { cartItems, setCartItems, totalItems, handleRemoveCartItem } =
    useContext(LocalStorageContext)

  const totalPrice = useMemo(() => {
    return cartItems.length
      ? cartItems
          .map((item) => item.price * item.quantity)
          .reduce((total, num) => total + num)
      : 0
  }, [cartItems])

  useEffect(() => {
    if (!cartItems.length) location.push('/')
    addItemsToLocalStorage(cartItems)
  }, [cartItems, location])

  const handleUpdateCount = useCallback(
    (quantity, id) => {
      if (quantity < 1) {
        return setCartItems((c) => c.filter((item) => item.id !== id))
      }
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
            />
          ))}
          <TotalPrice>{`總金額 NT$ ${totalPrice}`}</TotalPrice>
          <BtnFlex>
            <Link style={LinkStyle} to='/'>
              <GeneralBtn color='accent' children='繼續購物' />
            </Link>
            <Link style={LinkStyle} to='/checkout/step2'>
              <GeneralBtn color='primary' children='前往結帳' />
            </Link>
          </BtnFlex>
        </>
      )}
    </PageWidth>
  )
}
