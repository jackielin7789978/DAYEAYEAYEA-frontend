import styled from "styled-components";
import {
  COLOR,
  FONT,
  EFFECT,
  FONT_SIZE,
  MEDIA_QUERY,
} from "../constants/style";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const NavbarWrapper = styled.div`
  ${MEDIA_QUERY.desktop} {
    width: 100%;
    font-family: ${FONT.logo};
    position: fixed;
    top: 0;
    z-index: 1;
  }
`;
const Top = styled.div`
  display: none;
  ${MEDIA_QUERY.desktop} {
    height: 30px;
    color: ${COLOR.text_light};
    background: ${COLOR.primary_light};
    position: relative;
    display: flex;
    justify-content: flex-end;
  }
`;
const Icons = styled.div`
  display: flex;
  margin-right: 40px;
`;
const Icon = styled.div`
  padding: 4px 16px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.1);
  }
`;
const Wrapper = styled.div`
  height: 100%;
  width: 90vw;
  max-width: 1800px;
  margin: 0 auto;
  ${MEDIA_QUERY.desktop} {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;
const Bottom = styled.div`
  height: 90px;
  background: ${COLOR.light};
  position: relative;
  z-index: 2;
  box-shadow: ${EFFECT.shadow_dark};
`;
const LOGO = styled(Link)`
  text-decoration: none;
  font-size: ${FONT_SIZE.logo};
  color: ${COLOR.text_dark};
  font-family: ${FONT.logo};
  padding: 10px;
  &:hover {
    color: ${COLOR.text_dark};
  }
`;
const ControllerContrainer = styled.button`
  background: transparent;
  ${MEDIA_QUERY.desktop} {
    display: none;
  }
`;

const CategoryContainer = styled.div`
  position: absolute;
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background: ${COLOR.primary_light};
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    width: 100%;
    height: 12%;
    display: flex;
    justify-content: center;
    align-items: center;
    ${MEDIA_QUERY.desktop} {
      display: none;
    }
  }
  ${MEDIA_QUERY.desktop} {
    flex-direction: row;
    background: ${COLOR.light};
    position: static;
    height: 90px;
  }
`;
const Category = styled(Link)`
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  border-bottom: 1px solid ${COLOR.border_light};
  font-size: ${FONT_SIZE.xl};
  width: 80%;
  color: ${COLOR.text_light};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 12%;
  &:hover {
    color: ${COLOR.primary_dark};
  }
  ${MEDIA_QUERY.desktop} {
    color: ${COLOR.text_dark};
    font-size: ${FONT_SIZE.md};
    padding: 0 22px;
  }
`;
const CloseMenu = styled(FontAwesomeIcon)`
  height: 100%;
  position: absolute;
  left: 5%;
  ${MEDIA_QUERY.desktop} {
    display: none;
  }
`;

function MenuController() {
  const handleMenuClick = () => {};
  return (
    <ControllerContrainer onClick={handleMenuClick}>
      <FontAwesomeIcon icon={faBars} size="2x" />
    </ControllerContrainer>
  );
}
function Menu() {
  return (
    <CategoryContainer>
      <div>
        <CloseMenu icon={faTimes} size="2x" />
        <LOGO to="/">DAYEAYEAYEA</LOGO>
      </div>
      <Category to="/">所有商品</Category>
      <Category to="/">居家生活</Category>
      <Category to="/">服飾配件</Category>
      <Category to="/">廚房餐具</Category>
      <Category to="/">食材雜貨</Category>
      <Category to="/">設計文具</Category>
      <Category to="/">休閒戶外</Category>
    </CategoryContainer>
  );
}
function Search() {
  return <></>;
}
function Account() {
  return <></>;
}
function Cart() {
  return <></>;
}
export default function Navbar() {
  return (
    <NavbarWrapper>
      <Top>
        <Icons>
          <Icon>Search</Icon>
          <Icon>Login / Register</Icon>
          <Icon>Cart</Icon>
        </Icons>
      </Top>
      <Bottom>
        <Wrapper>
          <MenuController />
          <Search />
          <LOGO to="/">DAYEAYEAYEA</LOGO>
          <Account />
          <Cart />
          <Menu />
        </Wrapper>
      </Bottom>
    </NavbarWrapper>
  );
}
