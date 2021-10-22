import styled from 'styled-components'
import { useState, useEffect, useCallback } from 'react'
import { useParams, useLocation, useHistory } from 'react-router'
import { ADMIN_MEDIA_QUERY } from '../../../constants/style'
import { Dropdown } from '../../../components/admin/productManage/SearchStyle'
import { PaginatorButton } from '../../../components/admin/PaginatorStyle'
import { GeneralBtn } from '../../../components/Button'
import { adminLogin } from '../../../webAPI/adminAPIs'
import {
  getAllProducts,
  searchProductsFromAdmin
} from '../../../webAPI/adminProductsAPI'
import { setAdminProductsPageInArray } from '../../../utils'
import Table from './AdminProductsTable'
import Search from './AdminProductSearch'

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
function CategoryDropdown() {
  return (
    <Dropdown name='filter' id='filter'>
      <option value='home'>居家生活</option>
      <option value='apparel'>服飾配件</option>
      <option value='kitchenware'>廚房餐具</option>
      <option value='food'>食材雜貨</option>
      <option value='stationery'>設計文具</option>
      <option value='outdoor'>休閒戶外</option>
    </Dropdown>
  )
}

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const { page } = useParams()
  const keywords = useLocation().search
  const history = useHistory()
  const productsPerPage = 10
  const perPageSliceStart = (Number(page) - 1) * productsPerPage
  const perPageSliceEnd = Number(page) * productsPerPage
  const { pagesArray } = setAdminProductsPageInArray(products.length)
  const productsByPage = products.slice(perPageSliceStart, perPageSliceEnd)
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

  const handleShowAllClick = useCallback(() => {
    history.push('/admin/products/1')
  }, [history])

  return (
    <PageWrapper>
      <SearchContainer>
        <SearchSideContainer>
          <Search />
          <CategoryDropdown />
        </SearchSideContainer>
        <SearchSideContainer>
          <div
            style={{ width: '120px', margin: '6px 0px 0px 10px' }}
            onClick={handleShowAllClick}
          >
            <GeneralBtn color='admin_blue'>顯示所有商品</GeneralBtn>
          </div>
          <div style={{ width: '120px', margin: '6px 0px 0px 10px' }}>
            <GeneralBtn color='admin_blue'>新增商品</GeneralBtn>
          </div>
        </SearchSideContainer>
      </SearchContainer>
      <Table products={productsByPage} />
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
