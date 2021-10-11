import styled from 'styled-components'
import { COLOR, FONT_SIZE } from '../constants/style'
import { Link } from 'react-router-dom'

const PaginatorButtonStyle = styled(Link)`
  background: transport;
  color: ${COLOR.text_primary_light};
  margin: 0px 4px;
  padding: 0px 4px;
  font-size: ${FONT_SIZE.md};

  &:hover {
    color: ${COLOR.text_primary_dark};
    border-bottom: 1px solid ${COLOR.border_primary};
  }

  ${(props) =>
    props.$active &&
    `
  font-weight: bold;
  border-bottom: 1px solid ${COLOR.text_primary_dark};
  `}
`

export function PaginatorButton({ to, page, active }) {
  return (
    <PaginatorButtonStyle key={page} to={to} $active={active}>
      {page}
    </PaginatorButtonStyle>
  )
}
