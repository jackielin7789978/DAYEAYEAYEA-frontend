import {
  Wrapper,
  ColumnHeader,
  Header,
  TableItemContainer,
  Container,
  Cell,
  EditBtn
} from '../TableStyle'

function TableItem({ item }) {
  return (
    <Container>
      <Cell>{item.status}</Cell>
      <Cell>{item.id}</Cell>
      <Cell style={{ width: '40%' }}>jackielin1234567899112@gmail.com</Cell>
      <Cell>NT $5990</Cell>
      <Cell>
        <EditBtn>訂單詳情</EditBtn>
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
