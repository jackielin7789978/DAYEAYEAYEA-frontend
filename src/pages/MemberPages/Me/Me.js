import { useEffect, useContext } from 'react'
import styled from 'styled-components'
import { UserContext } from '../../../context'
import { COLOR, MEDIA_QUERY, FONT_SIZE } from '../../../constants/style'
import { Tabs } from '../../../components/Tab'
import { PageWidth } from '../../../components/general'
import Home from '../Home'
import Orders from '../Orders'
import Info from '../Info'



const PageWidthHeight = styled(PageWidth)`
  min-height: 600px;
`
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

const TabWrapper = styled.div`
  margin: 30px auto;
  border: 1px solid ${COLOR.border_light_grey};
  ${MEDIA_QUERY.tablet} {
    transform: translateY(5%);
  }
`


export default function Me() {
  const aa = useContext(UserContext)
  useEffect(() => console.log(aa), [])

  return (
    <PageWidthHeight>
      <Container>
        <Title>會員專區</Title>
        <TabWrapper>
          <Tabs
            tabs={['會員首頁', '訂單紀錄', '會員資料']}
            tabsPanel={[<Home user={aa.user} />, <Orders />, <Info />]}
            presetTab={0}
          />
        </TabWrapper>
      </Container>
    </PageWidthHeight>
  )
}
