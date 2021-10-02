import styled from "styled-components";
import { COLOR, FONT, FONT_SIZE } from "../constants/style";
import { Link } from "react-router-dom";

const FooterContainer = styled.div`
  font-family: ${FONT.logo};
  background: ${COLOR.primary_dark};
  color: ${COLOR.text_light};
  height: 280px;
  width: 100%;
  display: flex;
  position: relative;
  justify-content: center;
`;

const Column = styled.div`
  height: 200px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ColumnTitle = styled.div`
  width: 160px;
  text-align: center;
  padding: 10px 0;
  margin-bottom: 8px;
  border-bottom: 1px solid ${COLOR.text_light};
  color: ${COLOR.text_light};
`;
const PageLink = styled(Link)`
  text-decoration: none;
  color: ${COLOR.text_light};
  &:hover {
    color: ${COLOR.text_dark};
  }
`;
const ColumnDesc = styled.div`
  text-align: center;
  color: ${COLOR.text_light};
  p {
    font-size: ${FONT_SIZE.sm};
    margin: 2px;
    color: ${COLOR.text_light};
  }
`;
const Copyright = styled.div`
  position: absolute;
  bottom: 0;
  color: ${COLOR.text_light};
  text-align: center;
  font-size: ${FONT_SIZE.sm};
  padding: 10px 0;
`;
export default function Footer() {
  return (
    <FooterContainer>
      <Column>
        <ColumnTitle>INFORMATION</ColumnTitle>
        <PageLink to="/info/notice">購物需知</PageLink>
        <PageLink to="/info/FAQ">常見問題</PageLink>
        <PageLink to="/info/privacy">隱私權條款</PageLink>
      </Column>
      <Column>
        <ColumnTitle>ABOUT US</ColumnTitle>
        <PageLink to="/info/brand">品牌理念</PageLink>
        <PageLink to="/info/join">加入我們</PageLink>
      </Column>
      <Column>
        <ColumnTitle>STORE LOCATION</ColumnTitle>
        <ColumnDesc>
          門市資訊<p>台北市大安區師大路 88 號</p>
        </ColumnDesc>
      </Column>
      <Column>
        <ColumnTitle>CONTACT</ColumnTitle>
        <ColumnDesc>
          客服專線<p>02-2829-3031</p>
        </ColumnDesc>
        <ColumnDesc>
          客服信箱<p>dayeayeayea@gmail.com</p>
        </ColumnDesc>
      </Column>
      <Copyright>© 2021 DAYEAYEAYEA - All Rights Reserved.</Copyright>
    </FooterContainer>
  );
}
