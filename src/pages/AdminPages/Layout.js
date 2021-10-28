import { useEffect, useCallback } from 'react'
import { useHistory } from "react-router-dom";
import { adminCheck } from '../../webAPI/adminAPIs'
import styled from 'styled-components'
import Navbar from './Navbar'
import Footer from './Footer'


const Wrapper = styled.div`
  display: flex;
  height: calc(100vh - 36px);
`

const Container = styled.div`
  flex-grow: 1;
  overflow: auto;
  padding: 6px 0 12px;
`

const Layout = ({ children }) => {
  const history = useHistory();
  useEffect(() => {
    ;(async () => {
      if(await adminCheck()) return
      
      alert('請先登入!!!')
      history.push('/admin/login')
    })()
  }, [history, children])

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token')
    history.go(0)
  }, [history])
  
  return (
    <>
      <Wrapper>
        <Navbar handleLogout={handleLogout}/>
        <Container>
          { children }
        </Container>
      </Wrapper>
      <Footer/>
    </>
  )
};

export default Layout
