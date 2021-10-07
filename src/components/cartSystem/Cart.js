import styled from 'styled-components'
import { COLOR, FONT_SIZE, MEDIA_QUERY } from '../../constants/style'
import CartItem from './CartItem'

const CartContainer = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
  transition: linear 0.3s;
  top: ${({ $isOpen }) => ($isOpen ? '50px' : '-100vh')};
  background: ${COLOR.light};
  z-index: 1;
  ${MEDIA_QUERY.desktop} {
    height: 420px;
    width: 360px;
    top: 130px;
    right: 0px;
  }
`
const Wrapper = styled.div`
  width: 84%;
  margin: 30px auto;
  button {
    width: 100%;
    height: 35px;
    background: ${COLOR.primary_light};
    color: #fff;
    border-radius: 3px;
  }
  ${MEDIA_QUERY.desktop} {
    margin: 10px auto;
  }
`
const Title = styled.div`
  text-align: center;
  font-size: ${FONT_SIZE.md};
  font-weight: bold;
`
const Items = styled.div``
const TotalPrice = styled.div`
  text-align: right;
  font-size: ${FONT_SIZE.sm};
  font-weight: bold;
  margin: 30px 0px;
  ${MEDIA_QUERY.desktop} {
    margin: 20px 0px;
  }
`

export default function Cart({ $isOpen }) {
  return (
    <CartContainer $isOpen={$isOpen}>
      <Wrapper>
        <Title>購物車</Title>
        <Items>
          <CartItem />
          <CartItem />
          <TotalPrice>總金額 NT$ 3900</TotalPrice>
          <button>訂單結帳</button>
        </Items>
      </Wrapper>
    </CartContainer>
  )
}
