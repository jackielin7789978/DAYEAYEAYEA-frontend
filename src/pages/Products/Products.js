import styled from 'styled-components'
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { MEDIA_QUERY } from '../../constants/style'
import { LoadingContext } from '../../context'
import { IsLoadingComponent } from '../../components/IsLoading'
import { ProductImgsComponent } from './ProductImg'
import { ProductUpInfoComponent } from './ProductUpInfo'
import { ProductBottomInfoComponent } from './ProductBottomInfo'
import { PageWidth } from '../../components/general'
import { getProductById } from '../../webAPI/productsAPI'

const ProductPageDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ProductTopContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 20px auto;

  ${MEDIA_QUERY.tablet} {
    flex-direction: row;
    justify-content: center;
    margin: 60px auto 30px auto;
  }

  ${MEDIA_QUERY.desktop} {
    flex-direction: row;
    justify-content: center;
    margin: 40px auto;
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
      if (result.ok === 0) return setIsLoading((isLoading) => false)
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
      <ProductPageDiv>
        <ProductTopContainer>
          <ProductImgsComponent imgs={productImgs} />
          <ProductUpInfoComponent
            id={id}
            name={name}
            shortDesc={shortDesc}
            imgs={productImgs}
            price={price}
            discountPrice={discountPrice}
            hasDiscount={hasDiscount}
          />
        </ProductTopContainer>
        <ProductBottomInfoComponent longDesc={longDesc} />
      </ProductPageDiv>
    </PageWidth>
  )
}
