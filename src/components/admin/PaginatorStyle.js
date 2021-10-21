import styled from 'styled-components'
import { ADMIN_COLOR, FONT_SIZE } from '../../constants/style'
import { Link } from 'react-router-dom'

const PaginatorButtonStyle = styled(Link)`
  background: transport;
  color: ${ADMIN_COLOR.Btn_grey};
  margin: 0px 4px;
  padding: 0px 4px;
  font-size: ${FONT_SIZE.md};

  ${(props) =>
    props.$active &&
    `
  font-weight: bold;
  border-bottom: 1px solid ${ADMIN_COLOR.border_grey};
  `}
`

export function PaginatorButton({ to, page, active }) {
  return (
    <PaginatorButtonStyle key={page} to={to} $active={active}>
      {page}
    </PaginatorButtonStyle>
  )
}
