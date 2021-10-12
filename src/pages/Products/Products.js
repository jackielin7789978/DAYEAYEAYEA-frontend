import styled from 'styled-components'
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import useMediaQuery from '../../hooks/useMediaQuery'
import { COLOR, FONT_SIZE, MEDIA_QUERY } from '../../constants/style'
import { LoadingContext } from '../../context'
import { IsLoadingComponent } from '../../components/IsLoading'
import { ProductImgsComponent } from './ProductImg'
import { ProductInfoComponent } from './ProductInfo'
import { PageWidth } from '../../components/general'
import { getProductById } from '../../webAPI/productsAPI'

const ProductContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 20px auto;

  ${MEDIA_QUERY.tablet} {
    flex-direction: row;
    justify-content: center;
  }

  ${MEDIA_QUERY.desktop} {
    flex-direction: row;
    justify-content: center;
  }
`

export default function Products() {
  const [product, setProduct] = useState([])
  const [productImgs, setProductImgs] = useState([])
  const { isLoading, setIsLoading } = useContext(LoadingContext)
  const { id } = useParams()

  useEffect(() => {
    setIsLoading((isLoading) => true)
    getProductById(id).then((result) => {
      setProduct(result.data)
      setProductImgs(result.data.Product_imgs)
      setIsLoading((isLoading) => false)
    })
  }, [setIsLoading, id])

  const { name, shortDesc, longDesc, price, discountPrice } = product

  let hasDiscount = price !== discountPrice ? true : false
  return (
    <PageWidth>
      {isLoading && <IsLoadingComponent />}
      <ProductContainerDiv>
        <ProductImgsComponent imgs={productImgs} />
        <ProductInfoComponent
          name={name}
          shortDesc={shortDesc}
          longDesc={longDesc}
          price={price}
          discountPrice={discountPrice}
          hasDiscount={hasDiscount}
        />
      </ProductContainerDiv>
    </PageWidth>
  )
}
