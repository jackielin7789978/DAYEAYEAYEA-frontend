import styled from 'styled-components'
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

export const AdminPageHeight = styled.div``

// 非滿版用 PageWidth, AdminPageWidth 包
export const PageWidth = styled.div`
  width: 90%;
  margin: 0 auto;
  text-align: center;
  ${MEDIA_QUERY.desktop} {
    max-width: 1200px;
  }
`
export const AdminPageWidth = styled.div``

// 滿版用 FullWidth 包
export const FullWidth = styled.div`
  width: 100%;
  text-align: center;
`
