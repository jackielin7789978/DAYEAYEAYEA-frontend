import styled from 'styled-components'
import { COLOR, FONT_SIZE, MEDIA_QUERY } from '../constants/style'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'

const FixedBackground = styled.div`
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
`

const ModalContent = styled.div`
  background: ${COLOR.light};
  font-size: ${FONT_SIZE.lg};
  color: ${COLOR.text_dark};
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 220px;
  width: 315px;
  margin: 0px auto;
  padding: 20px;
  z-index: 4;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${MEDIA_QUERY.tablet} {
    height: 260px;
    width: 420px;
  }
  ${MEDIA_QUERY.desktop} {
    height: 260px;
    width: 420px;
  }
`

const ModalIconDiv = styled.div`
  margin-bottom: 20px;
`

const ModalBtnDiv = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-around;
`

const ModalContentDiv = styled.div`
  word-wrap: break-word;
`

const CancelRoundedColorIcon = styled(CancelRoundedIcon)`
  position: absolute;
  top: 12px;
  left: 15px;
  fill: ${COLOR.grey};
  font-size: 32px;
  cursor: pointer;
`

function ModalIcon({ icon }) {
  return <ModalIconDiv>{icon}</ModalIconDiv>
}

function ModalButton({ buttonOne, buttonTwo }) {
  return (
    <ModalBtnDiv>
      {buttonOne}
      {buttonTwo}
    </ModalBtnDiv>
  )
}

function GeneralModal({ icon, children, buttonOne, buttonTwo }) {
  return (
    <ModalContent>
      <CancelRoundedColorIcon />
      <ModalIcon icon={icon} />
      <ModalContentDiv>{children}</ModalContentDiv>
      <ModalButton buttonOne={buttonOne} buttonTwo={buttonTwo}></ModalButton>
    </ModalContent>
  )
}

function FullModal({ icon, children, buttonOne, buttonTwo }) {
  return (
    <FixedBackground>
      <GeneralModal
        icon={icon}
        children={children}
        buttonOne={buttonOne}
        buttonTwo={buttonTwo}
      />
    </FixedBackground>
  )
}

export { FullModal, GeneralModal }
