import styled from 'styled-components'
import { HoverArea, MenuContainer, CSSTriangle, Title } from './MenuStyles'
import { MEDIA_QUERY } from '../../constants/style'

const RestyledHoverArea = styled(HoverArea)`
  ${MEDIA_QUERY.desktop} {
    right: 110px;
  }
  ${MEDIA_QUERY.widescreen} {
    right: 18vw;
  }
`

export default function AccountMenu({ handleHover, $isOpen }) {
  return (
    <RestyledHoverArea
      onMouseOver={() => {
        handleHover('account')
      }}
      onMouseOut={() => {
        handleHover('')
      }}
      $isOpen={$isOpen}
    >
      <MenuContainer $isOpen={$isOpen}>
        <CSSTriangle $isOpen={$isOpen} />
        <Title>會員專區</Title>
        {/* TODO */}
      </MenuContainer>
    </RestyledHoverArea>
  )
}
