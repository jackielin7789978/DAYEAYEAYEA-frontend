import styled from 'styled-components'
import { useContext } from 'react'
import { css } from '@emotion/react'
import SyncLoader from 'react-spinners/SyncLoader'
import { ADMIN_COLOR } from '../../constants/style'
import { LoadingContext } from '../../context'

const FixedBackground = styled.div`
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
`

const IsLoadingStyle = styled.div`
  margin: 0 auto;
  position: fixed;
  z-index: 4;
  top: 50%;
  left: ${(props) => (props.isNavClick ? '55%' : '50%')};
  transform: ${(props) =>
    props.isNavClick ? 'translate(-24%, -50%)' : 'translate(-50%, -50%)'};
`

const override = css`
  display: block;
  margin: 0 auto;
`

export function AdminIsLoadingComponent() {
  const { isNavClick } = useContext(LoadingContext)
  return (
    <FixedBackground>
      <IsLoadingStyle isNavClick={isNavClick}>
        <SyncLoader
          color={ADMIN_COLOR.table_blue}
          css={override}
          size='13px'
          margin='15px'
          speedMultiplier='2'
        />
      </IsLoadingStyle>
    </FixedBackground>
  )
}
