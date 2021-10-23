import { useEffect, useState } from 'react'
import { Container, Cell } from '../TableStyle'
import { GeneralBtn } from '../../Button'
import { ADMIN_COLOR } from '../../../constants/style'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { getMember } from '../../../webAPI/adminMembersAPI'
const Btn = styled(Link)`
  button {
    min-width: 80px;
    width: 50%;
    background: ${ADMIN_COLOR.Btn_grey};
    &:hover {
      background: ${ADMIN_COLOR.Btn_grey_hover};
    }
  }
`
const RestyledCell = styled(Cell)`
  word-wrap: break-word;
  padding: 0 4px;
`

export default function TableItem({ member }) {
  useEffect(() => {
    ;(async () => {
      const result = await getMember(member.id)
      if (result.ok === 0) return setOrders([])
      return setOrders(result.data.Orders)
    })()
  }, [member.id])
  const [orders, setOrders] = useState([])
  const calTotalPrice = orders.length
    ? orders.map((order) => order.subTotal).reduce((total, num) => total + num)
    : 0
  return (
    <Container>
      <RestyledCell style={{ width: '19%' }}>{member.username}</RestyledCell>
      <RestyledCell style={{ width: '50%' }}>{member.email}</RestyledCell>
      <RestyledCell style={{ width: '20%' }}>{orders.length}</RestyledCell>
      <RestyledCell style={{ width: '13%' }}>{calTotalPrice}</RestyledCell>
      <RestyledCell style={{ width: '16%' }}>
        <Btn to={`/admin/members/${member.id}`}>
          <GeneralBtn children={'編輯'} />
        </Btn>
      </RestyledCell>
    </Container>
  )
}
