import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { COLOR, ADMIN_COLOR, ADMIN_MEDIA_QUERY } from '../../constants/style'

export const Wrapper = styled.div`
  width: 80vw;
  margin: 0px auto;
  ${ADMIN_MEDIA_QUERY.md} {
    width: 70vw;
    max-width: 1200px;
  }
  ${ADMIN_MEDIA_QUERY.lg} {
    max-width: 1200px;
  }
`
export const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-around;
  background: ${ADMIN_COLOR.table_blue};
  padding: 10px 0px 10px 40px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`
export const Header = styled.div`
  color: ${COLOR.text_light};
  font-weight: bold;
  width: ${({ $name }) => ($name === 'Email' ? '40%' : '15%')};
`
export const TableItemContainer = styled.div`
  background: ${ADMIN_COLOR.light_grey};
  padding-bottom: 10px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`
export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0px 10px 40px;
  border-top: 4px solid ${COLOR.light};
`
export const Cell = styled.span`
  width: 15%;
`
export const EditBtn = styled(Link)`
  background: ${ADMIN_COLOR.editBtn_grey};
  color: ${COLOR.text_light};
  padding: 6px 10px;
  border-radius: 3px;
  transition: background 0.2s ease;
  &:hover {
    background: ${ADMIN_COLOR.editBtn_grey_hover};
    color: ${COLOR.text_light};
  }
`
