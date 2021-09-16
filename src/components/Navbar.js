import styled from "styled-components";
import { COLOR, FONT } from "../constants/style";
import { Link } from "react-router-dom";

const NavbarWrapper = styled.div`
  width: 100%;
  font-family: ${FONT.text_en2};
`;
const TopContainer = styled.div`
  color: ${COLOR["text_light"]};
  background: ${COLOR.navbar};
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
  background: ${COLOR.background_light};
  position: relative;
  z-index: 2;
  padding: 25px 0 20px;
  box-shadow: 0px 5px 10px 1px ${COLOR.box_shadow};
`;
const LOGO = styled.div`
  font-size: 42px;
  cursor: pointer;
  color: ${COLOR["text_dark"]};
  margin-right: 40px;
  font-family: ${FONT.logo};
`;
const PageLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  padding: 8px 22px;
  font-size: 16px;
  color: ${COLOR["text_dark"]};
  &:hover {
    color: ${COLOR.navbar_link_hover};
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
