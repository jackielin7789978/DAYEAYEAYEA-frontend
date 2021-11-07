import styled from 'styled-components'
import { useState, useEffect, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { MEDIA_QUERY } from '../../constants/style'
import { LoadingContext, ModalContext } from '../../context'
import { IsLoadingComponent } from '../../components/IsLoading'
import { PageWidth } from '../../components/general'
import { getProductById } from '../../webAPI/productsAPI'
import {
  AddCartModal,
  SoldOutCartModal
} from '../../components/productSystem/ProductModal'
import { ProductImgsComponent } from '../../components/productSystem/ProductImg'
import { ProductUpInfoComponent } from '../../components/productSystem/ProductUpInfo'
import { ProductBottomInfoComponent } from '../../components/productSystem/ProductBottomInfo'

const ProductPageDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ProductTopContainer = styled.div`
  width: 100%;
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px auto;

  ${MEDIA_QUERY.tablet} {
    height: 365px;
    flex-direction: row;
    justify-content: center;
    margin: 60px auto 20px auto;
  }

  ${MEDIA_QUERY.desktop} {
    height: 380px;
    flex-direction: row;
    justify-content: center;
    margin: 40px auto;
  }
`

export default function Products() {
  const [product, setProduct] = useState([])
  const [productImgs, setProductImgs] = useState([])
  const { isLoading, setIsLoading } = useContext(LoadingContext)
  const { isModalOpen, handleModalClose, isProductSoldOut } =
    useContext(ModalContext)
  const { id } = useParams()
  let history = useHistory()

  useEffect(() => {
    setIsLoading((isLoading) => true)
    getProductById(id).then((result) => {
      if (!result) return
      if (result.ok === 0) {
        history.push('/404')
        return setIsLoading(false)
      }
      setIsLoading((isLoading) => false)
      setProduct(result.data)
      setProductImgs(result.data.Product_imgs)
    })
  }, [setIsLoading, id, history])

  const { name, shortDesc, longDesc, price, discountPrice, quantity, status } =
    product
  let hasDiscount = price !== discountPrice ? true : false

  return (
    <PageWidth>
      {isLoading && <IsLoadingComponent />}
      {!isLoading && (
        <>
          {isProductSoldOut && (
            <AddCartModal
              isModalOpen={isModalOpen}
              handleModalClose={handleModalClose}
            />
          )}
          {!isProductSoldOut && (
            <SoldOutCartModal
              isModalOpen={isModalOpen}
              handleModalClose={handleModalClose}
            />
          )}
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
                totalQuantity={quantity}
                status={status}
              />
            </ProductTopContainer>
            <ProductBottomInfoComponent longDesc={longDesc} />
          </ProductPageDiv>
        </>
      )}
    </PageWidth>
  )
}
