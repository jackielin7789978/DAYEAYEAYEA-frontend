import { useContext } from 'react'
import styled from 'styled-components'
import {
  HoverArea,
  MenuContainer,
  CSSTriangle,
  AccountTitle
} from './MenuStyles'
import { MEDIA_QUERY } from '../../constants/style'
import { UserContext } from '../../context'
const RestyledHoverArea = styled(HoverArea)`
  ${MEDIA_QUERY.desktop} {
    right: 110px;
    width: 180px;
  }
  ${MEDIA_QUERY.widescreen} {
    right: 18vw;
  }
`
const RestyledMenuContainer = styled(MenuContainer)`
  ${MEDIA_QUERY.desktop} {
    padding: 5px 16px;
  }
`
export default function AccountMenu({ handleHover, $isOpen, $setMenu }) {
  const { user, setUser } = useContext(UserContext)
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
      <RestyledMenuContainer $isOpen={$isOpen}>
        <CSSTriangle $isOpen={$isOpen} />

        {user ? (
          <>
            <AccountTitle to='/member/me'>會員專區</AccountTitle>
            <AccountTitle
              to=''
              onClick={() => {
                localStorage.removeItem('token')
                setUser(null)
                $setMenu('')
              }}
            >
              登出
            </AccountTitle>
          </>
        ) : (
          <AccountTitle to='/login'>登入/註冊</AccountTitle>
        )}
      </RestyledMenuContainer>
    </RestyledHoverArea>
  )
}
