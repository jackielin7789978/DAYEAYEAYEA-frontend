import styled from 'styled-components'
import { useEffect } from 'react'
import useMediaQuery from '../../hooks/useMediaQuery'
import useFetch from '../../hooks/useFetch'
import useModal from '../../hooks/useModal'
import { IsLoadingComponent as Loading } from '../../components/IsLoading'
import { PageWidth } from '../../components/general'
import { COLOR, MEDIA_QUERY } from '../../constants/style'
import { ProductCard } from '../../components/productSystem/ProductCard'
import { HomeCategoriesImg } from '../../components/homeSystem/HomeCategoriesImg'
import Carousel from '../../components/Carousel'

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
const showProductsInComponent = (data, MediaQuery, handleModalOpen) => {
  const isMobile = MediaQuery('(max-width: 767px)')
  return data?.map(
    ({ id, name, price, Product_imgs, discountPrice, status, quantity }) => {
      const length = Product_imgs.length
      const imgUrl = isMobile
        ? Product_imgs[length - 1].imgUrlMd
        : Product_imgs[length - 1].imgUrlLg
      return (
        <ProductCard
          id={id}
          key={id}
          imgUrl={imgUrl}
          imgs={Product_imgs}
          name={name}
          price={price}
          discountPrice={discountPrice}
          status={status}
          stockQuantity={quantity}
          handleModalOpen={handleModalOpen}
        />
      )
    }
  )
}

export default function Home() {
  const { handleModalOpen, Modal } = useModal()
  const { isLoading, value, fetchData } = useFetch(`/products`)

  useEffect(() => fetchData(), [fetchData])

  return (
    <>
      {isLoading && <Loading />}
      <Carousel />
      <PageWidth>
        <Modal />
        <ProductContainer>
          <HomeCategoriesImg
            imgUrl='https://i.imgur.com/WjvyBCB.jpg'
            color={COLOR.text_dark}
            category={'居家生活'}
          />
          <CardContainer>
            {showProductsInComponent(
              value?.data
                ?.filter((product) => product.category === 'home')
                .slice(-4),
              useMediaQuery,
              handleModalOpen
            )}
          </CardContainer>
        </ProductContainer>
        <ProductContainer>
          <HomeCategoriesImg
            imgUrl='https://i.imgur.com/5mNsAzg.jpg'
            color={COLOR.text_dark}
            category={'服飾配件'}
          />
          <CardContainer>
            {showProductsInComponent(
              value?.data
                ?.filter((product) => product.category === 'apparel')
                .slice(-4),
              useMediaQuery,
              handleModalOpen
            )}
          </CardContainer>
        </ProductContainer>
        <ProductContainer>
          <HomeCategoriesImg
            imgUrl='https://i.imgur.com/kBR54ha.jpg'
            color={COLOR.text_light}
            category={'廚房餐具'}
          />
          <CardContainer>
            {showProductsInComponent(
              value?.data
                ?.filter((product) => product.category === 'kitchenware')
                .slice(-4),
              useMediaQuery,
              handleModalOpen
            )}
          </CardContainer>
        </ProductContainer>
        <ProductContainer>
          <HomeCategoriesImg
            imgUrl='https://i.imgur.com/3qTh9JZ.jpg'
            color={COLOR.text_black}
            category={'食材雜貨'}
          />
          <CardContainer>
            {showProductsInComponent(
              value?.data
                ?.filter((product) => product.category === 'food')
                .slice(-4),
              useMediaQuery,
              handleModalOpen
            )}
          </CardContainer>
        </ProductContainer>
        <ProductContainer>
          <HomeCategoriesImg
            imgUrl='https://i.imgur.com/db1W1Ne.jpg'
            color={COLOR.text_black}
            category={'設計文具'}
          />
          <CardContainer>
            {showProductsInComponent(
              value?.data
                ?.filter((product) => product.category === 'stationery')
                .slice(-4),
              useMediaQuery,
              handleModalOpen
            )}
          </CardContainer>
        </ProductContainer>
        <ProductContainer>
          <HomeCategoriesImg
            imgUrl='https://i.imgur.com/TrmCL9e.jpg'
            color={COLOR.text_dark}
            category={'休閒戶外'}
          />
          <CardContainer>
            {showProductsInComponent(
              value?.data
                ?.filter((product) => product.category === 'outdoor')
                .slice(-4),
              useMediaQuery,
              handleModalOpen
            )}
          </CardContainer>
        </ProductContainer>
      </PageWidth>
    </>
  )
}
