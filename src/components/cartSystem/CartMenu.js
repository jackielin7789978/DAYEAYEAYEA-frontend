import styled from 'styled-components'
import { COLOR, FONT_SIZE, MEDIA_QUERY } from '../../constants/style'
import CartItem from './CartItem'

const HoverArea = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
  transition: linear 0.3s;
  top: ${({ $isOpen }) => ($isOpen ? '50px' : '-100vh')};
  background: ${COLOR.light};
  z-index: 1;
  ${MEDIA_QUERY.desktop} {
    transition: linear 0.2s;
    height: ${({ $isOpen }) => ($isOpen ? 'unset' : '0px')};
    width: ${({ $isOpen }) => ($isOpen ? '380px' : 'unset')};
    top: 40px;
    right: 14vw;
    background: transparent;
  }
`
const MenuContainer = styled.div`
  width: 100%;
  margin: 30px auto;
  button {
    width: 100%;
    height: 35px;
    background: ${COLOR.primary_light};
    color: #fff;
    border-radius: 3px;
  }
  ${MEDIA_QUERY.desktop} {
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
const Wrapper = styled.div`
  ${MEDIA_QUERY.desktop} {
    display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
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
    right: 30px;

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

export default function CartMenu({ handleHover, $isOpen }) {
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
        <Wrapper $isOpen={$isOpen}>
          <Triangle $isOpen={$isOpen}>
            <p></p>
          </Triangle>
          <Title>購物車</Title>
          <Items>
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <TotalPrice>總金額 NT$ 3900</TotalPrice>
            <button>訂單結帳</button>
          </Items>
        </Wrapper>
      </MenuContainer>
    </HoverArea>
  )
}
