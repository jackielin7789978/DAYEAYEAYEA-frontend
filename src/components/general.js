import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { MEDIA_QUERY } from '../constants/style'

// 撐頁面高度用，已加在 Route 外面
export const PageHeight = styled.div`
  position: relative;
  margin-top: 49px;
  width: 100%;
  flex: 1;
  ${MEDIA_QUERY.desktop} {
    margin-top: 121px;
  }
`
export const AdminPageWidth = styled.div`
  position: relative;
  min-height: 100vh;
  height: calc(100vh);
  width: 90%;
  min-height: 100vh;
  margin: 0 auto;
`

// 非滿版用 PageWidth 包
export const PageWidth = styled.div`
  width: 90%;
  margin: 0 auto;
  text-align: center;
  ${MEDIA_QUERY.desktop} {
    max-width: 1200px;
  }
`

// 滿版用 FullWidth 包
export const FullWidth = styled.div`
  width: 100%;
  text-align: center;
`

// 可包在圖片裡的連結 component，height 需視圖片高度另外加上去
export const ImgAnchor = styled(Link)`
  display: inline-block;
  width: 100%;
  color: transparent;
  &:hover {
    color: transparent;
  }
`
