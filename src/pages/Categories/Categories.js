import styled from 'styled-components'
import { useState, useEffect, useContext, useCallback } from 'react'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import {
  getAllProductsByPage,
  getCategoryProductsByPage
} from '../../webAPI/productsAPI'
import useModal from '../../hooks/useModal'
import { LoadingContext } from '../../context'
import { IsLoadingComponent as Loading } from '../../components/IsLoading'
import useMediaQuery from '../../hooks/useMediaQuery'
import { PageWidth } from '../../components/general'
import {
  ProductCard,
  WhiteCard
} from '../../components/productSystem/ProductCard'
import { countWhiteCardAmount, setNumInArray } from '../../utils'
import { PaginatorButton } from '../../components/Paginator'

const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 40px 0px;
  flex-wrap: wrap;
`

const PaginatorDiv = styled.div`
  margin: 20px auto 40px auto;
`

export default function Categories() {
  const [products, setProducts] = useState([])
  const [totalPage, setTotalPage] = useState([])
  const { isLoading, setIsLoading } = useContext(LoadingContext)
  const { handleModalOpen, Modal } = useModal()
  const isMobile = useMediaQuery('(max-width: 767px)')
  const isDesktop = useMediaQuery('(min-width: 1200px)')
  const pathname = useLocation().pathname
  const { slug, page } = useParams()
  let history = useHistory()

  const setAPIResult = useCallback(
    (result) => {
      if (!result) return
      if (result.ok === 0) {
        return history.push('/404')
      }
      setTotalPage((totalPage) => setNumInArray(result.totalPage))
      setProducts(result.data)
      setIsLoading((isLoading) => false)
    },
    [setIsLoading, history]
  )

  useEffect(() => {
    setIsLoading((isLoading) => true)
    if (slug === 'all') {
      getAllProductsByPage(page).then((result) => {
        if (!result) return
        setAPIResult(result)
      })
    } else {
      getCategoryProductsByPage(slug, page).then((result) => {
        if (!result) return
        setAPIResult(result)
      })
    }
  }, [setIsLoading, slug, page, setAPIResult])

  const whiteCardAmount = countWhiteCardAmount(products.length, isDesktop)
  return (
    <PageWidth>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Modal />
          <CardContainer>
            {products.map(
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
            )}
            {whiteCardAmount.length > 0 &&
              whiteCardAmount.map((amount) => {
                return <WhiteCard key={amount} />
              })}
          </CardContainer>
          {totalPage.length > 1 && (
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
          )}
        </>
      )}
    </PageWidth>
  )
}
