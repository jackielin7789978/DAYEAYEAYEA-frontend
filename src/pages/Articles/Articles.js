import styled from 'styled-components'
import { useState, useEffect, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getArticlesById } from '../../webAPI/articlesAPI'
import { getProductByArticle } from '../../webAPI/productsAPI'
import { LoadingContext } from '../../context'
import { COLOR, FONT_SIZE, MEDIA_QUERY } from '../../constants/style'
import { IsLoadingComponent } from '../../components/IsLoading'
import { ProductCard } from '../../components/productSystem/ProductCard'
import useMediaQuery from '../../hooks/useMediaQuery'
import { PageWidth, FullWidth } from '../../components/general'

const ArticleImgContainer = styled.div`
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  height: 200px;

  ${MEDIA_QUERY.tablet} {
    height: 360px;
  }
  ${MEDIA_QUERY.desktop} {
    height: 440px;
  }
`

const Title = styled.div`
  font-size: ${FONT_SIZE.xxl};
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  ${MEDIA_QUERY.tablet} {
    margin-top: 20px;
  }
  ${MEDIA_QUERY.desktop} {
    margin-top: 30px;
  }
`

const TitleBorder = styled.div`
  margin-top: 8px;
  width: 25%;
  border-bottom: 3px solid ${COLOR.primary_dark};
  ${MEDIA_QUERY.tablet} {
    width: 10%;
  }
  ${MEDIA_QUERY.desktop} {
    width: 5%;
  }
`
const ContentDiv = styled.div`
  margin: 40px auto;
  width: 70%;
  text-align: left;
  white-space: pre-wrap;
  line-height: 2em;
`

const ProductCardsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 40px 0px;
  flex-wrap: wrap;
`

export default function Articles() {
  const { slug } = useParams()
  const [articleData, setArticleData] = useState([])
  const [articleProducts, setArticleProducts] = useState([])
  const { isLoading, setIsLoading } = useContext(LoadingContext)
  const isMobile = useMediaQuery('(max-width: 767px)')
  let history = useHistory()
  let articleSort
  if (slug) {
    if (slug === '1') {
      articleSort = 'fragrance'
    } else {
      articleSort = slug === '2' ? 'dining' : 'camping'
    }
  }

  useEffect(() => {
    setIsLoading(true)
    getArticlesById(parseInt(slug)).then((result) => {
      if (result.ok === 0) {
        history.push('/')
        return setIsLoading(false)
      }
      setArticleData((articleData) => result.data)
      getProductByArticle(articleSort).then((result) => {
        if (result.ok === 1) setArticleProducts(result.data)
      })
      setIsLoading(false)
    })
  }, [setIsLoading, slug, articleSort, history])
  const { imgUrl, title, content } = articleData
  return (
    <>
      <FullWidth>
        <ArticleImgContainer style={{ backgroundImage: `url(${imgUrl})` }} />
      </FullWidth>
      <PageWidth>
        {isLoading && <IsLoadingComponent />}
        <Title>
          {title}
          <TitleBorder />
        </Title>
        <ContentDiv>{content}</ContentDiv>
        <ProductCardsContainer>
          {articleProducts.map(
            ({ id, name, price, Product_imgs, discountPrice }) => {
              const length = Product_imgs.length
              const imgUrl = isMobile
                ? Product_imgs[length - 1].imgUrlSm
                : Product_imgs[length - 1].imgUrlMd
              return (
                <ProductCard
                  id={id}
                  key={id}
                  imgUrl={imgUrl}
                  name={name}
                  price={price}
                  discountPrice={discountPrice}
                />
              )
            }
          )}
        </ProductCardsContainer>
        {/* {totalPage.length > 1 && (
        <PaginatorDiv>
          {totalPage.map((singlePage) => {
            const linkDirection = `/categories/${slug}/${singlePage}`
            return (
              <PaginatorButton
                key={singlePage}
                page={singlePage}
                to={linkDirection}
                active={pathname === linkDirection}
              ></PaginatorButton>
            )
          })}
        </PaginatorDiv>
      )} */}
      </PageWidth>
    </>
  )
}
