import { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import {
  ColumnHeader,
  Header,
  TableItemContainer
} from '../../../components/admin/TableStyle'
import { ADMIN_MEDIA_QUERY, FONT_SIZE } from '../../../constants/style'
import TableItem from '../../../components/admin/memberManage/MemberItem'
import { Search } from '../../../components/admin/memberManage/Search'
import { AdminIsLoadingComponent } from '../../../components/admin/AdminIsLoading'
import { calTotalPages } from '../../../utils'
import { PaginatorButton } from '../../../components/admin/PaginatorStyle'
import useFetch from '../../../hooks/useFetch'
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 40px auto;
  width: 75vw;
  font-size: ${FONT_SIZE.sm};
  ${ADMIN_MEDIA_QUERY.md} {
    max-width: 1680px;
    font-size: ${FONT_SIZE.md};
  }
  ${ADMIN_MEDIA_QUERY.lg} {
    max-width: 1680px;
    font-size: ${FONT_SIZE.md};
  }
`
const SearchContainer = styled.div`
  margin: 20px 0px;
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
  const {
    isLoading,
    error,
    fetchData: getAllMembers
  } = useFetch('/admin/members')
  const location = useHistory()
  const [isSearching, setIsSearching] = useState(false)
  const [members, setMembers] = useState(() => {
    getAllMembers({
      handler: (res) => {
        setMembers(res.data)
      }
    })
  })
  useEffect(() => {
    if (error) {
      return location.push('/404')
    }
  }, [location, error])

  const [offset, setOffset] = useState(0)
  const query = useLocation().search
  const [page, setPage] = useState()
  useEffect(() => {
    if (isSearching) {
      setPage('1')
      return setOffset(0)
    }
    const param = new URLSearchParams(query)
    param.get('page') ? setPage(param.get('page')) : setPage('1')
    setOffset((page - 1) * 10)
  }, [page, query, isSearching])

  const ORDERS_PER_PAGE = 10
  const [search, setSearch] = useState('')

  const [membersFilter, setMembersFilter] = useState()
  const TotalPages = membersFilter && [
    ...Array(calTotalPages(membersFilter.length)).keys()
  ]

  useEffect(() => {
    let reg = new RegExp(search, 'i')
    search
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
  }, [members, search])
  return (
    <PageWrapper>
      {isLoading && <AdminIsLoadingComponent />}
      <SearchContainer>
        <Search
          search={search}
          setSearch={setSearch}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
        />
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
      <Paginator onClick={() => setIsSearching(false)}>
        {TotalPages &&
          membersFilter.length > 10 &&
          TotalPages.map((pagesearch) => (
            <PaginatorButton
              key={pagesearch}
              page={pagesearch + 1}
              to={`/admin/members?page=${pagesearch + 1}`}
              active={pagesearch + 1 === parseInt(page)}
            ></PaginatorButton>
          ))}
      </Paginator>
    </PageWrapper>
  )
}
