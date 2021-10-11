import styled from 'styled-components'
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import useMediaQuery from '../../hooks/useMediaQuery'
import { COLOR, FONT_SIZE, MEDIA_QUERY } from '../../constants/style'
import { LoadingContext } from '../../context'
import { IsLoadingComponent } from '../../components/IsLoading'
import { PageWidth } from '../../components/general'
import { Link } from 'react-router-dom'
import { getProductById } from '../../webAPI/productsAPI'

const ProductContainerDiv = styled.div`
  display: flex;
  flex-direction: column;

  ${MEDIA_QUERY.tablet} {
    flex-direction: row;
  }

  ${MEDIA_QUERY.desktop} {
    flex-direction: row;
  }
`

const ProductImgContainer = styled.div`
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  ${MEDIA_QUERY.tablet} {
    width: 50%;
  }

  ${MEDIA_QUERY.desktop} {
    width: 50%;
  }
`

const ImgContainer = styled.div`
  width: 33%;
  padding-bottom:33%; 
  height：0；
  object-fit: fill;
  background-repeat: no-repeat;
  background-position: center center;
`
const LargeImgContainer = styled(ImgContainer)`
  width: 90%;
  padding-bottom: 90%;
`

const ProductInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  ${MEDIA_QUERY.tablet} {
    width: 50%;
    flex-direction: row;
  }

  ${MEDIA_QUERY.desktop} {
    width: 50%;
    flex-direction: row;
  }
`

export default function Products() {
  const [product, setProduct] = useState([])
  const { isLoading, setIsLoading } = useContext(LoadingContext)
  const { id } = useParams()

  useEffect(() => {
    setIsLoading((isLoading) => true)
    getProductById(id).then((result) => {
      setProduct(result.data)
      setIsLoading((isLoading) => false)
    })
  }, [setIsLoading, id])

  const { Product_imgs, name } = product
  return (
    <PageWidth>
      {isLoading && <IsLoadingComponent />}
      <ProductContainerDiv>
        <ProductImgContainer>
          {Product_imgs && (
            <LargeImgContainer
              style={{ backgroundImage: `url(${Product_imgs[0].imgUrlMd}})` }}
            />
          )}
          {Product_imgs &&
            Product_imgs.slice(1).map((img) => {
              return (
                <ImgContainer
                  key={img.id}
                  style={{ backgroundImage: `url(${img.imgUrlSm}})` }}
                />
              )
            })}
        </ProductImgContainer>
        <ProductInfoContainer>{name}</ProductInfoContainer>
      </ProductContainerDiv>
    </PageWidth>
  )
}
