import styled from "styled-components";
import { COLOR, FONT, FONT_SIZE } from "../constants/style";

const FooterWrapper = styled.div`
  font-family: ${FONT.logo};
  background: ${COLOR.primary_dark};
  height: 260px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Mainarea = styled.div`
  display: flex;
  justify-content: center;
  color: ${COLOR.text_light};
  margin-top: 20px;
`;
const Column = styled.div`
  margin: 0 30px;
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
`;
const PageLink = styled.a`
  color: ${COLOR.text_light};
  &:hover {
    color: ${COLOR.text_dark};
  }
`;
const ColumnDesc = styled.div`
  text-align: center;
  p {
    font-size: ${FONT_SIZE.sm};
    margin: 2px;
  }
`;
const Copyright = styled.div`
  color: ${COLOR.text_light};
  text-align: center;
  margin-bottom: 20px;
  font-size: ${FONT_SIZE.sm};
`;
export default function Footer() {
  return (
    <FooterWrapper>
      <Mainarea>
        <Column>
          <ColumnTitle>INFORMATION</ColumnTitle>
          <PageLink>購物需知</PageLink>
          <PageLink>常見問題</PageLink>
          <PageLink>隱私權條款</PageLink>
        </Column>
        <Column>
          <ColumnTitle>ABOUT US</ColumnTitle>
          <PageLink>品牌理念</PageLink>
          <PageLink>加入我們</PageLink>
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
      </Mainarea>
      <Copyright>© 2021 DAYEAYEAYEA - All Rights Reserved.</Copyright>
    </FooterWrapper>
  );
}
