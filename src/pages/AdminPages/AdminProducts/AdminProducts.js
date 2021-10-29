import styled from 'styled-components'
import { useState, useLayoutEffect, useCallback, useContext } from 'react'
import { useParams, useLocation, useHistory, Link } from 'react-router-dom'
import { LoadingContext } from '../../../context'
import { AdminIsLoadingComponent } from '../../../components/admin/AdminIsLoading'
import {
  CategoryDropdown,
  Search
} from '../../../components/admin/productManage/Search'
import Table from '../../../components/admin/productManage/Table'
import { PaginatorButton } from '../../../components/admin/PaginatorStyle'
import { GeneralBtn } from '../../../components/Button'
import {
  getAllProducts,
  searchProductsFromAdmin
} from '../../../webAPI/adminProductsAPI'
import { setAdminProductsPageInArray } from '../../../utils'

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid transparent;
  padding: 40px 20px;
`
const SearchContainer = styled.div`
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  width: 95%;
`

const SearchSideContainer = styled.div`
  display: flex;
`
const PaginatorDiv = styled.div`
  margin: 10px auto;
`

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [categoryFilter, setCategoryFilter] = useState('all')
  const { isLoading, setIsLoading } = useContext(LoadingContext)
  const { page } = useParams()
  const keywords = useLocation().search
  const history = useHistory()
  const location = useLocation()
  const productsPerPage = 10
  const perPageSliceStart = (Number(page) - 1) * productsPerPage
  const perPageSliceEnd = Number(page) * productsPerPage
  let showProductsList
  let pagesArray
  let showProductsByPage

  useLayoutEffect(() => {
    setIsLoading(true)
    if (keywords) {
      searchProductsFromAdmin(keywords).then((result) => {
        if (!result) return setIsLoading((isLoading) => true)
        if (result.ok === 0) {
          return history.push('/404')
        }
        setIsLoading(false)
        setProducts(result.data)
      })
    }
    if (!keywords) {
      getAllProducts().then((result) => {
        if (!result) return setIsLoading((isLoading) => true)
        if (result.ok === 0) {
          return history.push('/404')
        }
        setIsLoading(false)
        setProducts(result.data)
      })
    }
  }, [keywords, history, setIsLoading])

  if (products) {
    showProductsList = products.filter((product) =>
      categoryFilter === 'all' ? product : product.category === categoryFilter
    )
    pagesArray = setAdminProductsPageInArray(showProductsList.length).pagesArray
    showProductsByPage = showProductsList.slice(
      perPageSliceStart,
      perPageSliceEnd
    )
  }

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

  return (
    <PageWrapper>
      {isLoading && <AdminIsLoadingComponent />}
      <SearchContainer>
        <SearchSideContainer>
          <Search />
          <CategoryDropdown onChange={handleDropDownChange} />
        </SearchSideContainer>
        <SearchSideContainer>
          <Link style={{ width: '100px' }} to={'/admin/products/add'}>
            <GeneralBtn color='admin_blue'>新增商品</GeneralBtn>
          </Link>
        </SearchSideContainer>
      </SearchContainer>
      <Table products={showProductsByPage} />
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
  )
}
