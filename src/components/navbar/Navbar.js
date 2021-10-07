import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  COLOR,
  FONT,
  FONT_SIZE,
  EFFECT,
  MEDIA_QUERY
} from '../../constants/style'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import Menu from './Menu'
import CartMenu from '../cartSystem/CartMenu'

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
  justify-content: center;
  align-items: center;
  z-index: 2;
  p:first-child {
    position: absolute;
    top: 13px;
    left: 2vw;
    display: flex;
    ${MEDIA_QUERY.desktop} {
      position: static;
      top: 0;
      width: 0;
      margin: 0;
    }
  }
  p:last-child {
    position: absolute;
    top: 13px;
    right: 2vw;
    display: flex;
    ${MEDIA_QUERY.desktop} {
      position: static;
      top: 0;
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
const LOGO = styled(Link)`
  text-decoration: none;
  color: ${COLOR.text_dark};
  font-size: ${FONT_SIZE.xl};
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
const BurgerBTN = styled.div`
  cursor: pointer;
  margin: 0 2vw;

  display: ${({ $isClicked }) => ($isClicked ? 'none' : 'inline-block')};
  ${MEDIA_QUERY.desktop} {
    padding: 5px;
    position: absolute;
    display: none;
  }
`
const CloseBTN = styled.div`
  cursor: pointer;
  margin: 0 2vw;

  display: ${({ $isClicked }) => ($isClicked ? 'inline-block' : 'none')};
  ${MEDIA_QUERY.desktop} {
    padding: 5px;
    position: absolute;
    display: none;
  }
`
const SearchBTN = styled.div`
  cursor: pointer;
  margin: 0 2vw;

  ${MEDIA_QUERY.desktop} {
    margin-right: 30px;
    padding: 5px;
    position: absolute;
    top: -37px;
    right: 160px;
  }
  @media screen and (min-width: 2560px) {
    right: 20vw;
  }
`
const AccountBTN = styled.div`
  cursor: pointer;
  margin: 0 2vw;
  ${MEDIA_QUERY.desktop} {
    margin-right: 30px;
    padding: 5px;
    position: absolute;
    top: -37px;
    right: 110px;
  }
  @media screen and (min-width: 2560px) {
    right: 18vw;
  }
`
const CartBTN = styled.div`
  cursor: pointer;
  margin: 0 2vw;
  ${MEDIA_QUERY.desktop} {
    margin-right: 30px;
    padding: 5px;
    position: absolute;
    top: -37px;
    right: 60px;
  }
  @media screen and (min-width: 2560px) {
    right: 16vw;
  }
`

export default function Navbar() {
  const [menu, setMenu] = useState('')
  const handleHover = (name) => {
    if (window.innerWidth < 1200) return
    setMenu(name)
  }

  return (
    <>
      <DesktopBar />
      <DesktopContainer>
        <Nav>
          <p>
            <BurgerBTN
              onClick={() => {
                setMenu('menu')
              }}
              $isClicked={menu === 'menu' ? true : false}
            >
              <MenuIcon />
            </BurgerBTN>
            <CloseBTN
              onClick={() => {
                setMenu('')
              }}
              $isClicked={menu !== '' ? true : false}
            >
              <CloseIcon />
            </CloseBTN>
            <SearchBTN
              onClick={() => {
                setMenu('search')
              }}
            >
              <SearchIcon />
            </SearchBTN>
          </p>
          <LOGO to='/'>DAYEAYEAYEA</LOGO>
          <p>
            <AccountBTN
              onClick={() => {
                setMenu('account')
              }}
            >
              <AccountCircleOutlinedIcon />
            </AccountBTN>
            <CartBTN
              onClick={() => {
                setMenu('cart')
              }}
              onMouseOver={() => {
                handleHover('cart')
              }}
              onMouseOut={() => {
                handleHover('')
              }}
            >
              <ShoppingCartOutlinedIcon />
            </CartBTN>
          </p>
        </Nav>
        <Menu $isOpen={menu === 'menu' ? true : false} />
        <CartMenu
          handleHover={handleHover}
          $isOpen={menu === 'cart' ? true : false}
        />
      </DesktopContainer>
    </>
  )
}
