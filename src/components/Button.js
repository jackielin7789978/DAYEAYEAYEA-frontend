import styled from 'styled-components'
import { COLOR, FONT_SIZE, ADMIN_COLOR } from '../constants/style'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'

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

const ShoppingCardIcon = styled(ShoppingCartOutlinedIcon)`
  fill: ${COLOR.light};
  margin-right: 6px;
  margin-bottom: 2px;
`

const ColorShoppingCardIcon = styled(ShoppingCartOutlinedIcon)`
  fill: ${COLOR.primary_light};
  margin-right: 6px;
  margin-bottom: 2px;
`

const WhiteArrowForwardIcon = styled(ArrowForwardIcon)`
  fill: ${COLOR.light};
  margin-left: 6px;
  margin-bottom: 1px;
`

const BorderColorIcon = styled(BorderColorOutlinedIcon)`
  fill: ${COLOR.light};
  margin-left: 6px;
  margin-bottom: 1px;
  font-size: large;
`

function ShoppingCarBtn({ color, children, marginStyle, id, onClick }) {
  return (
    <ButtonStyle id={id} color={color} style={marginStyle} onClick={onClick}>
      <ShoppingCardIcon />
      {children}
    </ButtonStyle>
  )
}

function ShoppingCarWhiteBtn({ children, marginStyle, id, onClick }) {
  return (
    <ButtonStyle id={id} color='white' style={marginStyle} onClick={onClick}>
      <ColorShoppingCardIcon />
      {children}
    </ButtonStyle>
  )
}

function ArrowBtn({ color, children, marginStyle }) {
  return (
    <ButtonStyle color={color} style={marginStyle}>
      {children}
      <WhiteArrowForwardIcon />
    </ButtonStyle>
  )
}

function EditBtn({ color, children, marginStyle }) {
  return (
    <ButtonStyle color={color} style={marginStyle}>
      {children}
      <BorderColorIcon />
    </ButtonStyle>
  )
}

function GeneralBtn({ color, children, marginStyle }) {
  return (
    <ButtonStyle color={color} style={marginStyle}>
      {children}
    </ButtonStyle>
  )
}

export { ShoppingCarBtn, ArrowBtn, EditBtn, GeneralBtn, ShoppingCarWhiteBtn }
