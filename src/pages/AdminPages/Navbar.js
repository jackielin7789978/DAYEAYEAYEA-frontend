import { useState, useContext } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ModalContext } from '../../context'
import {
  faShoppingCart,
  faUserFriends,
  faEye,
  faImages,
  faSignOutAlt,
  faAngleLeft
} from '@fortawesome/free-solid-svg-icons'

const NavWrapper = styled.nav`
  width: 230px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0 48px;
  background: #333;
  transition: all linear 0.3s;

  ${({ $active }) =>
    $active &&
    `
    margin-left: -230px;
  `}
`

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #fff;
  margin: 50px auto;
  overflow: hidden;

  img {
    width: 140%;
    height: auto;
  }
`

const NavbarList = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const Nav = styled(NavLink, {
  activeClass: 'active'
})`
  text-align: center;
  padding: 16px 0;
  cursor: pointer;
  font-size: 20px;
  color: #fff;
  text-decoration: none;
  border-bottom: 1px solid #ccc;

  span {
    margin-left: 16px;
    color: #fff;
  }

  &.active {
    background: #555;
  }

  &:hover {
    background: #555;
  }
`

const LogoutButton = styled.button`
  width: 80%;
  font-size: 18px;
  font-weight: 700;
  border-radius: 10px;
  color: #003169;
  background: #cecece;
  padding: 10px 4px;
  transition: all 0.3s;

  svg {
    margin-right: 6px;
  }

  &:hover {
    color: #cecece;
    background: #aaa;
  }
`

const SwitchButton = styled.button`
  position: absolute;
  display: block;
  width: 30px;
  height: 60px;
  top: 50%;
  right: -30px;
  color: #fff;
  z-index: 10;

  background: #333c;
  font-size: 24px;
  border-radius: 0 10px 10px 0;
  transform: translateY(-50%);

  ${({ $active }) =>
    $active &&
    `
    svg {
      transform: scale(-1);
    }
  `}
`

const Navbar = ({ handleLogout }) => {
  const [active, setActive] = useState(false)
  const { setIsNavClick } = useContext(ModalContext)
  return (
    <NavWrapper $active={active}>
      <NavbarList>
        <Avatar to='/'>
          <img src='https://i.imgur.com/jPZXt9T.png' alt='' />
        </Avatar>
        <Nav exact to='/admin/members'>
          <FontAwesomeIcon icon={faUserFriends} />
          <span>會員管理</span>
        </Nav>
        <Nav to='/admin/orders'>
          <FontAwesomeIcon icon={faShoppingCart} />
          <span>訂單管理</span>
        </Nav>
        <Nav to='/admin/products/1'>
          <FontAwesomeIcon icon={faEye} />
          <span>商品管理</span>
        </Nav>
        <Nav to='/admin/4'>
          <FontAwesomeIcon icon={faImages} />
          <span>活動管理</span>
        </Nav>
      </NavbarList>
      <LogoutButton onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} />
        Logout
      </LogoutButton>
      <SwitchButton
        $active={active}
        onClick={() => {
          setIsNavClick((isNavClick) => !isNavClick)
          setActive((pre) => !pre)
        }}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </SwitchButton>
    </NavWrapper>
  )
}

export default Navbar
