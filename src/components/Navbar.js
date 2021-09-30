import styled from "styled-components";
import { COLOR, FONT, EFFECT, FONT_SIZE } from "../constants/style";
import { Link } from "react-router-dom";

const NavbarWrapper = styled.div`
  width: 100%;
  font-family: ${FONT.logo};
`;
const TopContainer = styled.div`
  height: 40px;
  color: ${COLOR.text_light};
  background: ${COLOR.primary_light};
  position: relative;
`;
const Icons = styled.div`
  display: flex;
  position: absolute;
  top: 4px;
  right: 30px;
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
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const BottomContainer = styled.div`
  height: 100px;
  background: ${COLOR.background_light};
  position: relative;
  z-index: 2;
  box-shadow: ${EFFECT.shadow_dark};
`;
const LOGO = styled.div`
  font-size: ${FONT_SIZE.logo};
  cursor: pointer;
  color: ${COLOR.text_dark};
  margin-right: 40px;
  font-family: ${FONT.logo};
`;
const PageLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  padding: 8px 22px;
  font-size: ${FONT_SIZE.md};
  color: ${COLOR.text_dark};
  &:hover {
    color: ${COLOR.primary_dark};
  }
`;

export default function Navbar() {
  return (
    <NavbarWrapper>
      <TopContainer>
        <Icons>
          <Icon>Search</Icon>
          <Icon>Login / Register</Icon>
          <Icon>Cart</Icon>
        </Icons>
      </TopContainer>
      <BottomContainer>
        <Wrapper>
          <LOGO>DAYEAYEAYEA</LOGO>
          <div>
            <PageLink to="/">所有商品</PageLink>
            <PageLink to="/">居家生活</PageLink>
            <PageLink to="/">服飾配件</PageLink>
            <PageLink to="/">廚房餐具</PageLink>
            <PageLink to="/">食材雜貨</PageLink>
            <PageLink to="/">設計文具</PageLink>
            <PageLink to="/">休閒戶外</PageLink>
          </div>
        </Wrapper>
      </BottomContainer>
    </NavbarWrapper>
  );
}
