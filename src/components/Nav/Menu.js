import styled from "styled-components";
import { COLOR, FONT_SIZE, MEDIA_QUERY } from "../../constants/style";
import { Link } from "react-router-dom";

const CategoryContainer = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: ${({ $isOpen }) => ($isOpen ? "50px" : "-100vh")};
  background: ${COLOR.primary_light};
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s;
  z-index: 1;
  ${MEDIA_QUERY.desktop} {
    flex-direction: row;
    background: transparent;
    position: static;
    height: 90px;
    width: unset;
  }
`;
const Category = styled(Link)`
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

export default function Menu({ $isOpen }) {
  return (
    <CategoryContainer $isOpen={$isOpen}>
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
