import styled from 'styled-components'
import { HoverArea, MenuContainer, CSSTriangle, Title } from './MenuStyles'
import { MEDIA_QUERY } from '../../constants/style'

const RestyledHoverArea = styled(HoverArea)`
  ${MEDIA_QUERY.desktop} {
    right: 160px;
  }
`

export default function SearchMenu({ handleHover, $isOpen }) {
  return (
    <RestyledHoverArea
      onMouseOver={() => {
        handleHover('search')
      }}
      onMouseOut={() => {
        handleHover('')
      }}
      $isOpen={$isOpen}
    >
      <MenuContainer $isOpen={$isOpen}>
        <CSSTriangle $isOpen={$isOpen} />
        <Title>找商品</Title>
        {/* TODO */}
      </MenuContainer>
    </RestyledHoverArea>
  )
}
