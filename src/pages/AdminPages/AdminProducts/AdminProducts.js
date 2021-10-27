import styled from 'styled-components'
import { useState, useEffect, useCallback, useContext } from 'react'
import { useParams, useLocation, useHistory, Link } from 'react-router-dom'
import { LoadingContext } from '../../../context'
import { AdminIsLoadingComponent } from '../../../components/admin/AdminIsLoading'
import { ADMIN_MEDIA_QUERY } from '../../../constants/style'
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid transparent;
  padding: 40px 0px;
  margin-bottom: 60px;
`
const SearchContainer = styled.div`
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  width: 78vw;
  ${ADMIN_MEDIA_QUERY.md} {
    width: 68vw;
    max-width: 1180px;
  }
  ${ADMIN_MEDIA_QUERY.lg} {
    max-width: 1180px;
  }
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
  useEffect(() => {
    if (keywords) {
      setIsLoading(true)
      searchProductsFromAdmin(keywords).then((result) => {
        if (!result) return setIsLoading((isLoading) => true)
        if (result.ok === 0) {
          return history.push('/404')
        }
        setProducts(result.data)
        setIsLoading(false)
      })
    }
    if (!keywords) {
      setIsLoading(true)
      getAllProducts().then((result) => {
        if (!result) return setIsLoading((isLoading) => true)
        if (result.ok === 0) {
          return history.push('/404')
        }
        setProducts(result.data)
        setIsLoading(false)
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
                active={pageValue === page}
              ></PaginatorButton>
            )
          })}
      </PaginatorDiv>
    </PageWrapper>
  )
}
