import { useState, useEffect, useMemo, useCallback } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { COLOR, MEDIA_QUERY, FONT_SIZE } from '../../../constants/style'
import { Tabs } from '../../../components/Tab'
import { PageWidth } from '../../../components/general'
import { IsLoadingComponent as Loading } from '../../../components/IsLoading'
import Home from '../Home'
import Orders from '../Orders'
import Info from '../Info'
import { getMe } from '../../../webAPI/memberAPI'


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

const Wrapper = styled.div`
  margin: 30px auto;
  min-height: 400px;
  border: 1px solid ${COLOR.border_light_grey};
  ${MEDIA_QUERY.tablet} {
    transform: translateY(5%);
  }
`

export default function Me() {
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState(null)
  const history = useHistory()
  const tabIndex = useMemo(() => {
    const path = history.location.pathname
    const urlMapping = {
      '/member/orders': 1,
      '/member/info': 2
    }
    return urlMapping[path] || 0
  }, [history])
  const logout = useCallback(() => {
    localStorage.removeItem('token')
    history.push('/')
  }, [history])

  useEffect(() => {
    setIsLoading(() => true)
    getMe()
      .then(res => {
        setIsLoading(() => false)
        setProfile(res.data)
      })
  }, [history.location.pathname])


  return (
    <PageWidthHeight>
      { isLoading && <Loading/> }
      <Container>
        <Title>會員專區</Title>
        <Wrapper>
          <Tabs
            tabs={['會員首頁', '訂單紀錄', '會員資料']}
            tabsPanel={[
              <Home profile={profile} logout={logout} />, 
              <Orders orders={profile?.Orders} />, 
              <Info profile={profile} />
            ]}
            presetTab={0}
            changeTab={tabIndex}
          />
        </Wrapper>
      </Container>
    </PageWidthHeight>
  )
}
