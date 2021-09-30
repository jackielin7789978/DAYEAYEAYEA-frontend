import styled from "styled-components";
import { Link } from "react-router-dom";

// 撐主頁面用，已加在 Route 外面，單一頁面不用再套
export const PageContainer = styled.div`
  margin-top: 120px;
  flex: 1;
`;

// 可包在圖片裡的連結 component，height 需視圖片高度另外加上去
export const ImgAnchor = styled(Link)`
  display: inline-block;
  width: 100%;
  color: transparent;
  &:hover {
    color: transparent;
  }
`;
