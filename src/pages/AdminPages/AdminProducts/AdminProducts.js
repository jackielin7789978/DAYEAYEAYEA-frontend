import styled from 'styled-components'
import { useState, useEffect, useCallback } from 'react'
import { useParams, useLocation, useHistory } from 'react-router'
import { ADMIN_MEDIA_QUERY } from '../../../constants/style'
import {
  CategoryDropdown,
  Search
} from '../../../components/admin/productManage/Search'
import Table from '../../../components/admin/productManage/Table'
import { PaginatorButton } from '../../../components/admin/PaginatorStyle'
import { GeneralBtn } from '../../../components/Button'
import { adminLogin } from '../../../webAPI/adminAPIs'
import {
  getAllProducts,
  searchProductsFromAdmin
} from '../../../webAPI/adminProductsAPI'
import { setAdminProductsPageInArray } from '../../../utils'
import { AdminPageWidth } from '../../../components/general'

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
  const { page } = useParams()
  const keywords = useLocation().search
  const history = useHistory()
  const location = useLocation()
  const productsPerPage = 10
  const perPageSliceStart = (Number(page) - 1) * productsPerPage
  const perPageSliceEnd = Number(page) * productsPerPage
  let showProductsList = products.filter((product) =>
    categoryFilter === 'all' ? product : product.category === categoryFilter
  )
  const { pagesArray } = setAdminProductsPageInArray(showProductsList.length)
  const showProductsByPage = showProductsList.slice(
    perPageSliceStart,
    perPageSliceEnd
  )

  useEffect(() => {
    adminLogin('admin01', 'Admin1357')
    if (keywords) {
      searchProductsFromAdmin(keywords).then((result) => {
        if (result.ok === 0) {
          history.push('/404')
        }
        setProducts(result.data)
      })
    }
    if (!keywords) {
      getAllProducts().then((result) => {
        setProducts(result.data)
      })
    }
  }, [keywords, history])

  // fix here
  const handleDropDownChange = useCallback(
    (e) => {
      setCategoryFilter((categoryFilter) => e.target.value)
      if (location.pathname !== '/admin/products/1')
        history.push('/admin/products/1')
    },
    [history, location]
  )

  return (
    <PageWrapper>
      <SearchContainer>
        <SearchSideContainer>
          <Search />
          <CategoryDropdown onChange={handleDropDownChange} />
        </SearchSideContainer>
        <SearchSideContainer>
          <div style={{ width: '100px' }}>
            <GeneralBtn color='admin_blue'>新增商品</GeneralBtn>
          </div>
        </SearchSideContainer>
      </SearchContainer>
      <Table products={showProductsByPage} />
      <PaginatorDiv>
        {pagesArray.map((pageValue) => {
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
