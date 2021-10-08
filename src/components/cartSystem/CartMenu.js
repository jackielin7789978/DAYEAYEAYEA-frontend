import { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { COLOR, FONT_SIZE, MEDIA_QUERY } from '../../constants/style'
import CartItem from './CartItem'
import { ShoppingCarBtn } from '../Button'

const HoverArea = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
  transition: linear 0.3s;
  top: ${({ $isOpen }) => ($isOpen ? '50px' : '-100vh')};
  background: ${COLOR.light};
  z-index: 1;
  ${MEDIA_QUERY.desktop} {
    transition: ease 0.2s;
    height: ${({ $isOpen }) => ($isOpen ? 'unset' : '0px')};
    width: ${({ $isOpen }) => ($isOpen ? '380px' : 'unset')};
    top: 40px;
    right: 60px;
    background: transparent;
  }
`
const MenuContainer = styled.div`
  width: 84%;
  margin: 30px auto;
  position: relative;
  button {
    width: 100%;
    height: 35px;
    background: ${COLOR.primary_light};
    color: #fff;
    border-radius: 3px;
  }
  ${MEDIA_QUERY.desktop} {
    width: unset;
    display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
    outline: 1px solid
      ${({ $isOpen }) => ($isOpen ? COLOR.primary_light : 'transparent')};
    height: ${({ $isOpen }) => ($isOpen ? '100%' : '0px')};
    padding: ${({ $isOpen }) => ($isOpen ? '16px' : '0px')};
    background: ${COLOR.light};
    position: relative;
    bottom: 0;
    margin: ${({ $isOpen }) => ($isOpen ? '10px 0 0 0;' : '0px')};
  }
`
const Triangle = styled.div`
  ${MEDIA_QUERY.desktop} {
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 15px solid ${COLOR.primary_light};
    position: absolute;
    top: -15px;
    right: 32px;

    p {
      width: 0;
      height: 0;
      border-left: 14px solid transparent;
      border-right: 14px solid transparent;
      border-bottom: 14px solid ${COLOR.light};
      position: absolute;
      right: -14px;
      top: 1px;
    }
  }
`
const Title = styled.div`
  text-align: center;
  font-size: ${FONT_SIZE.md};
  font-weight: bold;
  margin-bottom: 10px;
`
const ItemsContainer = styled.div`
  max-height: ${({ $isOpen }) => ($isOpen ? '470px' : '0px')};
  overflow: scroll;
  padding: 0 10px;
  ${MEDIA_QUERY.desktop} {
    max-height: ${({ $isOpen }) => ($isOpen ? '390px' : '0px')};
  }
`
const CartInfo = styled.div`
  margin: 20px 10px;
  display: flex;
  justify-content: space-between;
  font-size: ${FONT_SIZE.sm};
  font-weight: bold;
`
const BtnWrapper = styled.div`
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
    <HoverArea
      onMouseOver={() => {
        handleHover('cart')
      }}
      onMouseOut={() => {
        handleHover('')
      }}
      $isOpen={$isOpen}
    >
      <MenuContainer $isOpen={$isOpen}>
        <Triangle $isOpen={$isOpen}>
          <p></p>
        </Triangle>
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

            <BtnWrapper>
              <ShoppingCarBtn color={'primary'}>訂單結帳</ShoppingCarBtn>
            </BtnWrapper>
          </>
        )}
      </MenuContainer>
    </HoverArea>
  )
}
