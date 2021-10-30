import { useEffect, useState, useContext } from 'react'
import { LocalStorageContext } from '../../context'
import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
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
  const { totalItems } = useContext(LocalStorageContext)
  const handleHover = (name) => {
    if (window.innerWidth < 1200) return
    setMenu(name)
  }
  const { pathname } = useLocation()
  useEffect(() => {
    setMenu('')
  }, [pathname, setMenu])

  useEffect(() => {
    if (window.innerWidth > 1200) return
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
              $shouldHide={menu ? true : false}
            >
              <FontAwesomeIcon icon={faBars} />
            </BurgerBTN>
            <CloseBTN
              onClick={() => {
                setMenu('')
              }}
              $isClicked={menu !== '' ? true : false}
            >
              <FontAwesomeIcon icon={faTimes} />
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
              <FontAwesomeIcon icon={faSearch} />
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
              <FontAwesomeIcon icon={faUserCircle} />
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
              <FontAwesomeIcon icon={faShoppingCart} />
              {totalItems ? <span>{totalItems}</span> : null}
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
          $setMenu={setMenu}
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
