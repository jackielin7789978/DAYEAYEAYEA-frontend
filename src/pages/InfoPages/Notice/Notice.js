import styled from 'styled-components'
import { COLOR, MEDIA_QUERY, FONT_SIZE } from '../../../constants/style'
import { PageWidth } from '../../../components/general'


const Container = styled.div`
  margin: 60px auto 0;
  width: 80%;
  min-width: 450px;
`

const Title = styled.div`
  font-size: ${FONT_SIZE.lg};
  margin-top: 30px;
  font-weight: bold;
`

const Content = styled.div`
  text-align: left;
  h3 {
    margin: 32px 0 12px;
  }

  p + p {
    margin-top: 8px;
  }
`


export default function Notice() {
  return (
    <PageWidth>
      <Container>
        <Title>隱私權條款</Title>
        <Content>
          <h3>免責聲明</h3>
          <p>當您使用本站，代表您了解並遵守以下規章：</p>
          <p>根據 FTC 規定，請假設本站中所推薦的商家、產品均有合作關係，當使用者於站內連結到第三方商家網站並進行消費 ，本站將獲得部分消費金額作為傭金回報並維持本站營運的開銷，但這不影響您所購買任何商品的價格，本站也不會 多收您任何一分一毛。</p>
          <p>本站將不負責任何用戶與商家之間的交易。任何取消、更改訂單請直接與商家客服聯絡。本站將不參與及協助任何消 費者與商家之間的糾紛。</p>
          <p>所有來信諮詢的信件我們不會將資料轉發給其他方或商家，信箱及個人資訊僅供本站與用戶聯繫。</p>

          <h3>退貨政策</h3>
          <p>台灣境內交易七天鑑賞期</p>
          <p>台灣境內交易，根據台灣消保法第十九條規範，享有收到商品後隔日起算七天內無條件退換貨的服務，且商品退回運費由賣方承擔。 請保持商品包裝完整寄回，經賣方確認無誤後，即可申請退款。</p>
        </Content>
      </Container>
    </PageWidth>
  )
}
