import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import useModal from '../../hooks/useModal'
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
  let history = useHistory()
  const isMobile = useMediaQuery('(max-width: 767px)')
  const isDesktop = useMediaQuery('(min-width: 1200px)')
  const pathname = useLocation().pathname
  const [totalPage, setTotalPage] = useState([])
  const { handleModalOpen, Modal } = useModal()
  const { slug, page } = useParams()

  const { isLoading, value, fetchData } = useFetch(
    `/products/category/${slug}/${page}`
  )

  useEffect(() => {
    fetchData({
      handler: (categoryValue) => {
        setTotalPage((totalPage) => setNumInArray(categoryValue?.totalPage))
      },
      errorHandler: () => {
        history.push('/404')
      }
    })
  }, [slug, history, fetchData])

  const whiteCardAmount = countWhiteCardAmount(value?.data?.length, isDesktop)
  return (
    <PageWidth>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {value?.data && (
            <>
              <Modal />
              <CardContainer>
                {value?.data?.map(
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
            </>
          )}
          {totalPage && (
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
