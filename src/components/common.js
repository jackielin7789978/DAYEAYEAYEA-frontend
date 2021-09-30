import styled from "styled-components";
import { Link } from "react-router-dom";

export const PageContainer = styled.div`
  margin-top: 120px;
  flex: 1;
`;

export const ImgAnchor = styled(Link)`
  display: inline-block;
  width: 100%;
  outline: 1px solid gold;
  color: transparent;
`;
