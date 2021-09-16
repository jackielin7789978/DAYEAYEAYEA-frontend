import styled from "styled-components";
import { COLOR, FONT } from "../constants/style";

const FooterWrapper = styled.div`
  font-family: ${FONT.text_en2};
  background: ${COLOR.warm_1};
`;
const Mainarea = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  color: ${COLOR["text-light"]};
`;
const Column = styled.div`
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ColumnTitle = styled.div`
  padding: 12px;
  margin-bottom: 8px;
  border-bottom: 1px solid ${COLOR["text-light"]};
`;
const PageLink = styled.a`
  text-decoration: none;
  color: ${COLOR["text-light"]};
  cursor: pointer;
`;
const Copyright = styled.div`
  color: ${COLOR["text-light"]};
  text-align: center;
  padding: 20px 0;
  font-size: 14px;
`;
export default function Footer() {
  return (
    <FooterWrapper>
      <Mainarea>
        <Column>
          <ColumnTitle>INFORMATION</ColumnTitle>
          <PageLink>購物需知</PageLink>
          <PageLink>購物需知</PageLink>
          <PageLink>購物需知</PageLink>
          <PageLink>購物需知</PageLink>
        </Column>
        <Column>
          <ColumnTitle>INFORMATION</ColumnTitle>
          <PageLink>購物需知</PageLink>
          <PageLink>購物需知</PageLink>
          <PageLink>購物需知</PageLink>
        </Column>
        <Column>
          <ColumnTitle>INFORMATION</ColumnTitle>
          <PageLink>購物需知</PageLink>
          <PageLink>購物需知</PageLink>
        </Column>
        <Column>
          <ColumnTitle>INFORMATION</ColumnTitle>
          <PageLink>購物需知</PageLink>
          <PageLink>購物需知</PageLink>
        </Column>
      </Mainarea>
      <Copyright>© 2021 DAYEAYEAYEA - All Rights Reserved.</Copyright>
    </FooterWrapper>
  );
}
