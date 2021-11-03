import styled from 'styled-components'
import { Table } from '../../../components/Table'
import { formatPrice } from '../../../utils'
import { MEDIA_QUERY } from '../../../constants/style'


const ItemTH = styled.th`
  min-width: 50%;
`

const ItemTD = styled.td`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  min-width: 50%;
  max-width: 50%;
  height: 100px;
  padding: 8px 0;

  span {
    padding: 0 16px;
  }

  ${MEDIA_QUERY.desktop} {
    img {
      display: block;
    }
    span {
      width: 50%;
    }
  }
`

const TD = styled.td`
  line-height: 68px;
`

const IMG = styled.img`
  width: 120px;
  height: auto;
  display: none;
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
        { order.map(({ Product, quantity }) => (
            <tr key={Product.id}>
              <ItemTD>
                <IMG src={ Product.Product_imgs[0].imgUrlSm } alt="" />
                <span>{ Product.name }</span>
              </ItemTD>
              <TD>{ formatPrice(Product.discountPrice) }</TD>
              <TD>{ quantity }</TD>
            </tr>
          ))
        }
      </tbody>
    </Table>
  )
}

export default ItemTable
