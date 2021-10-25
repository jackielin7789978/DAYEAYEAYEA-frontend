import styled from 'styled-components'
import { Table } from '../Table'


const ItemTH = styled.th`
  min-width: 50%;
`

const ItemTD = styled.td`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  min-width: 50%;
  height: 100px;
`

const TD = styled.td`
  line-height: 68px;
`



const IMG = styled.img`
  width: 120px;
  height: auto;
`


const ItemTable = ({ order }) => {

  return (
    <Table col={3}>
      <thead>
        <tr>
          <ItemTH>購買項目</ItemTH>
          <th>金額</th>
          <th>數量</th>
        </tr>
      </thead>
      <tbody>
        { order.map((item) => (
            <tr>
              <ItemTD>
                <IMG src="https://images.unsplash.com/photo-1602409339188-95d178a611a0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" alt="" />
                <span>123</span>
              </ItemTD>
              <TD>$1380</TD>
              <TD>1</TD>
            </tr>
          ))
        }
      </tbody>
    </Table>
  )
}

export default ItemTable
