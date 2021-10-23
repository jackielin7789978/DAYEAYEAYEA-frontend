import styled from 'styled-components'
import { COLOR, MEDIA_QUERY, FONT_SIZE } from '../../../constants/style'
import { PageWidth } from '../../../components/general'


const Container = styled.div`
  margin: 20px auto 0;
  padding: 20px;
  width: 60%;
  min-width: 450px;
`

const Title = styled.div`
  font-size: ${FONT_SIZE.lg};
  margin: 30px 0 24px;
  font-weight: bold;
`

const Content = styled.div`
  text-align: left;
  h3 {
    margin: 32px 0 12px;
  }

  h5 {
    margin: 12px 0;
  }

  p + p {
    margin-top: 8px;
  }
`

export default function Privacy() {
  return (
    <PageWidth>
      <Container>
        <Title>隱私權條款</Title>
        <Content>
          <p>非常歡迎您光臨「Give++ 二手交易平台」（以下簡稱本網站），為了讓您能夠安心的使用本網站的各項服務與資訊，特此向您說明本網站的隱私權保護政策，以保障您的權益，請您詳閱下列內容：</p>

          <h5>一、隱私權保護政策的適用範圍</h5>
          <p>隱私權保護政策內容，包括本網站如何處理在您使用網站服務時收集到的個人識別資料。隱私權保護政策不適用於本網站以外的相關連結網站，也不適用於非本網站所委託或參與管理的人員。</p>
        
          <h5>二、個人資料的蒐集、處理及利用方式</h5>
          <p>當您造訪本網站或使用本網站所提供之功能服務時，我們將視該服務功能性質，請您提供必要的個人資料，並在該特定目的範圍內處理及利用您的個人資料；非經您書面同意，本網站不會將個人資料用於其他用途。</p>

          <h5>三、資料之保護</h5>
          <p>本網站主機均設有防火牆、防毒系統等相關的各項資訊安全設備及必要的安全防護措施，加以保護網站及您的個人資料採用嚴格的保護措施，只由經過授權的人員才能接觸您的個人資料，相關處理人員皆簽有保密合約，如有違反保密義務者，將會受到相關的法律處分。</p>
          <p>如因業務需要有必要委託其他單位提供服務時，本網站亦會嚴格要求其遵守保密義務，並且採取必要檢查程序以確定其將確實遵守。</p>
          
          <h5>四、網站對外的相關連結</h5>
          <p>本網站的網頁提供其他網站的網路連結，您也可經由本網站所提供的連結，點選進入其他網站。但該連結網站不適用本網站的隱私權保護政策，您必須參考該連結網站中的隱私權保護政策。</p>

          <h5>五、與第三人共用個人資料之政策</h5>
          <p>本網站絕不會提供、交換、出租或出售任何您的個人資料給其他個人、團體、私人企業或公務機關。</p>

          <h5>六、隱私權保護政策之修正</h5>
          <p>本網站隱私權保護政策將因應需求隨時進行修正，修正後的條款將刊登於網站上。</p>
        </Content>
      </Container>
    </PageWidth>
  )
}
