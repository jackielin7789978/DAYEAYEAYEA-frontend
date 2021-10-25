import { useContext, useMemo } from 'react'
import styled from 'styled-components'
import { COLOR, MEDIA_QUERY, FONT_SIZE } from '../../../constants/style'
import OrderTable from '../../../components/memberSystem/OrderTable'
import { LogoutBtn } from '../../../components/Button'


const Container = styled.div`
  width: 90%;
  margin: 24px auto;
  text-align: left;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0 24px;

  h3 {
    font-size: ${FONT_SIZE.lg};
    font-weight: 700;
  }
`

const SubTitle = styled.h5`
  margin: 16px 0;
  font-weight: 700;
`

const MemberInfo = styled.div`
  padding: 12px 16px 0;
  border: 1px solid ${COLOR.border_light_grey};
  ${MEDIA_QUERY.tablet} {
    transform: translateY(5%);
  }
`

const Button = ({ children }) => {
  const style = {
    width: '120px'
  }
  return <LogoutBtn color={'primary'} buttonStyle={style} children={children}/>
}

const Home = ({ profile, logout }) => {
  const newOrder = useMemo(() => {
    if (!profile || profile.Orders.length === 0) return []
    return [profile.Orders[profile.Orders.length-1]]
  }, [profile])

  
  return (
    <Container>
      <Header>
        <h3>Hi! { profile?.fullname }</h3>
        <div onClick={logout}>
          <Button>登出</Button>
        </div>
      </Header>
      <SubTitle>基本資料</SubTitle>
      <MemberInfo>
        <p>會員帳號: { profile?.username }</p>
        <p>會員等級: 一般會員</p>
        <p>電郵: { profile?.email }</p>
      </MemberInfo>
      <SubTitle>最新訂單</SubTitle>
      <OrderTable orders={newOrder} />
    </Container>
  )
}

export default Home
