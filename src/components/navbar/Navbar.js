import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import CategoryMenu from './CategoryMenu'
import CartMenu from '../cartSystem/CartMenu'
import AccountMenu from './AccountMenu'
import SearchMenu from './SearchMenu'
import {
  DesktopBar,
  DesktopContainer,
  Nav,
  LeftIcons,
  RightIcons,
  LOGO,
  BurgerBTN,
  CloseBTN,
  SearchBTN,
  AccountBTN,
  CartBTN
} from './NavbarStyled'

export default function Navbar() {
  const [menu, setMenu] = useState('')

  const handleHover = (name) => {
    if (window.innerWidth < 1200) return
    setMenu(name)
  }
  const { pathname } = useLocation()
  useEffect(() => {
    setMenu('')
  }, [pathname, setMenu])

  useEffect(() => {
    if (window.matchMedia('min-width: 1200px')) return
    if (menu) return (document.body.style.overflowY = 'hidden')
    if (!menu) return (document.body.style.overflowY = 'scroll')
  }, [menu])

  return (
    <>
      <DesktopBar />
      <DesktopContainer>
        <Nav>
          <LeftIcons>
            <BurgerBTN
              onClick={() => {
                setMenu('category')
              }}
              $isClicked={menu === 'category' ? true : false}
              $shouldHide={menu ? true : false}
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
              onMouseOver={() => {
                handleHover('search')
              }}
              onMouseOut={() => {
                handleHover('')
              }}
              $shouldHide={menu ? true : false}
            >
              <SearchIcon />
            </SearchBTN>
          </LeftIcons>
          <LOGO to='/'>DAYEAYEAYEA</LOGO>
          <RightIcons>
            <AccountBTN
              onClick={() => {
                setMenu('account')
              }}
              onMouseOver={() => {
                handleHover('account')
              }}
              onMouseOut={() => {
                handleHover('')
              }}
              $shouldHide={menu ? true : false}
            >
              <AccountCircleOutlinedIcon />
            </AccountBTN>
            <CartBTN
              onClick={() => {
                setMenu('cart')
              }}
              onMouseEnter={() => {
                handleHover('cart')
              }}
              onMouseLeave={() => {
                handleHover('')
              }}
              $shouldHide={menu ? true : false}
            >
              <ShoppingCartOutlinedIcon />
            </CartBTN>
          </RightIcons>
        </Nav>
        <CategoryMenu $isOpen={menu === 'category' ? true : false} />
        <CartMenu
          handleHover={handleHover}
          $isOpen={menu === 'cart' ? true : false}
          $menu={menu}
        />
        <AccountMenu
          handleHover={handleHover}
          $isOpen={menu === 'account' ? true : false}
          $menu={menu}
        />
        <SearchMenu
          handleHover={handleHover}
          $isOpen={menu === 'search' ? true : false}
          $menu={menu}
        />
      </DesktopContainer>
    </>
  )
}
