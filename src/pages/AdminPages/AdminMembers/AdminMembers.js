import { useEffect, useLayoutEffect, useState, useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { getAllMembers } from '../../../webAPI/adminMembersAPI'
import {
  ColumnHeader,
  Header,
  TableItemContainer
} from '../../../components/admin/TableStyle'
import { ADMIN_MEDIA_QUERY, FONT_SIZE } from '../../../constants/style'
import TableItem from '../../../components/admin/memberManage/MemberItem'
import { Search } from '../../../components/admin/memberManage/Search'
import { LoadingContext } from '../../../context'
import { AdminIsLoadingComponent } from '../../../components/admin/AdminIsLoading'
import { calTotalPages } from '../../../utils'
import { PaginatorButton } from '../../../components/admin/PaginatorStyle'
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 40px auto;
  width: 75vw;
  font-size: ${FONT_SIZE.sm};
  ${ADMIN_MEDIA_QUERY.md} {
    max-width: 1280px;
    font-size: ${FONT_SIZE.md};
  }
  ${ADMIN_MEDIA_QUERY.lg} {
    max-width: 1280px;
    font-size: ${FONT_SIZE.md};
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
const Paginator = styled.div`
  text-align: center;
  margin: 20px;
`

const headerNames = ['帳號名稱', 'Email', '訂單數', '消費總金額', 'Edit']
const Msg = styled.div`
  text-align: center;
  padding: 30px;
`
export default function AdminMembers() {
  const { isLoading, setIsLoading } = useContext(LoadingContext)
  const location = useHistory()
  const [members, setMembers] = useState(() => {
    ;(async () => {
      const result = await getAllMembers()
      if (result.ok === 0) {
        return location.push('/404')
      }
      setMembers(result.data)
      setIsLoading(false)
    })()
  })
  const [offset, setOffset] = useState(0)
  const query = useLocation().search
  const [page, setPage] = useState()
  useEffect(() => {
    const param = new URLSearchParams(query)
    param.get('page') ? setPage(param.get('page')) : setPage('1')
    setOffset((page - 1) * 10)
  }, [page, query])
  const ORDERS_PER_PAGE = 10
  const TotalPages = members && [...Array(calTotalPages(members.length)).keys()]
  const [value, setValue] = useState('')
  const [membersFilter, setMembersFilter] = useState()
  useLayoutEffect(() => {
    setIsLoading(true)
  }, [setIsLoading])
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
      {isLoading && <AdminIsLoadingComponent />}
      <SearchContainer>
        <Search value={value} setValue={setValue} />
      </SearchContainer>
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
            .slice(offset, offset + ORDERS_PER_PAGE)
            .map((member) => <TableItem key={member.id} member={member} />)}
        {!membersFilter?.length && <Msg>沒有符合條件的客人</Msg>}
      </TableItemContainer>
      <Paginator>
        {TotalPages &&
          TotalPages.map((pageValue) => (
            <PaginatorButton
              key={pageValue}
              page={pageValue + 1}
              to={`/admin/members?page=${pageValue + 1}`}
              active={pageValue + 1 === parseInt(page)}
            ></PaginatorButton>
          ))}
      </Paginator>
    </PageWrapper>
  )
}
