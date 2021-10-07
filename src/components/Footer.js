import styled from "styled-components";
import { COLOR, FONT, FONT_SIZE, MEDIA_QUERY } from "../constants/style";
import { Link } from "react-router-dom";

const FooterContainer = styled.div`
  width: 100%;
  font-family: ${FONT.logo};
  background: ${COLOR.primary_dark};
  color: ${COLOR.text_light};
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: 20px;
  padding-bottom: 80px;
  ${MEDIA_QUERY.tablet} {
    flex-direction: row;
    justify-content: center;
  }
  ${MEDIA_QUERY.desktop} {
    flex-direction: row;
    justify-content: center;
  }
`;
const ColumnContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  ${MEDIA_QUERY.tablet} {
    margin-top: 10px;
    width: unset;
  }
  ${MEDIA_QUERY.desktop} {
    margin-top: 10px;
    width: unset;
  }
`;
const Column = styled.div`
  padding: 10px;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: ${FONT_SIZE.sm};
  ${MEDIA_QUERY.tablet} {
    width: 160px;
    font-size: ${FONT_SIZE.md};
  }
  ${MEDIA_QUERY.desktop} {
    width: 200px;
    font-size: ${FONT_SIZE.md};
  }
`;
const ColumnTitle = styled.div`
  width: 80%;
  white-space:nowrap;
  text-align: center;
  padding: 8px 0;
  margin-bottom: 8px;
  border-bottom: 1px solid ${COLOR.text_light};
  color: ${COLOR.text_light};\
`;
const PageLink = styled(Link)`
  text-decoration: none;
  color: ${COLOR.text_light};
  padding: 2px 0;
  &:hover {
    color: ${COLOR.text_dark};
  }
`;
const ColumnDesc = styled.div`
  text-align: center;
  color: ${COLOR.text_light};
  padding: 2px 0;
  p {
    margin: 2px;
    color: ${COLOR.text_light};
    font-size: ${FONT_SIZE.xs};
    ${MEDIA_QUERY.tablet} {
      font-size: ${FONT_SIZE.sm};
    }
    ${MEDIA_QUERY.desktop} {
      font-size: ${FONT_SIZE.sm};
    }
  }
`;
const Copyright = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  color: ${COLOR.text_light};
  text-align: center;
  font-size: ${FONT_SIZE.sm};
  padding: 20px 0;
  ${MEDIA_QUERY.tablet} {
    font-size: ${FONT_SIZE.md};
  }
  ${MEDIA_QUERY.desktop} {
    font-size: ${FONT_SIZE.md};
  }
`;
export default function Footer() {
  return (
    <FooterContainer>
      <ColumnContainer>
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
      </ColumnContainer>
      <ColumnContainer>
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
      </ColumnContainer>
      <Copyright>© 2021 DAYEAYEAYEA - All Rights Reserved.</Copyright>
    </FooterContainer>
  );
}
