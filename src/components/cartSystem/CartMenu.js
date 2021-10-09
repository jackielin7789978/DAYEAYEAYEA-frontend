import { useState, useEffect, useMemo } from 'react'
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

const RestyledHoverArea = styled(HoverArea)`
  ${MEDIA_QUERY.desktop} {
    right: 60px;
  }
  ${MEDIA_QUERY.widescreen} {
    right: 16vw;
  }
`
const ItemsContainer = styled.div`
  max-height: ${({ $isOpen }) => ($isOpen ? '50vh' : '0px')};
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
    max-height: ${({ $isOpen }) => ($isOpen ? '50vh' : '0px')};
  }
`
const CartInfo = styled.div`
  margin: 20px 10px;
  display: flex;
  justify-content: space-between;
  font-size: ${FONT_SIZE.sm};
  font-weight: bold;
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
  font-size: ;
`

export default function CartMenu({ handleHover, $isOpen }) {
  const [items, setItems] = useState([])
  const BASE_URL = 'https://api.coolizz.tw'
  const handleRemove = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

  useEffect(() => {
    return fetch(`${BASE_URL}/products`)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        setItems(res.data.filter((data) => data.id < 8))
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  const totalPrice = useMemo(() => {
    let sum = 0
    for (const item of items) {
      sum += item.price
    }
    return sum
  }, [items])
  const totalItems = useMemo(() => items.length, [items])

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
        {totalItems !== 0 && (
          <>
            <Title>購物車</Title>
            <ItemsContainer $isOpen={$isOpen}>
              {items.map((item) => {
                return (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    img={item.Product_imgs[0].imgUrlSm}
                    price={item.price}
                    handleRemove={handleRemove}
                  />
                )
              })}
            </ItemsContainer>
            <CartInfo>
              <div>共有 {totalItems} 件商品</div>
              <div>總金額 NT$ {totalPrice}</div>
            </CartInfo>

            <BtnWrapper to='/checkout/step1'>
              <ShoppingCarBtn color={'primary'}>訂單結帳</ShoppingCarBtn>
            </BtnWrapper>
          </>
        )}
      </MenuContainer>
    </RestyledHoverArea>
  )
}
