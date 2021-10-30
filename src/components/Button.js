import styled from 'styled-components'
import { COLOR, FONT_SIZE, ADMIN_COLOR } from '../constants/style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faShoppingCart,
  faSignInAlt,
  faSignOutAlt,
  faEdit,
  faArrowRight,
  faSave
} from '@fortawesome/free-solid-svg-icons'

const ButtonStyle = styled.button`
  display: inline-block;
  border-radius: 5px;
  font-weight: bold;
  font-size: ${FONT_SIZE.md};
  color: ${COLOR.text_light};
  white-space: nowrap;
  height: 36px;
  width: 100%;
  transition: linear 0.2s;
  background: ${COLOR.light_grey};
  ${(props) =>
    props.color === 'primary' &&
    `background: ${COLOR.primary_light};
      &:hover {
        background: ${COLOR.primary_light_hover};
      }
    `};
  ${(props) =>
    props.color === 'warning' &&
    `background: ${COLOR.warning};

      &:hover {
        background: ${COLOR.warning_hover};
      }
  `};
  ${(props) =>
    props.color === 'accent' &&
    `background: ${COLOR.accent};

      &:hover {
        background: ${COLOR.accent_hover};
      }
  `};
  ${(props) =>
    props.color === 'white' &&
    `background: ${COLOR.light};
     border: 1.5px solid ${COLOR.border_primary};
     color: ${COLOR.primary_light}
  `};
  ${(props) =>
    props.color === 'admin_blue' &&
    `background: ${ADMIN_COLOR.Btn_blue};
      &:hover {
        background: ${ADMIN_COLOR.Btn_blue_hover};
      }
    `};
  ${(props) =>
    props.color === 'admin_grey' &&
    `background: ${ADMIN_COLOR.Btn_grey};
      &:hover {
        background: ${ADMIN_COLOR.Btn_grey_hover};
      }
    `};
`
const ShoppingCardIcon = styled(FontAwesomeIcon)`
  margin-right: 6px;
  margin-top: 2px;
  color: ${COLOR.light};
`
const ColorShoppingCardIcon = styled(FontAwesomeIcon)`
  margin-right: 6px;
  margin-bottom: 2px;
  color: ${COLOR.primary_light};
`
const GeneralIcon = styled(FontAwesomeIcon)`
  margin-left: 6px;
  margin-top: 1px;
  color: ${COLOR.light};
`

function ShoppingCarBtn({ id, color, children, buttonStyle, onClick }) {
  return (
    <ButtonStyle id={id} color={color} style={buttonStyle} onClick={onClick}>
      <ShoppingCardIcon icon={faShoppingCart} />
      {children}
    </ButtonStyle>
  )
}

function ShoppingCarWhiteBtn({ id, children, buttonStyle, onClick }) {
  return (
    <ButtonStyle id={id} color='white' style={buttonStyle} onClick={onClick}>
      <ColorShoppingCardIcon icon={faShoppingCart} />
      {children}
    </ButtonStyle>
  )
}

function ArrowBtn({ id, color, children, buttonStyle, onClick }) {
  return (
    <ButtonStyle id={id} color={color} style={buttonStyle} onClick={onClick}>
      {children}
      <GeneralIcon icon={faArrowRight} />
    </ButtonStyle>
  )
}

function LoginBtn({ id, color, children, buttonStyle, onClick }) {
  return (
    <ButtonStyle id={id} color={color} style={buttonStyle} onClick={onClick}>
      {children}
      <GeneralIcon icon={faSignInAlt} />
    </ButtonStyle>
  )
}

function LogoutBtn({ id, color, children, buttonStyle, onClick }) {
  return (
    <ButtonStyle id={id} color={color} style={buttonStyle} onClick={onClick}>
      {children}
      <GeneralIcon icon={faSignOutAlt} />
    </ButtonStyle>
  )
}

function EditBtn({ id, color, children, buttonStyle, onClick }) {
  return (
    <ButtonStyle id={id} color={color} style={buttonStyle} onClick={onClick}>
      {children}
      <GeneralIcon icon={faEdit} />
    </ButtonStyle>
  )
}

function SaveBtn({ id, color, children, buttonStyle, onClick }) {
  return (
    <ButtonStyle id={id} color={color} style={buttonStyle} onClick={onClick}>
      {children}
      <GeneralIcon icon={faSave} />
    </ButtonStyle>
  )
}

function GeneralBtn({ id, color, children, buttonStyle, onClick }) {
  return (
    <ButtonStyle id={id} color={color} style={buttonStyle} onClick={onClick}>
      {children}
    </ButtonStyle>
  )
}

export {
  ShoppingCarBtn,
  EditBtn,
  GeneralBtn,
  ShoppingCarWhiteBtn,
  LoginBtn,
  LogoutBtn,
  ArrowBtn,
  SaveBtn
}
