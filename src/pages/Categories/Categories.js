import styled from 'styled-components'
import { useState, useEffect, useContext, useCallback } from 'react'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import {
  getAllProductsByPage,
  getCategoryProductsByPage
} from '../../webAPI/productsAPI'
import { LoadingContext, ModalContext } from '../../context'
import { IsLoadingComponent } from '../../components/IsLoading'
import useMediaQuery from '../../hooks/useMediaQuery'
import { PageWidth } from '../../components/general'
import { ProductCard } from '../../components/productSystem/ProductCard'
import { PaginatorButton } from '../../components/Paginator'
import { FullModal } from '../../components/Modal'

const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 40px 0px;
  flex-wrap: wrap;
`

const PaginatorDiv = styled.div`
  margin: 20px auto 40px auto;
`

function setPageInArray(totalPageNum) {
  const pagesArray = []
  for (let i = 1; i <= totalPageNum; i++) {
    pagesArray.push(i)
  }
  return pagesArray
}

export default function Categories() {
  const [products, setProducts] = useState([])
  const [totalPage, setTotalPage] = useState([])
  const { isLoading, setIsLoading } = useContext(LoadingContext)
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext)
  const isMobile = useMediaQuery('(max-width: 767px)')
  const pathname = useLocation().pathname
  const { slug, page } = useParams()
  let history = useHistory()

  const setAPIResult = useCallback(
    (result) => {
      if (result.ok === 0) {
        history.push('/404')
        return setIsLoading(false)
      }
      setTotalPage((totalPage) => setPageInArray(result.totalPage))
      setProducts(result.data)
      setIsLoading((isLoading) => false)
    },
    [setIsLoading, history]
  )

  const handleModalClose = useCallback(() => {
    setIsModalOpen((isModalOpen) => false)
  }, [setIsModalOpen])

  useEffect(() => {
    setIsLoading((isLoading) => true)
    if (slug === 'all') {
      getAllProductsByPage(page).then((result) => {
        setAPIResult(result)
      })
    } else {
      getCategoryProductsByPage(slug, page).then((result) => {
        setAPIResult(result)
      })
    }
  }, [setIsLoading, slug, page, setAPIResult])

  return (
    <PageWidth>
      {isLoading && <IsLoadingComponent />}
      <FullModal
        open={isModalOpen}
        content='已成功加入購物車 ! '
        onClose={handleModalClose}
      />
      <CardContainer>
        {products.map(({ id, name, price, Product_imgs, discountPrice }) => {
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
    </PageWidth>
  )
}
