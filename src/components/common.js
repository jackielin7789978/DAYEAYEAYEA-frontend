import styled from "styled-components";
import { Link } from "react-router-dom";
import { MEDIA_QUERY } from "../constants/style";

// 撐主頁面用，已加在 Route 外面，單一頁面不用再套
export const PageHeight = styled.div`
  margin-top: 50px;
  width: 100%;
  flex: 1;
  ${MEDIA_QUERY.desktop} {
    margin-top: 121px;
  }
`;

// 非滿版一律用 PageWidth 包
export const PageWidth = styled.div`
  width: 90%;
  margin: 0 auto;
  text-align: center;
  border: 1px solid transparent;
  ${MEDIA_QUERY.desktop} {
    max-width: 1200px;
  }

  outline: 1px solid lightgrey;
`;
// 滿版用 FullWidth
export const FullWidth = styled.div`
  width: 100%;
  text-align: center;
  border: 1px solid transparent;
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
