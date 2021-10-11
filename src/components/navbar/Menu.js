import styled from 'styled-components'
import { COLOR, FONT_SIZE, MEDIA_QUERY } from '../../constants/style'
import { Link, useLocation } from 'react-router-dom'

const CategoryContainer = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: ${({ $isOpen }) => ($isOpen ? '50px' : '-100vh')};
  background: ${COLOR.primary_light};
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s;
  z-index: 1;
  ${MEDIA_QUERY.desktop} {
    flex-direction: row;
    background: transparent;
    position: static;
    height: 90px;
    width: unset;
  }
`
const Category = styled(Link)`
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  border-bottom: 1px solid ${COLOR.border_light};
  font-size: ${FONT_SIZE.md};
  width: 80%;
  color: ${COLOR.text_light};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 12%;
  &:hover {
    color: ${COLOR.text_primary_dark};
  }

  ${(props) =>
    props.$active &&
    `
    font-weight: bold;
  `}

  ${MEDIA_QUERY.tablet} {
    font-size: ${FONT_SIZE.lg};
  }
  ${MEDIA_QUERY.desktop} {
    color: ${COLOR.text_dark};
    font-size: ${FONT_SIZE.md};
    padding: 0 22px;
  }
`

export default function Menu({ $isOpen }) {
  const pathname = useLocation().pathname

  return (
    <CategoryContainer $isOpen={$isOpen}>
      <Category
        to='/categories/all/1'
        $active={pathname.includes('/categories/all')}
      >
        所有商品
      </Category>
      <Category
        to='/categories/home/1'
        $active={pathname.includes('/categories/home')}
      >
        居家生活
      </Category>
      <Category
        to='/categories/apparel/1'
        $active={pathname.includes('/categories/apparel')}
      >
        服飾配件
      </Category>
      <Category
        to='/categories/kitchenware/1'
        $active={pathname.includes('/categories/kitchenware')}
      >
        廚房餐具
      </Category>
      <Category
        to='/categories/food/1'
        $active={pathname.includes('/categories/food')}
      >
        食材雜貨
      </Category>
      <Category
        to='/categories/stationery/1'
        $active={pathname.includes('/categories/stationery')}
      >
        設計文具
      </Category>
      <Category
        to='/categories/outdoor/1'
        $active={pathname.includes('/categories/outdoor')}
      >
        休閒戶外
      </Category>
    </CategoryContainer>
  )
}
