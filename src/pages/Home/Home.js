import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css'
import styled from 'styled-components'
import { useState, useEffect, useContext } from 'react'
import useMediaQuery from '../../hooks/useMediaQuery'
import { LoadingContext } from '../../context'
import { IsLoadingComponent } from '../../components/IsLoading'
import { PageWidth, FullWidth, ImgAnchor } from '../../components/general'
import { COLOR } from '../../constants/style'
import { ProductCard } from '../../components/ProductCard'
import { getCategoryProducts } from '../../webAPI/productsAPI'
import { IndexImg } from './HomeImg'

const Img = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`
const OutdoorArticleImg = styled(Img)`
  background-image: url('https://i.imgur.com/SdIsgaD.jpg');
`
const DiningArticleImg = styled(Img)`
  background-image: url('https://i.imgur.com/jrOqpOa.jpg');
`
const FragranceArticleImg = styled(Img)`
  background-image: url('https://i.imgur.com/yx6JDOZ.jpg');
  background-position: bottom;
`

const ImgLink = styled(ImgAnchor)`
  height: 520px;
`

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 30px;
`

const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px 0px;
  flex-wrap: wrap;
`

const getProductsByCategory = (category, setProducts, isLoading) => {
  isLoading(true)
  getCategoryProducts(category).then((products) => {
    setProducts(products.data.slice(0, 4))
    isLoading(false)
  })
}

const showProductsInComponent = (data, MediaQuery) => {
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
        title={name}
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
      <FullWidth>
        <Carousel
          style={{
            zIndex: '0'
          }}
        >
          <Carousel.Item>
            <OutdoorArticleImg>
              <ImgLink to='/info/notice'>Link</ImgLink>
            </OutdoorArticleImg>
          </Carousel.Item>
          <Carousel.Item>
            <DiningArticleImg>
              <ImgLink to='/info/FAQ'>Link</ImgLink>
            </DiningArticleImg>
          </Carousel.Item>
          <Carousel.Item>
            <FragranceArticleImg>
              <ImgLink to='/info/join'>Link</ImgLink>
            </FragranceArticleImg>
          </Carousel.Item>
        </Carousel>
      </FullWidth>
      <PageWidth>
        {isLoading && <IsLoadingComponent />}
        <ProductContainer>
          <IndexImg
            imgUrl='https://i.imgur.com/WjvyBCB.jpg'
            color={COLOR.text_dark}
          >
            居家生活
          </IndexImg>
          <CardContainer>
            {showProductsInComponent(homeProducts, useMediaQuery)}
          </CardContainer>
        </ProductContainer>
        <ProductContainer>
          <IndexImg
            imgUrl='https://i.imgur.com/5mNsAzg.jpg'
            color={COLOR.text_dark}
          >
            服飾配件
          </IndexImg>
          <CardContainer>
            {showProductsInComponent(apparelProducts, useMediaQuery)}
          </CardContainer>
        </ProductContainer>
        <ProductContainer>
          <IndexImg
            imgUrl='https://i.imgur.com/kBR54ha.jpg'
            color={COLOR.text_light}
          >
            廚房餐具
          </IndexImg>
          <CardContainer>
            {showProductsInComponent(kitchenwareProducts, useMediaQuery)}
          </CardContainer>
        </ProductContainer>
        <ProductContainer>
          <IndexImg imgUrl='https://i.imgur.com/3qTh9JZ.jpg' color='black'>
            食材雜貨
          </IndexImg>
          <CardContainer>
            {showProductsInComponent(foodProducts, useMediaQuery)}
          </CardContainer>
        </ProductContainer>
        <ProductContainer>
          <IndexImg imgUrl='https://i.imgur.com/db1W1Ne.jpg' color='black'>
            設計文具
          </IndexImg>
          <CardContainer>
            {showProductsInComponent(stationeryProducts, useMediaQuery)}
          </CardContainer>
        </ProductContainer>
        <ProductContainer>
          <IndexImg
            imgUrl='https://i.imgur.com/TrmCL9e.jpg'
            color={COLOR.text_dark}
          >
            休閒戶外
          </IndexImg>
          <CardContainer>
            {showProductsInComponent(outdoorProducts, useMediaQuery)}
          </CardContainer>
        </ProductContainer>
      </PageWidth>
    </>
  )
}
