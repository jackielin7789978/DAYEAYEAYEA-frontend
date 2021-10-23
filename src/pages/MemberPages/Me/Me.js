import { useMemo } from 'react'
import styled from 'styled-components'
import { COLOR, MEDIA_QUERY, FONT_SIZE } from '../../../constants/style'
import { Tabs } from '../../../components/Tab'
import { PageWidth } from '../../../components/general'
import Home from './Home'
import Orders from './Orders'
import OrderDetail from './OrderDetail'
import Info from './Info'



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

const activeMapping = {
  me: 0,
  orders: 1,
  'modify-info': 2,
}


export default function Me({ history }) {
  const active = useMemo(() => {
    const path = history.location.pathname.replace('/member/', '')
    return activeMapping[path]
  }, [history])

  return (
    <PageWidthHeight>
      <Container>
        <Title>會員專區</Title>
        <TabWrapper>
          <Tabs
            tabs={['會員首頁', '訂單紀錄', '訂單詳情', '會員資料']}
            tabsPanel={[<Home />, <Orders />, <OrderDetail />, <Info />]}
            presetTab={0}
            routeActive={active}
          />
        </TabWrapper>
      </Container>
    </PageWidthHeight>
  )
}
