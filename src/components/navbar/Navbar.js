import styled from 'styled-components'
import {
  COLOR,
  FONT,
  FONT_SIZE,
  EFFECT,
  MEDIA_QUERY
} from '../../constants/style'
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import Menu from './Menu'
import { useState } from 'react'
import Cart from '../cartSystem/Cart'

const DesktopBar = styled.div`
  ${MEDIA_QUERY.desktop} {
    position: fixed;
    width: 100%;
    display: static;
    height: 40px;
    background: ${COLOR.primary_light};
    z-index: 1;
  }
`
const DesktopContainer = styled.div`
  ${MEDIA_QUERY.desktop} {
    background: ${COLOR.light};
    position: fixed;
    top: 40px;
    width: 100%;
    height: 90px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: ${EFFECT.shadow_dark};
    z-index: 2;
  }
`
const Nav = styled.nav`
  background: ${COLOR.primary_light};
  position: fixed;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 2;
  p {
    margin: 0 5%;
    width: 100px;
    display: flex;
    justify-content: space-around;

    ${MEDIA_QUERY.desktop} {
      width: 0;
      margin: 0;
    }
  }
  ${MEDIA_QUERY.desktop} {
    position: static;
    width: unset;
    background: transparent;
    font-family: ${FONT.logo};
    top: 30px;
    height: 90px;
    box-shadow: none;
  }
`
const BurgerBTN = styled(MenuIcon)`
  cursor: pointer;
  display: ${({ $isClicked }) => ($isClicked ? 'none' : 'inline-block')};
  ${MEDIA_QUERY.desktop} {
    display: none;
  }
`
const CloseBTN = styled(CloseIcon)`
  cursor: pointer;
  position: absolute;
  top: 13px;
  left: 30px;
  display: ${({ $isClicked }) => ($isClicked ? 'inline-block' : 'none')};
  ${MEDIA_QUERY.desktop} {
    display: none;
  }
`
const LOGO = styled(Link)`
  text-decoration: none;
  font-size: ${FONT_SIZE.lg};
  color: ${COLOR.text_dark};
  font-family: ${FONT.logo};
  &:hover {
    color: ${COLOR.text_dark};
  }
  ${MEDIA_QUERY.tablet} {
    font-size: ${FONT_SIZE.xxl};
  }
  ${MEDIA_QUERY.desktop} {
    font-size: ${FONT_SIZE.xxxl};
    position: relative;
  }
`

const SearchBTN = styled(SearchIcon)`
  cursor: pointer;
  ${MEDIA_QUERY.desktop} {
    position: absolute;
    top: -32px;
    right: 19vw;
  }
`
const AccountBTN = styled(AccountCircleOutlinedIcon)`
  cursor: pointer;
  ${MEDIA_QUERY.desktop} {
    position: absolute;
    top: -32px;
    right: 16vw;
  }
`
const CartBTN = styled(ShoppingCartOutlinedIcon)`
  cursor: pointer;
  ${MEDIA_QUERY.desktop} {
    position: absolute;
    top: -32px;
    right: 13vw;
  }
`

export default function Navbar() {
  const [menu, setMenu] = useState('')

  return (
    <>
      <DesktopBar />
      <DesktopContainer>
        <Nav>
          <p>
            {!menu && (
              <BurgerBTN
                onClick={() => {
                  setMenu('menu')
                }}
                $isClicked={menu === 'menu' ? true : false}
              />
            )}
            <CloseBTN
              onClick={() => {
                setMenu('')
              }}
              $isClicked={menu !== '' ? true : false}
            />
            {!menu && (
              <SearchBTN
                onClick={() => {
                  setMenu('search')
                }}
              />
            )}
          </p>
          <LOGO to='/'>DAYEAYEAYEA</LOGO>
          <p>
            {!menu && (
              <AccountBTN
                onClick={() => {
                  setMenu('account')
                }}
              />
            )}
            {!menu && (
              <CartBTN
                onClick={() => {
                  setMenu('cart')
                }}
              />
            )}
          </p>
        </Nav>
        <Menu $isOpen={menu === 'menu' ? true : false} />
        <Cart $isOpen={menu === 'cart' ? true : false} />
      </DesktopContainer>
    </>
  )
}
