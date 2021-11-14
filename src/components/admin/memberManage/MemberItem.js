import { Container, Cell } from '../TableStyle'
import { GeneralBtn } from '../../Button'
import { ADMIN_COLOR } from '../../../constants/style'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { formatPrice } from '../../../utils'

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
const RestyledContainer = styled(Container)``
const RestyledCell = styled(Cell)`
  word-wrap: break-word;
  padding: 0 4px;
`

export default function TableItem({ member }) {
  const calTotalPrice =
    member.Orders.length > 0
      ? member?.Orders.map((order) => order.subTotal).reduce(
          (total, num) => total + num
        )
      : 0
  return (
    <RestyledContainer>
      <RestyledCell style={{ width: '19%' }}>{member.username}</RestyledCell>
      <RestyledCell style={{ width: '50%' }}>{member.email}</RestyledCell>
      <RestyledCell style={{ width: '15%' }}>
        {member.Orders.length}
      </RestyledCell>
      <RestyledCell style={{ width: '18%' }}>
        {formatPrice(calTotalPrice)}
      </RestyledCell>
      <RestyledCell style={{ width: '16%' }}>
        <Btn to={`/admin/members/${member.id}`}>
          <GeneralBtn children={'詳情'} />
        </Btn>
      </RestyledCell>
    </RestyledContainer>
  )
}
