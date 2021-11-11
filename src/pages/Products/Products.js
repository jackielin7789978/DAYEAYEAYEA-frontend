import styled from 'styled-components'
import { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import useModal from '../../hooks/useModal'
import { MEDIA_QUERY } from '../../constants/style'
import { IsLoadingComponent as Loading } from '../../components/IsLoading'
import { PageWidth } from '../../components/general'
import { ProductImgsComponent } from '../../components/productSystem/ProductImg'
import { ProductUpInfoComponent } from '../../components/productSystem/ProductUpInfo'
import { ProductBottomInfoComponent } from '../../components/productSystem/ProductBottomInfo'

const ProductPageDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const ProductTopContainer = styled.div`
  width: 100%;
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px auto;

  ${MEDIA_QUERY.tablet} {
    height: 365px;
    flex-direction: row;
    justify-content: center;
    margin: 60px auto 20px auto;
  }
  ${MEDIA_QUERY.desktop} {
    height: 380px;
    flex-direction: row;
    justify-content: center;
    margin: 40px auto;
  }
`

export default function Products() {
  const { handleModalOpen, Modal } = useModal()
  const { id } = useParams()
  const { isLoading, value, fetchData } = useFetch(`/products/${parseInt(id)}`)
  let history = useHistory()

  useEffect(() => {
    fetchData({
      errorHandler: () => {
        history.push('/404')
      }
    })
  }, [fetchData, history])

  let hasDiscount =
    value?.data?.price !== value?.data?.discountPrice ? true : false

  return (
    <PageWidth>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Modal />
          <ProductPageDiv>
            <ProductTopContainer>
              <ProductImgsComponent imgs={value?.data?.Product_imgs} />
              <ProductUpInfoComponent
                id={id}
                name={value?.data?.name}
                shortDesc={value?.data?.shortDesc}
                imgs={value?.data?.Product_imgs}
                price={value?.data?.price}
                discountPrice={value?.data?.discountPrice}
                hasDiscount={hasDiscount}
                totalQuantity={value?.data?.quantity}
                status={value?.data?.status}
                handleModalOpen={handleModalOpen}
              />
            </ProductTopContainer>
            <ProductBottomInfoComponent longDesc={value?.data?.longDesc} />
          </ProductPageDiv>
        </>
      )}
    </PageWidth>
  )
}
