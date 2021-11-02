import styled from 'styled-components'
import { useState, useEffect, useContext, useCallback } from 'react'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import { getArticlesById } from '../../webAPI/articlesAPI'
import { getProductByArticle } from '../../webAPI/productsAPI'
import { LoadingContext, ModalContext } from '../../context'
import { COLOR, FONT_SIZE, MEDIA_QUERY } from '../../constants/style'
import { IsLoadingComponent } from '../../components/IsLoading'
import {
  ProductCard,
  WhiteCard
} from '../../components/productSystem/ProductCard'
import useMediaQuery from '../../hooks/useMediaQuery'
import { PageWidth, FullWidth } from '../../components/general'
import {
  AddCartModal,
  SoldOutCartModal
} from '../../components/productSystem/ProductModal'
import { PaginatorButton } from '../../components/Paginator'
import { setNumInArray, countWhiteCardAmount } from '../../utils'

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
const PaginatorDiv = styled.div`
  margin: 20px auto 40px auto;
`

export default function Articles() {
  const { id, page } = useParams()
  const pathname = useLocation().pathname
  const [articleData, setArticleData] = useState([])
  const [articleProducts, setArticleProducts] = useState([])
  const [totalPage, setTotalPage] = useState([])
  const { isLoading, setIsLoading } = useContext(LoadingContext)
  const { isModalOpen, handleModalClose, isProductSoldOut } =
    useContext(ModalContext)
  const isMobile = useMediaQuery('(max-width: 767px)')
  const isDesktop = useMediaQuery('(min-width: 1200px)')
  let history = useHistory()
  let articleSort
  if (id) {
    if (id === '1') {
      articleSort = 'fragrance'
    } else {
      articleSort = id === '2' ? 'dining' : 'camping'
    }
  }

  const PageIsFound = useCallback(
    (result) => {
      let isFound = false
      if (result === 0) {
        history.push('/404')
        return setIsLoading(false)
      }
      if (result === 1) isFound = true
      return isFound
    },
    [history, setIsLoading]
  )

  useEffect(() => {
    setIsLoading(true)
    getArticlesById(parseInt(id)).then((result) => {
      if (!result) return
      const isResultOk = PageIsFound(result.ok)
      if (isResultOk) {
        getProductByArticle(articleSort, parseInt(page)).then((result) => {
          const isResultOk = PageIsFound(result.ok)
          if (isResultOk) {
            setArticleProducts(result.data)
            setTotalPage((totalPage) => setNumInArray(result.totalPage))
          }
        })
        setArticleData((articleData) => result.data)
        setIsLoading(false)
      }
    })
  }, [setIsLoading, id, page, articleSort, history, PageIsFound])

  const { imgUrl, title, content } = articleData
  const whiteCardAmount = countWhiteCardAmount(
    articleProducts.length,
    isDesktop
  )

  return (
    <>
      <FullWidth>
        <ArticleImgContainer style={{ backgroundImage: `url(${imgUrl})` }} />
      </FullWidth>
      <PageWidth>
        {isLoading && <IsLoadingComponent />}
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
        <Title>
          {title}
          <TitleBorder />
        </Title>
        <ContentDiv>{content}</ContentDiv>
        <ProductCardsContainer>
          {articleProducts.map(
            ({
              id,
              name,
              price,
              Product_imgs,
              discountPrice,
              status,
              quantity
            }) => {
              const length = Product_imgs.length
              const imgUrl = isMobile
                ? Product_imgs[length - 1].imgUrlSm
                : Product_imgs[length - 1].imgUrlMd
              return (
                <ProductCard
                  id={id}
                  key={id}
                  imgs={Product_imgs}
                  imgUrl={imgUrl}
                  name={name}
                  price={price}
                  discountPrice={discountPrice}
                  status={status}
                  stockQuantity={quantity}
                />
              )
            }
          )}
          {whiteCardAmount.length > 0 &&
            whiteCardAmount.map((amount) => {
              return <WhiteCard key={amount} />
            })}
        </ProductCardsContainer>
        {totalPage.length > 1 && (
          <PaginatorDiv>
            {totalPage.map((singlePage) => {
              const linkDirection = `/articles/${id}/${singlePage}`
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
        )}
      </PageWidth>
    </>
  )
}
