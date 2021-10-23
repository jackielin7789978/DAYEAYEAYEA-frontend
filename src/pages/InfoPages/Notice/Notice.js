import styled from 'styled-components'
import { MEDIA_QUERY, FONT_SIZE } from '../../../constants/style'
import { PageWidth } from '../../../components/general'


const Container = styled.div`
  margin: 60px auto 60px;
  padding: 0 8px;
  width: 90%;
  ${MEDIA_QUERY.desktop} {
    width: 80%;
  }
`

const Title = styled.div`
  margin-top: 40px;
  font-size: ${FONT_SIZE.lg};
  font-weight: bold;
  ${MEDIA_QUERY.tablet} {
    margin-top: 60px;
    font-size: ${FONT_SIZE.xl};
  }
  ${MEDIA_QUERY.desktop} {
    margin-top: 80px;
    font-size: ${FONT_SIZE.xxl};
  }
`

const Content = styled.div`
  width: 100%;
  text-align: left;
  h3 {
    margin: 48px 0 12px;
    font-size: ${FONT_SIZE.lg};
    ${MEDIA_QUERY.tablet} {
      font-size: ${FONT_SIZE.lg};
    }
    ${MEDIA_QUERY.desktop} {
      font-size: ${FONT_SIZE.xl};
    }
  }

  p {
    margin: 0;
    ${MEDIA_QUERY.tablet} {
      font-size: ${FONT_SIZE.md};
    }
    ${MEDIA_QUERY.desktop} {
      font-size: ${FONT_SIZE.md};
    }
  }

  p + p {
    margin-top: 8px;
  }
`

export default function Notice() {
  return (
    <PageWidth>
      <Container>
        <Title>購物需知</Title>
        <Content>
          <h3>免責聲明</h3>
          <p>當您使用本站，代表您了解並遵守以下規章：</p>
          <p>根據 FTC 規定，請假設本站中所推薦的商家、產品均有合作關係，當使用者於站內連結到第三方商家網站並進行消費 ，本站將獲得部分消費金額作為傭金回報並維持本站營運的開銷，但這不影響您所購買任何商品的價格，本站也不會 多收您任何一分一毛。</p>
          <p>本站將不負責任何用戶與商家之間的交易。任何取消、更改訂單請直接與商家客服聯絡。本站將不參與及協助任何消 費者與商家之間的糾紛。</p>
          <p>所有來信諮詢的信件我們不會將資料轉發給其他方或商家，信箱及個人資訊僅供本站與用戶聯繫。</p>

          <h3>退貨政策</h3>
          <p>台灣境內交易七天鑑賞期</p>
          <p>本賣場非七天猶豫期商店，不接受個人因素，如：不喜歡、尺寸不合、不符合個人期待等...理由退換貨</p>
          <p>當您確認購買後，即代表您同意本賣場購買規則。如不接受者，請勿隨意下單。</p>
        </Content>
      </Container>
    </PageWidth>
  )
}
