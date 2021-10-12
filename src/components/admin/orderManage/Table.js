import styled from 'styled-components'
import { COLOR, ADMIN_COLOR } from '../../../constants/style'

const Wrapper = styled.div`
  width: 60%;
  margin: 120px auto;
`
const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-around;
  background: #3689c9;
  padding: 10px 0px 10px 40px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`
const Header = styled.div`
  color: ${COLOR.text_light};
  font-weight: bold;
  width: 15%;
`
const TableItemContainer = styled.div`
  background: ${ADMIN_COLOR.light_grey};
  padding-bottom: 10px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`
const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0px 12px 40px;
  border-top: 4px solid ${COLOR.light};
`
const Cell = styled.span`
  width: 15%;
`
const EditBtn = styled.button`
  background: ${ADMIN_COLOR.editBtn_grey};
  color: ${COLOR.text_light};
  padding: 4px 10px;
  border-radius: 3px;
  transition: ease 0.2s;
  &:hover {
    background: ${ADMIN_COLOR.editBtn_grey_hover};
  }
`

function TableItem() {
  return (
    <Container>
      <Cell>處理中</Cell>
      <Cell>2021101301</Cell>
      <Cell style={{ width: '320px' }}>jackielin1234567899112@gmail.com</Cell>
      <Cell>已付款</Cell>
      <Cell>NT $5990</Cell>
      <Cell>
        <EditBtn>訂單詳情</EditBtn>
      </Cell>
    </Container>
  )
}
export default function Table() {
  return (
    <Wrapper>
      <ColumnHeader>
        <Header>訂單狀態</Header>
        <Header>訂單編號</Header>
        <Header style={{ width: '320px' }}>Email</Header>
        <Header>付款狀態</Header>
        <Header>訂單金額</Header>
        <Header>Edit</Header>
      </ColumnHeader>
      <TableItemContainer>
        <TableItem />
        <TableItem />
        <TableItem />
        <TableItem />
        <TableItem />
        <TableItem />
      </TableItemContainer>
    </Wrapper>
  )
}
