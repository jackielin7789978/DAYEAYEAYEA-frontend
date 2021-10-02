import styled from "styled-components";
import {
  COLOR,
  FONT,
  EFFECT,
  FONT_SIZE,
  MEDIA_QUERY,
} from "../constants/style";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useContext } from "react";
import { MenuContext } from "../contexts";

const NavbarContainer = styled.div`
  width: 100%;
  ${MEDIA_QUERY.desktop} {
    font-family: ${FONT.logo};
    position: fixed;
    top: 0;
    z-index: 3;
  }
`;
const DesktopBar = styled.div`
  ${MEDIA_QUERY.desktop} {
    height: 30px;
    color: ${COLOR.text_light};
    background: ${COLOR.primary_light};
    position: relative;
    display: flex;
    justify-content: flex-end;
  }
`;
const DesktopWrapper = styled.div`
  display: none;
  ${MEDIA_QUERY.desktop} {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 90px;
    background: ${COLOR.light};
    box-shadow: ${EFFECT.shadow_dark};
    position: static;
  }
`;
const MainBar = styled.div`
  height: 50px;
  background: ${COLOR.text_light};
  text-align: center;
  z-index: 3;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  ${MEDIA_QUERY.desktop} {
    height: 100%;
    position: static;
    background: transparent;
  }
`;
const LOGO = styled(Link)`
  text-decoration: none;
  font-size: ${FONT_SIZE.lg};
  line-height: 50px;
  color: ${COLOR.text_dark};
  font-family: ${FONT.logo};
  padding: 10px;
  ${MEDIA_QUERY.desktop} {
    font-size: ${FONT_SIZE.logo};
    line-height: 90px;
    outline: 1px solid red;
  }
`;
const MenuContainer = styled.div`
  position: absolute;
  height: 100vh;
  transition: ease 0.3s;
  top: ${(props) => (props.$isOpen ? "50px" : "-100vh")};
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  padding-top: 40px;
  background: ${COLOR.primary_light};
  display: flex;
  flex-direction: column;
  align-items: center;
  ${MEDIA_QUERY.desktop} {
    flex-direction: row;
    background: transparent;
    position: static;
    height: 90px;
    margin-top: -40px;
  }
`;
const MenuItem = styled(Link)`
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  border-bottom: 1px solid ${COLOR.border_light};
  font-size: ${FONT_SIZE.md};
  width: 80%;
  color: ${COLOR.text_light};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
  &:hover {
    color: ${COLOR.primary_dark};
  }
  ${MEDIA_QUERY.desktop} {
    color: ${COLOR.text_dark};
    font-size: ${FONT_SIZE.md};
    height: 90px;
    padding: 0 22px;
  }
`;
const MenuBTN = styled(MenuIcon)`
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 20px;
  display: ${(props) => (props.$isOpen ? "none" : "inline-block")};
  ${MEDIA_QUERY.desktop} {
    display: none;
  }
`;
const CloseBTN = styled(CloseOutlinedIcon)`
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 20px;
  display: ${(props) => (props.$isOpen ? "inline-block" : "none")};
  ${MEDIA_QUERY.desktop} {
    display: none;
  }
`;
const Icons = styled.div`
  ${MEDIA_QUERY.desktop} {
    display: flex;
    position: absolute;
    top: 3px;
    right: 60px;
    width: 140px;
    justify-content: space-between;
  }
`;
const AccountBTN = styled(AccountCircleOutlinedIcon)`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 60px;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.1);
  }
  ${MEDIA_QUERY.desktop} {
    position: static;
  }
`;
const SearchBTN = styled(SearchIcon)`
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 55px;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.1);
  }
  ${MEDIA_QUERY.desktop} {
    position: static;
  }
`;
const CartBTN = styled(ShoppingCartOutlinedIcon)`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 20px;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.1);
  }
  ${MEDIA_QUERY.desktop} {
    position: static;
  }
`;
function Menu({ isOpen, setIsOpen }) {
  useContext(MenuContext);
  return (
    <MenuContainer $isOpen={isOpen}>
      <MenuItem to="/">所有商品</MenuItem>
      <MenuItem to="/">居家生活</MenuItem>
      <MenuItem to="/">服飾配件</MenuItem>
      <MenuItem to="/">廚房餐具</MenuItem>
      <MenuItem to="/">食材雜貨</MenuItem>
      <MenuItem to="/">設計文具</MenuItem>
      <MenuItem to="/">休閒戶外</MenuItem>
    </MenuContainer>
  );
}
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const openMenu = () => {
    setIsOpen(true);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };
  return (
    <MenuContext.Provider value={{ isOpen, setIsOpen }}>
      <NavbarContainer>
        <DesktopBar>
          <Icons>
            <SearchBTN />
            <AccountBTN />
            <CartBTN />
          </Icons>
        </DesktopBar>
        <DesktopWrapper>
          <MainBar $isOpen={isOpen}>
            <MenuBTN onClick={openMenu} $isOpen={isOpen} />
            <CloseBTN onClick={closeMenu} $isOpen={isOpen} />
            <SearchBTN />
            <LOGO to="/">DAYEAYEAYEA</LOGO>
            <AccountBTN />
            <CartBTN />
          </MainBar>
          <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
        </DesktopWrapper>
      </NavbarContainer>
    </MenuContext.Provider>
  );
}
