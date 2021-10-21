import styled from 'styled-components'
import { useState, useCallback } from 'react'
import {
  changeProductStatus,
  changeProductQuantity
} from '../../../webAPI/adminProductsAPI'
import { GeneralBtn } from '../../../components/Button'
import { ItemCounter } from '../../../components/Counter'
import {
  Wrapper,
  ColumnHeader,
  Header,
  TableItemContainer,
  Container,
  Cell
} from '../../../components/admin/TableStyle'
const NameHeader = styled(Header)`
  text-align: center;
  width: 22%;
`
const ProductHeader = styled(Header)`
  text-align: center;
  width: 13%;
`
const NameCell = styled(Cell)`
  text-align: center;
  width: 22%;
`
const ProductCell = styled(Cell)`
  text-align: center;
  width: 13%;
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
  const { id, name, price, discountPrice, quantity, article, status } = product
  const [productQuantity, setProductQuantity] = useState(quantity)
  const [productStatus, setProductStatus] = useState(status)

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
    const changeQuantity = e.target.value ? parseInt(e.target.value) : ''
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
          <GeneralBtn color='admin_grey'>商品詳情</GeneralBtn>
        </ButtonContainer>
      </ProductCell>
    </Container>
  )
}

export default function Table({ products }) {
  const headerNames = [
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
        <NameHeader>{headerNames[0]}</NameHeader>
        {headerNames.slice(1).map((name) => (
          <ProductHeader key={name}>{name}</ProductHeader>
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
