import {
  Wrapper,
  ColumnHeader,
  Header,
  TableItemContainer,
  Container,
  Cell
} from '../TableStyle'
import { GeneralBtn } from '../../Button'
import { ADMIN_COLOR } from '../../../constants/style'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

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

function TableItem({ item }) {
  return (
    <Container>
      <Cell>{item.status}</Cell>
      <Cell>{item.createdAt}</Cell>
      <Cell style={{ width: '40%' }}>jackielin1234567899112@gmail.com</Cell>
      <Cell>NT $5990</Cell>
      <Cell>
        <Btn to={`/admin/orders/${item.id}`}>
          <GeneralBtn children={'訂單詳情'} />
        </Btn>
      </Cell>
    </Container>
  )
}

export default function Table({ headerNames, data }) {
  return (
    <Wrapper>
      <ColumnHeader>
        {headerNames.map((name) => (
          <Header key={name} $name={name}>
            {name}
          </Header>
        ))}
      </ColumnHeader>
      <TableItemContainer>
        {data.map((item) => (
          <TableItem key={item.id} item={item} />
        ))}
      </TableItemContainer>
    </Wrapper>
  )
}
