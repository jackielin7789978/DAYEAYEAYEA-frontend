import styled from 'styled-components'
import { COLOR, FONT_SIZE, ADMIN_COLOR } from '../constants/style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faShoppingCart,
  faArrowRight,
  faEdit
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

  & path {
    color: ${COLOR.light};
  }
`

const ColorShoppingCardIcon = styled(FontAwesomeIcon)`
  margin-right: 6px;
  margin-bottom: 2px;

  & path {
    color: ${COLOR.primary_light};
  }
`

const WhiteArrowForwardIcon = styled(FontAwesomeIcon)`
  margin-left: 6px;
  margin-top: 1px;

  & path {
    color: ${COLOR.light};
  }
`

const EditColorIcon = styled(FontAwesomeIcon)`
  margin-left: 6px;
  margin-top: 1px;

  & path {
    color: ${COLOR.light};
  }
`

function ShoppingCarBtn({ color, children, buttonStyle, id, onClick }) {
  return (
    <ButtonStyle id={id} color={color} style={buttonStyle} onClick={onClick}>
      <ShoppingCardIcon icon={faShoppingCart} />
      {children}
    </ButtonStyle>
  )
}

function ShoppingCarWhiteBtn({ children, buttonStyle, id, onClick }) {
  return (
    <ButtonStyle id={id} color='white' style={buttonStyle} onClick={onClick}>
      <ColorShoppingCardIcon icon={faShoppingCart} />
      {children}
    </ButtonStyle>
  )
}

function ArrowBtn({ color, children, buttonStyle }) {
  return (
    <ButtonStyle color={color} style={buttonStyle}>
      {children}
      <WhiteArrowForwardIcon icon={faArrowRight} />
    </ButtonStyle>
  )
}

function EditBtn({ color, children, buttonStyle }) {
  return (
    <ButtonStyle color={color} style={buttonStyle}>
      {children}
      <EditColorIcon icon={faEdit} />
    </ButtonStyle>
  )
}

function GeneralBtn({ color, children, buttonStyle, id }) {
  return (
    <ButtonStyle color={color} style={buttonStyle} id={id}>
      {children}
    </ButtonStyle>
  )
}

export { ShoppingCarBtn, ArrowBtn, EditBtn, GeneralBtn, ShoppingCarWhiteBtn }
