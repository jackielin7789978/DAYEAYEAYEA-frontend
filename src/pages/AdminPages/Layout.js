import { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from './Navbar'
import Footer from './Footer'
import jwt_decode from 'jwt-decode'
import { getTokenFromLocalStorage } from '../../utils'
import { AdminContext, NavClickContext } from '../../context'
import useFetch from '../../hooks/useFetch'

const Wrapper = styled.div`
  display: flex;
  height: calc(100vh - 24px);
`

const Container = styled.div`
  flex-grow: 1;
  overflow: auto;
  padding: 6px 0 12px;
  position: relative;
`

const Layout = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false)
  const history = useHistory()
  const [isSuperAdmin, setIsSuperAdmin] = useState(true)
  const [isNavClick, setIsNavClick] = useState(true)
  const { fetchData: adminCheck } = useFetch('/admin/me')

  useEffect(() => {
    adminCheck({
      handler: () => setIsAdmin(true),
      errorHandler: () => {
        alert('請先登入')
        history.push('/admin/login')
        setIsAdmin(false)
      }
    })
  }, [adminCheck, history])

  useEffect(() => {
    const token = getTokenFromLocalStorage()
    let adminData
    try {
      adminData = jwt_decode(token)
      if (adminData.username === 'admin01') setIsSuperAdmin(false)
    } catch (e) {
      console.log(e)
    }
  }, [])

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token')
    history.push('/admin/login')
  }, [history])

  return (
    isAdmin && (
      <AdminContext.Provider value={{ isSuperAdmin, setIsSuperAdmin }}>
        <NavClickContext.Provider
          value={{
            isNavClick,
            setIsNavClick
          }}
        >
          <Wrapper>
            <Navbar handleLogout={handleLogout} />
            <Container>{children}</Container>
          </Wrapper>
          <Footer />
        </NavClickContext.Provider>
      </AdminContext.Provider>
    )
  )
}

export default Layout
