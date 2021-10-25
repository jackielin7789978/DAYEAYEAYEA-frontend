import styled from 'styled-components'
import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  changeProductStatus,
  changeProductQuantity
} from '../../../webAPI/adminProductsAPI'
import { GeneralBtn } from '../../Button'
import { ItemCounter } from '../../Counter'
import {
  Wrapper,
  ColumnHeader,
  Header,
  TableItemContainer,
  Container,
  Cell
} from '../TableStyle'

const NameHeader = styled(Header)`
  text-align: center;
  width: 12%;
  width: ${({ $name }) => $name === '商品名稱' && '22%'};
  margin: 0px 3px;
`
const NameCell = styled(Cell)`
  text-align: center;
  width: 22%;
  margin: 0px 3px;
`
const ProductCell = styled(Cell)`
  text-align: center;
  width: 12%;
  margin: 0px 3px;
`
const ImgCell = styled(Cell)`
  width: 12%;
  height: 80px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0px 3px;
`
const QuantityCounter = styled(ItemCounter)`
  background-color: transparent;
`
const ButtonContainer = styled.div`
  width: 70%;
  margin: 0px auto;
`
function StatusButton({ id, status }) {
  let color = status === 'on' ? 'admin_blue' : 'admin_grey'
  let content = status === 'on' ? '上架中' : '下架中'
  return (
    <GeneralBtn color={color} id={id}>
      {content}
    </GeneralBtn>
  )
}

function TableItem({ product }) {
  const {
    id,
    name,
    price,
    discountPrice,
    quantity,
    article,
    status,
    Product_imgs
  } = product
  const [productQuantity, setProductQuantity] = useState(quantity)
  const [productStatus, setProductStatus] = useState(status)
  // eslint-disable-next-line no-unused-vars
  const [productImg, setProductImg] = useState(
    Product_imgs && Product_imgs[0].imgUrlSm
  )
  const handleCount = useCallback(
    (type, id) => {
      let changeQuantity
      if (type === 'increment') changeQuantity = productQuantity + 1
      if (type === 'decrement') {
        changeQuantity = productQuantity <= 1 ? 1 : productQuantity - 1
      }
      setProductQuantity(changeQuantity)
      changeProductQuantity(id, changeQuantity, product)
    },
    [productQuantity, setProductQuantity, product]
  )

  const handleChange = useCallback((e) => {
    const targetValue = parseInt(e.target.value.trim(' '))
    const changeQuantity = targetValue ? targetValue : ''
    changeQuantity && changeQuantity < 1
      ? setProductQuantity((productQuantity) => 1)
      : setProductQuantity((productQuantity) => changeQuantity)
  }, [])

  const handleOnBlur = useCallback(
    (e) => {
      const targetId = Number(e.target.id)
      let changeQuantity = e.target.value ? parseInt(e.target.value) : 1
      if (changeQuantity < 1) changeQuantity = 1
      setProductQuantity((productQuantity) => changeQuantity)
      changeProductQuantity(targetId, changeQuantity, product)
    },
    [product]
  )

  const handleStatusOnClick = useCallback(
    (e) => {
      const targetId = Number(e.target.id)
      let newStatus = productStatus === 'on' ? 'off' : 'on'
      setProductStatus(newStatus)
      changeProductStatus(targetId, newStatus, product)
    },
    [productStatus, product]
  )

  return (
    <Container>
      <ImgCell style={{ backgroundImage: `url(${productImg})` }}></ImgCell>
      <NameCell>{name}</NameCell>
      <ProductCell>NT. {price}</ProductCell>
      <ProductCell>NT. {discountPrice}</ProductCell>
      <ProductCell>
        <QuantityCounter
          targetId={id}
          buttonStyle={{ margin: '0px 4px' }}
          handleChange={handleChange}
          handleCount={handleCount}
          handleOnBlur={handleOnBlur}
          count={productQuantity}
        />
      </ProductCell>
      <ProductCell>{article}</ProductCell>
      <ProductCell>
        <ButtonContainer onClick={handleStatusOnClick} id={id}>
          <StatusButton status={productStatus} id={id} />
        </ButtonContainer>
      </ProductCell>
      <ProductCell>
        <ButtonContainer>
          <Link to={`/admin/products/detail/${id}`}>
            <GeneralBtn color='admin_grey'>商品詳情</GeneralBtn>
          </Link>
        </ButtonContainer>
      </ProductCell>
    </Container>
  )
}

export default function Table({ products }) {
  const headerNames = [
    '商品預覽',
    '商品名稱',
    '商品售價',
    '特價價格',
    '庫存數量',
    '活動文章',
    '上下架',
    '詳情'
  ]

  return (
    <Wrapper>
      <ColumnHeader>
        {headerNames.map((name) => (
          <NameHeader key={name} $name={name}>
            {name}
          </NameHeader>
        ))}
      </ColumnHeader>
      <TableItemContainer>
        {products.map((product) => (
          <TableItem key={product.id} product={product} />
        ))}
      </TableItemContainer>
    </Wrapper>
  )
}
