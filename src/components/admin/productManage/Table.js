import styled from 'styled-components'
import { useState, useCallback, useContext } from 'react'
import { ProductIdContext } from '../../../context'
import { Link } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import { GeneralBtn } from '../../../components/Button'
import { ItemCounter } from '../../../components/Counter'
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
  width: 13%;
  width: ${({ $name }) => $name === '商品名稱' && '20%'};
  width: ${({ $name }) => $name === '商品預覽' && '15%'};
  margin: 0px 5px;
`
const GeneralCell = styled(Cell)`
  text-align: center;
  margin: 0px 6px;
`
const NameCell = styled(GeneralCell)`
  width: 20%;
`
const ProductCell = styled(GeneralCell)`
  width: 13%;
`
const ImgCell = styled(GeneralCell)`
  width: 15%;
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

function TableItem({ product, handleModalOpen }) {
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
  const { setProductId } = useContext(ProductIdContext)
  const { fetchData } = useFetch(`/admin/products/${id}`, {
    method: 'PATCH'
  })
  const length = Product_imgs.length
  // eslint-disable-next-line no-unused-vars
  const [productImg, setProductImg] = useState(
    Product_imgs && Product_imgs[length - 1].imgUrlSm
  )
  const handleCount = useCallback(
    (type) => {
      let changeQuantity
      if (type === 'increment') changeQuantity = productQuantity + 1
      if (type === 'decrement') {
        changeQuantity = productQuantity <= 1 ? 1 : productQuantity - 1
      }
      setProductQuantity(changeQuantity)
      fetchData({
        bodyData: { quantity: changeQuantity },
        errorHandler: (error) => {
          alert(error.message)
        }
      })
    },
    [productQuantity, setProductQuantity, fetchData]
  )

  const handleChange = useCallback((e) => {
    const changeQuantity = e.target.value ? parseInt(e.target.value) : ''
    changeQuantity && changeQuantity < 1
      ? setProductQuantity((productQuantity) => 1)
      : setProductQuantity((productQuantity) => changeQuantity)
  }, [])

  const handleOnBlur = useCallback(
    (e) => {
      let changeQuantity = e.target.value ? parseInt(e.target.value) : 1
      if (changeQuantity < 1) changeQuantity = 1
      setProductQuantity((productQuantity) => changeQuantity)
      fetchData({
        bodyData: { quantity: changeQuantity },
        errorHandler: (error) => {
          alert(error.message)
        }
      })
    },
    [fetchData]
  )

  const handleOnStatusClick = useCallback(() => {
    let newStatus = productStatus === 'on' ? 'off' : 'on'
    setProductStatus(newStatus)
    fetchData({
      bodyData: { status: newStatus },
      errorHandler: (error) => {
        alert(error.message)
      }
    })
  }, [productStatus, fetchData])

  const handleOnDeleteClick = useCallback(
    (e) => {
      e.preventDefault()
      setProductId(Number(e.target.id))
      handleModalOpen()
    },
    [handleModalOpen, setProductId]
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
      {article !== 'null' && <ProductCell>{article}</ProductCell>}
      {article === 'null' && <ProductCell>無</ProductCell>}
      <ProductCell>
        <ButtonContainer onClick={handleOnStatusClick} id={id}>
          <StatusButton status={productStatus} id={id} />
        </ButtonContainer>
      </ProductCell>
      <ProductCell>
        <ButtonContainer>
          <Link to={`/admin/products/detail/${id}`}>
            <GeneralBtn color='admin_blue'>進入</GeneralBtn>
          </Link>
        </ButtonContainer>
      </ProductCell>
      <ProductCell>
        <ButtonContainer onClick={handleOnDeleteClick} id={id}>
          <GeneralBtn color='admin_grey' id={id} onClick={handleOnDeleteClick}>
            刪除
          </GeneralBtn>
        </ButtonContainer>
      </ProductCell>
    </Container>
  )
}

export default function Table({ products, handleModalOpen }) {
  const headerNames = [
    '商品預覽',
    '商品名稱',
    '商品售價',
    '特價價格',
    '庫存數量',
    '活動文章',
    '上下架',
    '詳情',
    '刪除'
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
        {products &&
          products.map((product) => (
            <TableItem
              key={product.id}
              product={product}
              id={product.id}
              handleModalOpen={handleModalOpen}
            />
          ))}
      </TableItemContainer>
    </Wrapper>
  )
}
