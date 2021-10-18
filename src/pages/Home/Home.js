import 'bootstrap/dist/css/bootstrap.min.css'
import styled from 'styled-components'
import { useState, useEffect, useContext } from 'react'
import useMediaQuery from '../../hooks/useMediaQuery'
import { LoadingContext, ModalContext } from '../../context'
import { IsLoadingComponent } from '../../components/IsLoading'
import { PageWidth } from '../../components/general'
import { COLOR, MEDIA_QUERY } from '../../constants/style'
import { ProductCard } from '../../components/productSystem/ProductCard'
import { getCategoryProducts } from '../../webAPI/productsAPI'
import { HomeCategoriesImg } from './HomeCategoriesImg'
import { HomeArticlesImg } from './HomeArticlesImg'
import { FullModal } from '../../components/Modal'

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  ${MEDIA_QUERY.tablet} {
    margin-top: 30px;
  }
  ${MEDIA_QUERY.desktop} {
    margin-top: 30px;
  }
`

const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 10px 0px;
  flex-wrap: wrap;
  ${MEDIA_QUERY.tablet} {
    margin: 20px 0px;
  }
  ${MEDIA_QUERY.desktop} {
    margin: 20px 0px;
  }
`

const getProductsByCategory = (category, setProducts, setIsLoading) => {
  setIsLoading(true)
  getCategoryProducts(category).then((products) => {
    if (products.ok === 0) return
    setProducts(products.data.slice(0, 4))
    setIsLoading(false)
  })
}

const showProductsInComponent = (data, MediaQuery, setIsModalOpen) => {
  const isMobile = MediaQuery('(max-width: 767px)')
  return data.map(({ id, name, price, Product_imgs, discountPrice }) => {
    const length = Product_imgs.length
    const imgUrl = isMobile
      ? Product_imgs[length - 1].imgUrlSm
      : Product_imgs[length - 1].imgUrlMd
    return (
      <ProductCard
        id={id}
        key={id}
        imgUrl={imgUrl}
        imgs={Product_imgs}
        name={name}
        price={price}
        discountPrice={discountPrice}
      />
    )
  })
}

export default function Home() {
  const [homeProducts, setHomeProducts] = useState([])
  const [apparelProducts, setApparelProducts] = useState([])
  const [kitchenwareProducts, setKitchenProducts] = useState([])
  const [foodProducts, setFoodProducts] = useState([])
  const [stationeryProducts, setStationeryProducts] = useState([])
  const [outdoorProducts, setOutdoorProducts] = useState([])
  const { isLoading, setIsLoading } = useContext(LoadingContext)
  const { isModalOpen, handleModalClose } = useContext(ModalContext)

  useEffect(() => {
    getProductsByCategory('home', setHomeProducts, setIsLoading)
    getProductsByCategory('apparel', setApparelProducts, setIsLoading)
    getProductsByCategory('kitchenware', setKitchenProducts, setIsLoading)
    getProductsByCategory('food', setFoodProducts, setIsLoading)
    getProductsByCategory('stationery', setStationeryProducts, setIsLoading)
    getProductsByCategory('outdoor', setOutdoorProducts, setIsLoading)
  }, [setIsLoading])

  return (
    <>
      <HomeArticlesImg />
      <PageWidth>
        {isLoading && <IsLoadingComponent />}
        <FullModal
          open={isModalOpen}
          content='已成功加入購物車 ! '
          onClose={handleModalClose}
        />
        <ProductContainer>
          <HomeCategoriesImg
            imgUrl='https://i.imgur.com/WjvyBCB.jpg'
            color={COLOR.text_dark}
            category={'居家生活'}
          />
          <CardContainer>
            {showProductsInComponent(homeProducts, useMediaQuery)}
          </CardContainer>
        </ProductContainer>
        <ProductContainer>
          <HomeCategoriesImg
            imgUrl='https://i.imgur.com/5mNsAzg.jpg'
            color={COLOR.text_dark}
            category={'服飾配件'}
          />
          <CardContainer>
            {showProductsInComponent(apparelProducts, useMediaQuery)}
          </CardContainer>
        </ProductContainer>
        <ProductContainer>
          <HomeCategoriesImg
            imgUrl='https://i.imgur.com/kBR54ha.jpg'
            color={COLOR.text_light}
            category={'廚房餐具'}
          />
          <CardContainer>
            {showProductsInComponent(kitchenwareProducts, useMediaQuery)}
          </CardContainer>
        </ProductContainer>
        <ProductContainer>
          <HomeCategoriesImg
            imgUrl='https://i.imgur.com/3qTh9JZ.jpg'
            color={COLOR.text_black}
            category={'食材雜貨'}
          />
          <CardContainer>
            {showProductsInComponent(foodProducts, useMediaQuery)}
          </CardContainer>
        </ProductContainer>
        <ProductContainer>
          <HomeCategoriesImg
            imgUrl='https://i.imgur.com/db1W1Ne.jpg'
            color={COLOR.text_black}
            category={'設計文具'}
          />
          <CardContainer>
            {showProductsInComponent(stationeryProducts, useMediaQuery)}
          </CardContainer>
        </ProductContainer>
        <ProductContainer>
          <HomeCategoriesImg
            imgUrl='https://i.imgur.com/TrmCL9e.jpg'
            color={COLOR.text_dark}
            category={'休閒戶外'}
          />
          <CardContainer>
            {showProductsInComponent(outdoorProducts, useMediaQuery)}
          </CardContainer>
        </ProductContainer>
      </PageWidth>
    </>
  )
}
