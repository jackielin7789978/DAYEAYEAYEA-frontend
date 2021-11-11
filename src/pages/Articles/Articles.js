import styled from 'styled-components'
import { useEffect } from 'react'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import useModal from '../../hooks/useModal'
import { COLOR, FONT_SIZE, MEDIA_QUERY } from '../../constants/style'
import { IsLoadingComponent as Loading } from '../../components/IsLoading'
import {
  ProductCard,
  WhiteCard
} from '../../components/productSystem/ProductCard'
import useMediaQuery from '../../hooks/useMediaQuery'
import { PageWidth, FullWidth } from '../../components/general'
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
  const { handleModalOpen, Modal } = useModal()
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

  const {
    isLoading,
    value,
    fetchData: getArticleById
  } = useFetch(`/articles/${id}`)
  const {
    isLoading: ProductsLoading,
    value: Products,
    fetchData: getProductsByArticle
  } = useFetch(`/products/article/${articleSort}/${page}`)

  useEffect(() => {
    getArticleById({
      handler: () => {
        getProductsByArticle({
          errorHandler: () => {
            history.push('/404')
          }
        })
      },
      errorHandler: () => {
        history.push('/404')
      }
    })
  }, [id, page, articleSort, history, getArticleById, getProductsByArticle])

  const whiteCardAmount = countWhiteCardAmount(
    Products?.data?.length,
    isDesktop
  )

  return (
    <>
      {isLoading || ProductsLoading ? (
        <Loading />
      ) : (
        <>
          <FullWidth>
            <ArticleImgContainer
              style={{ backgroundImage: `url(${value?.data?.imgUrl})` }}
            />
          </FullWidth>
          <PageWidth>
            <Modal />
            <Title>
              {value?.data?.title}
              <TitleBorder />
            </Title>
            <ContentDiv>{value?.data?.content}</ContentDiv>
            <ProductCardsContainer>
              {Products?.data?.map(
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
                      handleModalOpen={handleModalOpen}
                    />
                  )
                }
              )}
              {whiteCardAmount.length > 0 &&
                whiteCardAmount.map((amount) => {
                  return <WhiteCard key={amount} />
                })}
            </ProductCardsContainer>
            {setNumInArray(Products?.totalPage) && (
              <PaginatorDiv>
                {setNumInArray(Products?.totalPage).map((singlePage) => {
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
      )}
    </>
  )
}
