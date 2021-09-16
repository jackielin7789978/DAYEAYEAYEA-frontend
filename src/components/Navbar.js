import styled from "styled-components";
import { COLOR, FONT } from "../constants/style";
import { Link } from "react-router-dom";

const NavbarWrapper = styled.div`
  width: 100%;
  font-family: ${FONT.text_en2};
`;
const TopContainer = styled.div`
  color: ${COLOR["text-light"]};
  background: ${COLOR.warm_3};
`;
const Wrapper = styled.div`
  max-width: 1680px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const Icons = styled.div`
  display: flex;
`;
const Icon = styled.div`
  padding: 4px 16px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.1);
  }
`;
const BottomContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  position: relative;
  z-index: 2;
  padding: 25px 0 20px;
  box-shadow: 0px 5px 10px 1px rgba(100, 100, 100, 0.2);
`;
const LOGO = styled.div`
  font-size: 40px;
  cursor: pointer;
  color: #333;
  margin-right: 40px;
  font-family: ${FONT.logo_jackie1};
`;
const PageLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  padding: 8px 22px;
  font-size: 16px;
  color: ${COLOR["text-dark"]};
  &:hover {
    color: ${COLOR.warm_5};
  }
`;

export default function Navbar() {
  return (
    <NavbarWrapper>
      <TopContainer>
        <Wrapper>
          <Icons>
            <Icon>Search</Icon>
            <Icon>Login / Register</Icon>
            <Icon>Cart</Icon>
          </Icons>
        </Wrapper>
      </TopContainer>
      <BottomContainer>
        <LOGO>DAYEAYEAYEA</LOGO>
        <PageLink to="/">所有商品</PageLink>
        <PageLink to="/">秋季精選</PageLink>
        <PageLink to="/">個人用品</PageLink>
        <PageLink to="/">廚房餐具</PageLink>
        <PageLink to="/">文具雜貨</PageLink>
        <PageLink to="/">戶外用品</PageLink>
      </BottomContainer>
    </NavbarWrapper>
  );
}
