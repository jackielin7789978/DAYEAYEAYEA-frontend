import { useContext } from 'react'
import styled from 'styled-components'
import { NavLink, Link, useLocation, withRouter } from 'react-router-dom'


const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 230px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`

const Avatar = styled.div`
  
`

const NavbarList = styled.div`
  display: flex;
  flex-direction: column;
`

const Nav = styled(NavLink, {
  activeClassName: 'active',
})`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 120px;
  cursor: pointer;
  color: #000;
  text-decoration: none;

  &.active {
    background: rgba(0, 0, 0, 0.1);
  }
`

const Navbar = ({ history }) => {
  const location = useLocation()
  const { pathname } = location
  const handleLogout = () => {
    // setAuthToken('')
    // setUser(null)
    if (pathname !== '/') history.push('/')
  }

  return (
    <HeaderContainer>
      <Avatar to="/">
        
      </Avatar>
      <NavbarList>
        <Nav exact to="/">會員管理</Nav>
        <Nav to="/new_post">訂單管理</Nav>
        <Nav to="/about">商品管理</Nav>
        <Nav to="/about">活動管理</Nav>
        <Nav to="/about">分類頁面</Nav>
      </NavbarList>
    </HeaderContainer>
  )
}

export default withRouter(Navbar)
