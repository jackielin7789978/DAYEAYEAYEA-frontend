import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router'
import jwt_decode from 'jwt-decode'
import { getAllMembers } from '../../../webAPI/adminMembersAPI'
import {
  Wrapper,
  ColumnHeader,
  Header,
  TableItemContainer
} from '../../../components/admin/TableStyle'
import { ADMIN_MEDIA_QUERY } from '../../../constants/style'
import TableItem from '../../../components/admin/memberManage/TableItem'
// import { Search } from '../../../components/admin/memberManage/Search'
import { getTokenFromLocalStorage } from '../../../utils'
const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid transparent;
  padding: 40px 0px;
`
const SearchContainer = styled.div`
  margin: 20px auto;
  display: flex;
  width: 78vw;
  ${ADMIN_MEDIA_QUERY.md} {
    width: 68vw;
    max-width: 1180px;
  }
  ${ADMIN_MEDIA_QUERY.lg} {
    max-width: 1180px;
  }
`
const RestyleHeader = styled(Header)`
  width: 12%;
  width: ${({ $name }) => $name === 'Email' && '38%'};
  width: ${({ $name }) => $name === '訂單編號' && '26%'};
`
const headerNames = ['帳號名稱', 'Email', '訂單數', '消費總金額', 'Edit']
export default function AdminMembers() {
  const location = useHistory()
  const [members, setMembers] = useState(() => {
    ;(async () => {
      const result = await getAllMembers()
      setMembers(result.data)
    })()
  })
  useEffect(() => {
    let localToken = getTokenFromLocalStorage()
    if (!localToken) return location.push('/admin/login')
    let decoded = jwt_decode(localToken)
    return decoded.id ? location.push('/admin/login') : ''
  }, [location])
  return (
    <>
      <div>AdminMembers</div>
    </>
  )
}
