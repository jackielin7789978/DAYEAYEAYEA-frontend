import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getAllMembers } from '../../../webAPI/adminMembersAPI'
import {
  Wrapper,
  ColumnHeader,
  Header,
  TableItemContainer
} from '../../../components/admin/TableStyle'
import { ADMIN_MEDIA_QUERY } from '../../../constants/style'
import TableItem from '../../../components/admin/memberManage/TableItem'
import { Search } from '../../../components/admin/memberManage/Search'
import AdminMemberDetail from '../../../components/admin/memberManage/AdminMemberDetail'
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
  const [members, setMembers] = useState(() => {
    ;(async () => {
      const result = await getAllMembers()
      setMembers(result.data)
    })()
  })
  let { id } = useParams()
  const [member, setMember] = useState()
  useEffect(() => {
    id
      ? setMember(
          () =>
            members && members.filter((member) => member.id === Number(id))[0]
        )
      : setMember(null)
  }, [id, members])
  return (
    <PageWrapper>
      {!member && (
        <SearchContainer>
          <Search />
        </SearchContainer>
      )}
      <Wrapper>
        {member && <AdminMemberDetail member={member} $setMember={setMember} />}
        {!member && (
          <>
            <ColumnHeader>
              {headerNames.map((name) => (
                <RestyleHeader key={name} $name={name}>
                  {name}
                </RestyleHeader>
              ))}
            </ColumnHeader>
            <TableItemContainer>
              {members &&
                members.map((member) => (
                  <TableItem
                    key={member.id}
                    member={member}
                    $setMember={setMember}
                  />
                ))}
            </TableItemContainer>
          </>
        )}
      </Wrapper>
    </PageWrapper>
  )
}
