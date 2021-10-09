import { useEffect, useState } from 'react'
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

  // 待修：只有 mobile 和 tablet 需要這個效果
  useEffect(() => {
    if (menu) return (document.body.style.overflow = 'hidden')
    if (!menu) return (document.body.style.overflow = 'scroll')
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
