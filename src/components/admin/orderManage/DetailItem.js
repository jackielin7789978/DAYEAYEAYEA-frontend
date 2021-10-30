import styled from 'styled-components'
import { ImgAnchor } from '../../general'
import { formatPrice, multiplyPrice } from '../../../utils'
import { COLOR } from '../../../constants/style'
import { Link } from 'react-router-dom'

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid ${COLOR.border_grey};
  padding: 10px;
  margin: 0 20px 10px 20px;
  div {
    text-align: center;
    width: 10%;
    margin: 2px 0px;
  }
  div:first-child {
    width: 70%;
    display: flex;
  }
  div:last-child {
    text-align: right;
  }
`
const Pic = styled.div`
  max-width: 70px;
  height: 70px;
  background: url(${({ $img }) => $img}) no-repeat center;
  background-size: cover;
`
const Name = styled(Link)`
  margin: 2px 10px;
  font-weight: bold;
  color: ${COLOR.text_dark};
  &:hover {
    color: ${COLOR.text_dark};
  }
`

export default function Item({ item }) {
  return (
    <ItemContainer>
      <div>
        <Pic $img={JSON.stringify(item.Product.Product_imgs[0].imgUrlSm)}>
          <ImgAnchor to={`/admin/products/detail/${item.productId}`} />
        </Pic>
        <Name to={`/admin/products/detail/${item.productId}`}>
          {item.Product.name}
        </Name>
      </div>
      <div>{formatPrice(item.Product.discountPrice)}</div>
      <div>{item.quantity}</div>
      <div>
        {formatPrice(multiplyPrice(item.Product.discountPrice, item.quantity))}
      </div>
    </ItemContainer>
  )
}
