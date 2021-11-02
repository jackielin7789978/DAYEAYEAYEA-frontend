import styled from 'styled-components'
import { useContext } from 'react'
import { COLOR, FONT_SIZE, MEDIA_QUERY } from '../constants/style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { ModalContext } from '../context'

const FixedBackground = styled.div`
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  background: rgba(0, 0, 0, 0.5);
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
  transform: ${(props) =>
    props.isNavClick ? 'translate(-50%, -50%)' : 'translate(-24%, -50%)'};
  height: 220px;
  width: 315px;
  margin: 0px auto;
  padding: 20px;
  z-index: 4;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

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
  text-align: center;
`

const CancelRoundedColorIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 12px;
  left: 15px;
  color: ${COLOR.grey};
  font-size: 26px;
  cursor: pointer;
`

function CloseButton({ onClick }) {
  return <CancelRoundedColorIcon icon={faTimesCircle} onClick={onClick} />
}

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

function GeneralModal({ icon, content, buttonOne, buttonTwo, open, onClose }) {
  if (!open) return null
  return (
    <ModalContent>
      <CloseButton onClick={onClose} />
      <ModalIcon icon={icon} />
      <ModalContentDiv>{content}</ModalContentDiv>
      <ModalButton buttonOne={buttonOne} buttonTwo={buttonTwo}></ModalButton>
    </ModalContent>
  )
}

function FullModal({ icon, content, buttonOne, buttonTwo, open, onClose }) {
  const { isNavClick } = useContext(ModalContext)
  if (!open) return null
  return (
    <div>
      <FixedBackground onClick={onClose} />
      <ModalContent isNavClick={isNavClick}>
        <CloseButton onClick={onClose} />
        <ModalIcon icon={icon} />
        <ModalContentDiv>{content}</ModalContentDiv>
        <ModalButton buttonOne={buttonOne} buttonTwo={buttonTwo}></ModalButton>
      </ModalContent>
    </div>
  )
}

export { FullModal, GeneralModal }
