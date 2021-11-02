import styled from 'styled-components'
import qs from 'qs'
import { COLOR, FONT_SIZE, MEDIA_QUERY } from '../../constants/style'
import { useState, useEffect, useContext } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { getProductByKeywords } from '../../webAPI/productsAPI'
import { LoadingContext, ModalContext } from '../../context'
import { IsLoadingComponent } from '../../components/IsLoading'
import useMediaQuery from '../../hooks/useMediaQuery'
import { PageWidth } from '../../components/general'
import {
  ProductCard,
  WhiteCard
} from '../../components/productSystem/ProductCard'
import { countWhiteCardAmount, setSearchPageInArray } from '../../utils'
import {
  AddCartModal,
  SoldOutCartModal
} from '../../components/productSystem/ProductModal'
import { PaginatorButton } from '../../components/Paginator'

const PageContainer = styled.div`
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px 0px;
  flex-wrap: wrap;
`
const PaginatorDiv = styled.div`
  margin: 20px auto 40px auto;
`
const SearchFoundContainer = styled.div`
  text-align: center
  font-size: ${FONT_SIZE.md};
  color: ${COLOR.text_dark};
  margin-top: 40px;
  p{
    color: ${COLOR.text_primary_dark};
    font-weight: bold;
  }
`
const SearchNotFoundContainer = styled(SearchFoundContainer)`
  ${MEDIA_QUERY.tablet} {
    font-size: ${FONT_SIZE.lg};
  }

  ${MEDIA_QUERY.desktop} {
    font-size: ${FONT_SIZE.lg};
  }
`

function SearchFoundResult({ keyword, searchAmount }) {
  return (
    <SearchFoundContainer>
      符合關鍵字「{keyword}」的相關產品，共搜尋到 {searchAmount} 筆。
    </SearchFoundContainer>
  )
}

export default function Search() {
  const { isLoading, setIsLoading } = useContext(LoadingContext)
  const { isModalOpen, handleModalClose, isProductSoldOut } =
    useContext(ModalContext)
  const [searchResult, setSearchResult] = useState([])
  const history = useHistory()
  const isMobile = useMediaQuery('(max-width: 767px)')
  const isDesktop = useMediaQuery('(min-width: 1200px)')
  const keywords = useLocation().search
  const keywordString = qs.parse(keywords, { ignoreQueryPrefix: true }).search
  const currentPage = Number(qs.parse(keywords, { ignoreQueryPrefix: true }).p)
  const perPageSliceStart = (currentPage - 1) * 12
  const perPageSliceEnd = currentPage * 12

  useEffect(() => {
    setIsLoading((isLoading) => true)
    if (!keywordString) {
      setSearchResult([])
      return setIsLoading((isLoading) => false)
    }
    getProductByKeywords(keywords).then((result) => {
      if (!result) return
      if (result.ok === 0) {
        history.push('/404')
      }
      setIsLoading((isLoading) => false)
      setSearchResult(result.data)
    })
  }, [setIsLoading, history, keywords, keywordString])
  const SearchProductsAmount = searchResult.length
  const { totalPage, pagesArray } = setSearchPageInArray(SearchProductsAmount)

  const whiteCardAmount = countWhiteCardAmount(SearchProductsAmount, isDesktop)

  return (
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
      {SearchProductsAmount === 0 && (
        <PageContainer>
          <SearchNotFoundContainer>沒有符合搜尋的商品</SearchNotFoundContainer>
        </PageContainer>
      )}
      {SearchProductsAmount !== 0 && (
        <>
          <SearchFoundResult
            keyword={keywordString}
            searchAmount={SearchProductsAmount}
          />
          <CardContainer>
            {searchResult
              .slice(perPageSliceStart, perPageSliceEnd)
              .map(
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
                      imgUrl={imgUrl}
                      imgs={Product_imgs}
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
          </CardContainer>
        </>
      )}
      {totalPage > 1 && (
        <PaginatorDiv>
          {pagesArray.map((page) => {
            return (
              <PaginatorButton
                key={page}
                page={page}
                to={`/search/?search=${keywordString}&p=${page}`}
                active={page === currentPage}
              ></PaginatorButton>
            )
          })}
        </PaginatorDiv>
      )}
    </PageWidth>
  )
}
