import styled from 'styled-components'
import qs from 'qs'
import { useState, useLayoutEffect, useCallback, useContext } from 'react'
import { useParams, useLocation, useHistory, Link } from 'react-router-dom'
import useModal from '../../../hooks/useModal'
import useFetch from '../../../hooks/useFetch'
import { AdminContext, ProductIdContext } from '../../../context'
import { AdminIsLoadingComponent as Loading } from '../../../components/admin/AdminIsLoading'
import { ADMIN_MEDIA_QUERY, FONT_SIZE } from '../../../constants/style'
import {
  CategoryDropdown,
  Search
} from '../../../components/admin/productManage/Search'
import Table from '../../../components/admin/productManage/Table'
import { PaginatorButton } from '../../../components/admin/PaginatorStyle'
import { GeneralBtn } from '../../../components/Button'
import { setAdminProductsPageInArray } from '../../../utils'

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 75vw;
  border: 1px solid transparent;
  margin: 40px auto;
  font-size: ${FONT_SIZE.sm};
  ${ADMIN_MEDIA_QUERY.md} {
    max-width: 1680px;
    font-size: ${FONT_SIZE.md};
  }
  ${ADMIN_MEDIA_QUERY.lg} {
    max-width: 1680px;
    font-size: ${FONT_SIZE.md};
  }
`
const SearchContainer = styled.div`
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const SearchSideContainer = styled.div`
  display: flex;
`
const PaginatorDiv = styled.div`
  margin: 20px auto;
`

const SearchResultDiv = styled.div`
  display: flex;
  height: 300px;
  align-items: center;
  justify-content: center;
`

function CancelButton({ onCancelClick }) {
  return (
    <GeneralBtn
      color='admin_blue'
      buttonStyle={{ marginLeft: '8px' }}
      onClick={onCancelClick}
    >
      取消
    </GeneralBtn>
  )
}
function DeleteButton({ onDeleteClick }) {
  return (
    <GeneralBtn color='admin_grey' onClick={onDeleteClick}>
      刪除
    </GeneralBtn>
  )
}

export default function AdminProducts() {
  let showProductsList
  let pagesArray
  let totalPage
  let showProductsByPage
  const [products, setProducts] = useState([])
  const [productId, setProductId] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const { isSuperAdmin } = useContext(AdminContext)
  const { page = 1 } = useParams()
  const keywords = useLocation().search.trim(' ')
  const keywordString = qs.parse(keywords, { ignoreQueryPrefix: true }).search
  const history = useHistory()
  const location = useLocation()
  const productsPerPage = 12
  const perPageSliceStart = (Number(page) - 1) * productsPerPage
  const perPageSliceEnd = Number(page) * productsPerPage
  const checkModal = useModal('此帳號沒有相關權限')
  const deleteModal = useModal('確定要刪除嗎？')
  const { isLoading: searchLoading, fetchData: searchProduct } = useFetch(
    `/admin/products/${keywords}`
  )
  const { isLoading: getProductsLoading, fetchData: getAllProducts } =
    useFetch(`/admin/products`)
  const { fetchData: deleteProduct } = useFetch(
    `/admin/products/${productId}`,
    {
      method: 'DELETE'
    }
  )

  useLayoutEffect(() => {
    if (keywords) {
      searchProduct({
        handler: (value) => {
          setProducts((products) => value?.data)
        },
        errorHandler: () => {
          history.push('/admin/404')
        }
      })
    }
    if (!keywords) {
      getAllProducts({
        handler: (value) => {
          setProducts((products) => value?.data)
        },
        errorHandler: () => {
          history.push('/admin/404')
        }
      })
    }
  }, [keywords, getAllProducts, searchProduct, history])

  if (products) {
    showProductsList = products.filter((product) =>
      categoryFilter === 'all' ? product : product.category === categoryFilter
    )
    pagesArray = setAdminProductsPageInArray(showProductsList.length).pagesArray
    totalPage = setAdminProductsPageInArray(showProductsList.length).totalPage
    showProductsByPage = showProductsList.slice(
      perPageSliceStart,
      perPageSliceEnd
    )
  }

  if (totalPage) {
    parseInt(page) > totalPage && history.push('/admin/404')
  }

  const handleOnClick = useCallback(() => {
    checkModal.handleModalOpen()
  }, [checkModal])

  const handleOnDeleteClick = useCallback(() => {
    isSuperAdmin ? deleteModal.handleModalOpen() : checkModal.handleModalOpen()
  }, [isSuperAdmin, deleteModal, checkModal])

  const handleDropDownChange = useCallback(
    (e) => {
      setCategoryFilter((categoryFilter) => e.target.value)
      if (keywords) {
        history.push('/admin/products/1')
      }
      if (location.pathname !== '/admin/products/1')
        history.push('/admin/products/1')
    },
    [history, location, keywords]
  )

  const handleDelete = useCallback(() => {
    deleteProduct({
      handler: () => {
        const deletedProductsList = products.filter(
          (product) => product.id !== productId
        )
        setProducts((products) => deletedProductsList)
        if ((showProductsByPage.length - 1) % productsPerPage === 0) {
          history.push(`/admin/products/${totalPage - 1}`)
        }
        deleteModal.handleModalClose()
      },
      errorHandler: (error) => {
        return alert(error.message)
      }
    })
  }, [
    deleteProduct,
    deleteModal,
    history,
    products,
    showProductsByPage,
    totalPage,
    productId
  ])

  return (
    <ProductIdContext.Provider value={{ productId, setProductId }}>
      <PageWrapper>
        {(searchLoading || getProductsLoading) && <Loading />}
        {isSuperAdmin ? (
          <deleteModal.Modal
            buttonOne={<DeleteButton onDeleteClick={handleDelete} />}
            buttonTwo={
              <CancelButton
                onCancelClick={() => {
                  deleteModal.setIsModal(false)
                }}
              />
            }
          />
        ) : (
          <checkModal.Modal />
        )}
        <SearchContainer>
          <SearchSideContainer>
            <Search />
            <CategoryDropdown onChange={handleDropDownChange} />
          </SearchSideContainer>
          <SearchSideContainer>
            {isSuperAdmin ? (
              <Link style={{ width: '100px' }} to={'/admin/products/add'}>
                <GeneralBtn color='admin_blue'>新增商品</GeneralBtn>
              </Link>
            ) : (
              <GeneralBtn
                buttonStyle={{ width: '100px' }}
                color='admin_blue'
                onClick={handleOnClick}
              >
                新增商品
              </GeneralBtn>
            )}
          </SearchSideContainer>
        </SearchContainer>
        {keywords && products.length === 0 ? (
          <SearchResultDiv>{`您搜尋的關鍵字「${keywordString}」，沒有找到符合的商品`}</SearchResultDiv>
        ) : (
          <Table
            products={showProductsByPage}
            handleModalOpen={handleOnDeleteClick}
          />
        )}
        <PaginatorDiv>
          {pagesArray &&
            pagesArray.map((pageValue) => {
              return (
                <PaginatorButton
                  key={pageValue}
                  page={pageValue}
                  to={`/admin/products/${pageValue}`}
                  active={pageValue === parseInt(page)}
                ></PaginatorButton>
              )
            })}
        </PaginatorDiv>
      </PageWrapper>
    </ProductIdContext.Provider>
  )
}
