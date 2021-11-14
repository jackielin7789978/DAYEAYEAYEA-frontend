import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useHistory, useLocation } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import {
  ColumnHeader,
  Header,
  TableItemContainer
} from '../../../components/admin/TableStyle'
import OrderItem from '../../../components/admin/memberManage/OrderItem'
import { GeneralBtn, LogoutBtn } from '../../../components/Button'
import {
  ADMIN_COLOR,
  FONT_SIZE,
  ADMIN_MEDIA_QUERY
} from '../../../constants/style'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
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
const MemberWrapper = styled.div`
  background: ${ADMIN_COLOR.light_grey};
  position: relative;
  padding: 20px 30px;
  margin: 25px 0px;
`

const List = styled.div`
  margin: 30px;
`
const ListTitle = styled.span`
  margin-right: 20px;
  font-weight: bold;
`
const ListData = styled.span``

const EditButton = styled.div`
  width: 100px;
  position: absolute;
  top: 20px;
  right: 30px;
`
const Msg = styled.div`
  text-align: center;
  padding: 30px;
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
const headerNames = ['訂單狀態', '訂單編號', 'Email', '訂單金額', 'Edit']
export default function AdminMemberDetail() {
  let { id } = useParams()
  const getMember = useFetch(`/admin/members/${id}`)
  const updateMemberLevel = useFetch(`/admin/members/${id}`, {
    method: 'PATCH'
  })
  const location = useHistory()
  const [isEdit, setIsEdit] = useState(false)
  const [memberDetail, setMemberDetail] = useState(() => {
    getMember.fetchData({
      handler: (res) => {
        if (res.ok === 0) {
          return location.push('/404')
        }
        setMemberDetail(res.data)
      }
    })
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
  const TotalPages = memberDetail && [
    ...Array(calTotalPages(memberDetail?.Orders.length)).keys()
  ]

  const handleEdit = () => {
    isEdit ? setIsEdit(false) : setIsEdit(true)
  }
  const { register, handleSubmit, setValue } = useForm()

  useEffect(() => {
    setValue('level', memberDetail?.level)
  }, [memberDetail?.level, setValue])

  const onSubmit = async (submitData) => {
    updateMemberLevel.fetchData({
      bodyData: {
        level: submitData.level
      }
    })
    setMemberDetail({ ...memberDetail, level: submitData.level })
    alert('已編輯完成!')
    handleEdit()
  }

  return (
    <PageWrapper>
      {getMember.isLoading && <AdminIsLoadingComponent />}
      <LogoutBtn
        onClick={() => {
          setMemberDetail(null)
          location.goBack()
        }}
        color={'admin_blue'}
        children={'回會員列表'}
        buttonStyle={{ width: '120px' }}
      />
      <MemberWrapper>
        <List>
          <ListTitle>帳號:</ListTitle>

          <ListData children={memberDetail?.username} />
        </List>
        <List>
          <ListTitle>信箱:</ListTitle>

          <ListData children={memberDetail?.email} />
        </List>
        <List>
          <ListTitle>名稱:</ListTitle>

          <ListData children={memberDetail?.fullname} />
        </List>
        <List>
          <ListTitle>電話:</ListTitle>

          <ListData children={memberDetail?.phone} />
        </List>
        <List>
          <ListTitle>地址:</ListTitle>

          <ListData children={memberDetail?.address} />
        </List>
        <List>
          <ListTitle>會員等級:</ListTitle>
          {!isEdit && <ListData children={memberDetail?.level} />}
          {isEdit && (
            <select {...register('level')}>
              <option value='normal'>normal</option>
              <option value='vip'>vip</option>
            </select>
          )}
        </List>
        <EditButton onClick={isEdit ? handleSubmit(onSubmit) : handleEdit}>
          <GeneralBtn
            children={isEdit ? '儲存' : '編輯'}
            color={isEdit ? 'admin_blue' : 'admin_grey'}
          />
        </EditButton>
      </MemberWrapper>
      <ColumnHeader>
        {headerNames.map((name) => (
          <RestyleHeader key={name} $name={name}>
            {name}
          </RestyleHeader>
        ))}
      </ColumnHeader>

      <TableItemContainer>
        {!memberDetail?.Orders.length && <Msg>客人還沒有訂單喔!</Msg>}
        {memberDetail?.Orders.sort((a, b) => b.id - a.id)
          .slice(offset, offset + ORDERS_PER_PAGE)
          .map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
      </TableItemContainer>
      <Paginator>
        {TotalPages &&
          TotalPages.map((pageValue) => (
            <PaginatorButton
              key={pageValue}
              page={pageValue + 1}
              to={`/admin/members/${id}?page=${pageValue + 1}`}
              active={pageValue + 1 === parseInt(page)}
            ></PaginatorButton>
          ))}
      </Paginator>
    </PageWrapper>
  )
}
