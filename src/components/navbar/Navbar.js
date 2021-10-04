import styled from "styled-components";
import {
  COLOR,
  FONT,
  FONT_SIZE,
  EFFECT,
  MEDIA_QUERY,
} from "../../constants/style";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Menu from "./Menu";
import Burger from "./Burger";
import { useState } from "react";

const DesktopBar = styled.div`
  ${MEDIA_QUERY.desktop} {
    position: fixed;
    width: 100%;
    display: static;
    height: 40px;
    background: ${COLOR.primary_light};
    z-index: 1;
  }
`;
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
`;
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
`;
const LOGO = styled(Link)`
  text-decoration: none;
  font-size: ${FONT_SIZE.lg};
  color: ${COLOR.text_dark};
  font-family: ${FONT.logo};
  &:hover {
    color: ${COLOR.text_dark};
  }
  ${MEDIA_QUERY.desktop} {
    font-size: ${FONT_SIZE.xxl};
    position: relative;
  }
`;

const SearchBTN = styled(SearchIcon)`
  cursor: pointer;
  ${MEDIA_QUERY.desktop} {
    position: absolute;
    top: -32px;
    right: 10vw;
  }
`;
const AccountBTN = styled(AccountCircleOutlinedIcon)`
  cursor: pointer;
  ${MEDIA_QUERY.desktop} {
    position: absolute;
    top: -32px;
    right: 7vw;
  }
`;
const CartBTN = styled(ShoppingCartOutlinedIcon)`
  cursor: pointer;
  ${MEDIA_QUERY.desktop} {
    position: absolute;
    top: -32px;
    right: 4vw;
  }
`;
function Search() {
  return (
    <SearchBTN>
      <SearchIcon />
    </SearchBTN>
  );
}
function Account() {
  return (
    <AccountBTN>
      <AccountCircleOutlinedIcon />
    </AccountBTN>
  );
}
function Cart() {
  return (
    <CartBTN>
      <ShoppingCartOutlinedIcon />
    </CartBTN>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <DesktopBar />
      <DesktopContainer>
        <Nav>
          <p>
            <Burger
              $isOpen={isOpen}
              handleOpen={handleOpen}
              handleClose={handleClose}
            />
            <Search />
          </p>
          <LOGO to="/">DAYEAYEAYEA</LOGO>
          <p>
            <Account />
            <Cart />
          </p>
        </Nav>
        <Menu $isOpen={isOpen} />
      </DesktopContainer>
    </>
  );
}
