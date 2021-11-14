import styled from 'styled-components'
import qs from 'qs'
import { COLOR, FONT_SIZE, MEDIA_QUERY } from '../../constants/style'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import useModal from '../../hooks/useModal'
import useMediaQuery from '../../hooks/useMediaQuery'
import { IsLoadingComponent as Loading } from '../../components/IsLoading'
import { PageWidth } from '../../components/general'
import { countWhiteCardAmount, setSearchPageInArray } from '../../utils'
import { PaginatorButton } from '../../components/Paginator'
import {
  ProductCard,
  WhiteCard
} from '../../components/productSystem/ProductCard'

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
  const isMobile = useMediaQuery('(max-width: 767px)')
  const isDesktop = useMediaQuery('(min-width: 1200px)')
  const keywords = useLocation().search
  const keywordString = qs.parse(keywords, { ignoreQueryPrefix: true }).search
  const currentPage = Number(qs.parse(keywords, { ignoreQueryPrefix: true }).p)
  const perPageSliceStart = (currentPage - 1) * 12
  const perPageSliceEnd = currentPage * 12
  const { handleModalOpen, Modal } = useModal()
  const { isLoading, value, fetchData } = useFetch(`/products/${keywords}`)

  useEffect(() => {
    if (!keywordString) return
    fetchData()
  }, [fetchData, keywordString])
  const SearchProductsAmount = value?.data?.length || 0
  const { totalPage, pagesArray } = setSearchPageInArray(SearchProductsAmount)
  const whiteCardAmount = countWhiteCardAmount(SearchProductsAmount, isDesktop)

  return (
    <PageWidth>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Modal />
          {SearchProductsAmount === 0 && (
            <PageContainer>
              <SearchNotFoundContainer>
                沒有符合搜尋的商品
              </SearchNotFoundContainer>
            </PageContainer>
          )}
          {SearchProductsAmount !== 0 && (
            <>
              <SearchFoundResult
                keyword={keywordString}
                searchAmount={SearchProductsAmount}
              />
              <CardContainer>
                {value?.data
                  ?.slice(perPageSliceStart, perPageSliceEnd)
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
                          handleModalOpen={handleModalOpen}
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
        </>
      )}
    </PageWidth>
  )
}
