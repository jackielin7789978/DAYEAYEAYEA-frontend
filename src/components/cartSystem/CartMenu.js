import { useContext } from 'react'
import { LocalStorageContext } from '../../context'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FONT_SIZE, MEDIA_QUERY } from '../../constants/style'
import CartItem from './CartItem'
import { ShoppingCarBtn } from '../Button'
import {
  HoverArea,
  MenuContainer,
  CSSTriangle,
  Title
} from '../navbar/MenuStyles'
import { formatPrice } from '../../utils'

const RestyledHoverArea = styled(HoverArea)`
  ${MEDIA_QUERY.desktop} {
    right: 60px;
  }
  ${MEDIA_QUERY.widescreen} {
    right: 16vw;
  }
`
const ItemsContainer = styled.div`
  max-height: ${({ $isOpen }) => ($isOpen ? '62vh' : '0px')};
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-track {
    -webkit-border-radius: 10px;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    -webkit-border-radius: 4px;
    border-radius: 4px;
    background: rgb(219, 219, 219);
  }
  padding: 0 10px;
  ${MEDIA_QUERY.desktop} {
    max-height: ${({ $isOpen }) => ($isOpen ? '60vh' : '0px')};
  }
`
const CartInfo = styled.div`
  margin: 0px 10px 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: ${FONT_SIZE.sm};
  font-weight: bold;
  letter-spacing: 1px;
  p {
    margin: 0;
    margin-top: 4px;
    padding: 0;
    text-align: right;
  }
`
const BtnWrapper = styled(Link)`
  ${MEDIA_QUERY.tablet} {
    position: absolute;
    right: 0;
    width: 250px;
  }
  ${MEDIA_QUERY.desktop} {
    margin: 10px 0px;
  }
`
const EmptyCart = styled.div`
  text-align: center;
  font-weight: bold;
`

export default function CartMenu({ handleHover, $isOpen }) {
  const { cartItems, totalItems, totalPrice } = useContext(LocalStorageContext)

  return (
    <RestyledHoverArea
      onMouseEnter={() => {
        handleHover('cart')
      }}
      onMouseLeave={() => {
        handleHover('')
      }}
      $isOpen={$isOpen}
    >
      <MenuContainer $isOpen={$isOpen}>
        <CSSTriangle $isOpen={$isOpen} />

        {!totalItems && (
          <>
            <EmptyCart>您的購物車是空的</EmptyCart>
          </>
        )}
        {totalItems ? (
          <>
            <Title>購物車</Title>
            <ItemsContainer $isOpen={$isOpen}>
              {cartItems.map((item) => {
                return (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    img={item.img}
                    price={item.discountPrice}
                    quantity={item.quantity}
                  />
                )
              })}
            </ItemsContainer>
            <CartInfo>
              <div>共有 {totalItems} 件商品</div>
              <div>
                <p>運費 {formatPrice(80)}</p>
                <p>總金額 {formatPrice(totalPrice)}</p>
              </div>
            </CartInfo>

            <BtnWrapper to='/checkout/step1'>
              <ShoppingCarBtn color={'primary'}>訂單結帳</ShoppingCarBtn>
            </BtnWrapper>
          </>
        ) : (
          <></>
        )}
      </MenuContainer>
    </RestyledHoverArea>
  )
}
