import { useEffect, useState } from 'react'

import styled from 'styled-components'
import { getAllMembers } from '../../../webAPI/adminMembersAPI'
import {
  Wrapper,
  ColumnHeader,
  Header,
  TableItemContainer
} from '../../../components/admin/TableStyle'
import { ADMIN_MEDIA_QUERY } from '../../../constants/style'
import TableItem from '../../../components/admin/memberManage/MemberItem'
import { Search } from '../../../components/admin/memberManage/Search'
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid transparent;
  margin: 40px auto;
  width: 76%;
  ${ADMIN_MEDIA_QUERY.md} {
    width: 60%;
  }
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
const Msg = styled.div`
  text-align: center;
  padding: 30px;
`
export default function AdminMembers() {
  const [members, setMembers] = useState(() => {
    ;(async () => {
      const result = await getAllMembers()
      setMembers(result.data)
    })()
  })
  const [value, setValue] = useState('')
  const [membersFilter, setMembersFilter] = useState()
  useEffect(() => {
    let reg = new RegExp(value, 'i')
    value
      ? setMembersFilter(
          members.filter(
            (member) =>
              reg.test(member.username) ||
              reg.test(member.email) ||
              reg.test(member.fullname) ||
              reg.test(member.phone)
          )
        )
      : setMembersFilter(members)
  }, [members, value])

  return (
    <PageWrapper>
      <SearchContainer>
        <Search value={value} setValue={setValue} />
      </SearchContainer>
      <Wrapper>
        <ColumnHeader>
          {headerNames.map((name) => (
            <RestyleHeader key={name} $name={name}>
              {name}
            </RestyleHeader>
          ))}
        </ColumnHeader>
        <TableItemContainer>
          {membersFilter &&
            membersFilter
              .sort((a, b) => b.id - a.id)
              .map((member) => <TableItem key={member.id} member={member} />)}
          {!membersFilter?.length && <Msg>沒有符合條件的客人</Msg>}
        </TableItemContainer>
      </Wrapper>
    </PageWrapper>
  )
}
