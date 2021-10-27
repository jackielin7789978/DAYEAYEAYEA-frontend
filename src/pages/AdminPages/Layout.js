import styled from 'styled-components'
import Navbar from './Navbar'
import Footer from './Footer'


const Wrapper = styled.div`
  display: flex;
`

const Container = styled.div`
  height: 100vh;
  flex-grow: 1;
  overflow: auto;
`

const Layout = ({ children }) => {
  
  return (
    <>
      <Wrapper>
        <Navbar/>
        <Container>
          { children }
        </Container>
      </Wrapper>
      <Footer/>
    </>
  )
};

export default Layout
