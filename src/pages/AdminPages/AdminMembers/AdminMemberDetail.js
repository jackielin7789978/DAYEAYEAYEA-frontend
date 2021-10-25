import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router'
import jwt_decode from 'jwt-decode'
import { getMember } from '../../../webAPI/adminMembersAPI'
import {
  Wrapper,
  ColumnHeader,
  Header,
  TableItemContainer
} from '../../../components/admin/TableStyle'
import { getMemberToLocalStorage } from '../../../utils'
import TableItem from '../../../components/admin/memberManage/TableItem'
import { getTokenFromLocalStorage } from '../../../utils'
import { GeneralBtn } from '../../../components/Button'
import { COLOR, ADMIN_COLOR, ADMIN_MEDIA_QUERY } from '../../../constants/style'
import { useForm } from 'react-hook-form'
const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid transparent;
  padding: 40px 0px;
`
const MemberWrapper = styled.div`
  background: ${ADMIN_COLOR.light_grey};
  position: relative;
  padding: 20px 30px;
`

const List = styled.div`
  margin: 30px;
`
const ListTitle = styled.span`
  margin-right: 20px;
  font-weight: bold;
`
const ListData = styled.span``
const ListInput = styled.input`
  border: solid 1px ${COLOR.border_primary};
  padding: 5px;
  border-radius: 3px;
  width: 50%;
  ::placeholder {
    color: ${COLOR.text_placeholder};
  }
  &:focus {
    border: solid 1px ${COLOR.border_primary_dark};
  }
`
const ErrorMsg = styled.div`
  color: #f24;
`
const EditButton = styled.div`
  width: 100px;
  position: absolute;
  top: 20px;
  right: 30px;
`

const RestyleHeader = styled(Header)`
  width: 12%;
  width: ${({ $name }) => $name === 'Email' && '38%'};
  width: ${({ $name }) => $name === '訂單編號' && '26%'};
`
const headerNames = ['帳號名稱', 'Email', '訂單數', '消費總金額', 'Edit']
export function AdminMemberDetail() {
  const location = useHistory()
  const [member, setMember] = useState(() => {
    return JSON.parse(getMemberToLocalStorage())
  })
  const [isEdit, setIsEdit] = useState(false)
  const handleEdit = () => {
    isEdit ? setIsEdit(false) : setIsEdit(true)
  }
  useEffect(() => {
    let localToken = getTokenFromLocalStorage()
    if (!localToken) return location.push('/admin/login')
    let decoded = jwt_decode(localToken)
    return decoded.id ? location.push('/admin/login') : ''
  }, [location])
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: {
      username: member.username,
      email: member.email,
      fullname: member.fullname,
      phone: member.phone,
      address: member.address
    }
  })
  return (
    <PageWrapper>
      <Wrapper>
        <MemberWrapper>
          <List>
            <ListTitle>帳號:</ListTitle>
            {isEdit ? (
              <>
                <ListInput
                  type='text'
                  {...register('username', { required: true })}
                />
                <ErrorMsg>
                  {errors.username?.type === 'required' && '請填寫名稱'}
                </ErrorMsg>
              </>
            ) : (
              <ListData children={member.username} />
            )}
          </List>
          <List>
            <ListTitle>信箱:</ListTitle>
            {isEdit ? (
              <ListInput
                type='text'
                {...register('email', { required: true })}
              />
            ) : (
              <ListData children={member.email} />
            )}
          </List>
          <List>
            <ListTitle>名稱:</ListTitle>
            {isEdit ? (
              <ListInput
                type='text'
                {...register('fullname', { required: true })}
              />
            ) : (
              <ListData children={member.fullname} />
            )}
          </List>
          <List>
            <ListTitle>電話:</ListTitle>
            {isEdit ? (
              <ListInput
                type='text'
                {...register('phone', { required: true })}
              />
            ) : (
              <ListData children={member.phone} />
            )}
          </List>
          <List>
            <ListTitle>地址:</ListTitle>
            {isEdit ? (
              <ListInput
                type='text'
                {...register('address', { required: true })}
              />
            ) : (
              <ListData children={member.address} />
            )}
          </List>
          <EditButton onClick={handleEdit}>
            <GeneralBtn
              children={isEdit ? '儲存' : '編輯'}
              color={isEdit ? 'admin_blue' : 'admin_grey'}
            />
          </EditButton>
        </MemberWrapper>
        {/* <ColumnHeader>
          {headerNames.map((name) => (
            <RestyleHeader key={name} $name={name}>
              {name}
            </RestyleHeader>
          ))}
        </ColumnHeader>
        <TableItemContainer>
          {members &&
            members.map((member) => (
              <TableItem key={member.id} member={member} />
            ))}
        </TableItemContainer> */}
      </Wrapper>
    </PageWrapper>
  )
}
