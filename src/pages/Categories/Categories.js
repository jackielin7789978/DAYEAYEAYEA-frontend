import styled from 'styled-components'
import { useState, useEffect, useContext } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import {
  getAllProductsByPage,
  getCategoryProductsByPage
} from '../../webAPI/productsAPI'
import { LoadingContext } from '../../context'
import { IsLoadingComponent } from '../../components/IsLoading'
import useMediaQuery from '../../hooks/useMediaQuery'
import { PageWidth } from '../../components/general'
import { ProductCard } from '../../components/ProductCard'
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
  const isMobile = useMediaQuery('(max-width: 768px)')
  const pathname = useLocation().pathname
  const { slug, page } = useParams()

  // 簡化寫法
  useEffect(() => {
    setIsLoading((isLoading) => true)
    if (slug === 'all') {
      getAllProductsByPage(page).then((result) => {
        setTotalPage((totalPage) => setPageInArray(result.totalPage))
        setProducts(result.data)
        setIsLoading((isLoading) => false)
      })
    } else {
      getCategoryProductsByPage(slug, page).then((result) => {
        setTotalPage((totalPage) => setPageInArray(result.totalPage))
        setProducts(result.data)
        setIsLoading((isLoading) => false)
      })
    }
  }, [setIsLoading, slug, page])
  return (
    <PageWidth>
      {isLoading && <IsLoadingComponent />}
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
              title={name}
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
