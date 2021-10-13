import styled from 'styled-components'
import {
  COLOR,
  FONT,
  FONT_SIZE,
  EFFECT,
  MEDIA_QUERY
} from '../../constants/style'
import { Link } from 'react-router-dom'

const DesktopBar = styled.div`
  ${MEDIA_QUERY.desktop} {
    position: fixed;
    width: 100%;
    display: static;
    height: 40px;
    background: ${COLOR.primary_light};
    z-index: 1;
  }
`
const DesktopContainer = styled.div`
  ${MEDIA_QUERY.desktop} {
    background: ${COLOR.light};
    position: fixed;
    top: 40px;
    width: 100%;
    height: 90px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: ${EFFECT.shadow_dark};
    z-index: 2;
  }
`
const Nav = styled.nav`
  background: ${COLOR.primary_light};
  position: fixed;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;

  ${MEDIA_QUERY.desktop} {
    position: static;
    width: unset;
    background: transparent;
    font-family: ${FONT.logo};
    top: 30px;
    height: 90px;
    box-shadow: none;
  }
`
const LeftIcons = styled.div`
  position: absolute;
  top: 13px;
  left: 2vw;
  display: flex;
  ${MEDIA_QUERY.desktop} {
    position: static;
    top: 0;
    width: 0;
    margin: 0;
  }
`
const RightIcons = styled.div`
  position: absolute;
  top: 13px;
  right: 2vw;
  display: flex;
  ${MEDIA_QUERY.desktop} {
    position: static;
    top: 0;
    width: 0;
    margin: 0;
  }
`
const LOGO = styled(Link)`
  text-decoration: none;
  color: ${COLOR.text_dark};
  font-size: ${FONT_SIZE.xl};
  font-family: ${FONT.logo};
  &:hover {
    color: ${COLOR.text_dark};
  }
  ${MEDIA_QUERY.tablet} {
    font-size: ${FONT_SIZE.xxl};
  }
  ${MEDIA_QUERY.desktop} {
    font-size: ${FONT_SIZE.xxxl};
    position: relative;
  }
`
const BurgerBTN = styled.div`
  cursor: pointer;
  margin: 0 2vw;
  display: ${({ $shouldHide }) => ($shouldHide ? 'none' : 'inline-block')};
  ${MEDIA_QUERY.desktop} {
    padding: 5px;
    position: absolute;
    display: none;
  }
`
const CloseBTN = styled.div`
  cursor: pointer;
  margin: 0 2vw;

  display: ${({ $isClicked }) => ($isClicked ? 'inline-block' : 'none')};
  ${MEDIA_QUERY.desktop} {
    padding: 5px;
    position: absolute;
    display: none;
  }
`
const SearchBTN = styled.div`
  cursor: pointer;
  margin: 0 2vw;
  opacity: ${({ $shouldHide }) => ($shouldHide ? 0 : 1)};
  ${MEDIA_QUERY.desktop} {
    opacity: 1;
    margin-right: 30px;
    padding: 5px;
    position: absolute;
    top: -37px;
    right: 160px;
  }
  ${MEDIA_QUERY.widescreen} {
    right: 20vw;
  }
`
const AccountBTN = styled.div`
  cursor: pointer;
  margin: 0 2vw;
  opacity: ${({ $shouldHide }) => ($shouldHide ? 0 : 1)};
  ${MEDIA_QUERY.desktop} {
    opacity: 1;
    margin-right: 30px;
    padding: 5px;
    position: absolute;
    top: -37px;
    right: 110px;
  }
  ${MEDIA_QUERY.widescreen} {
    right: 18vw;
  }
`
const CartBTN = styled.div`
  position: relative;
  cursor: pointer;
  margin: 0 2vw;
  opacity: ${({ $shouldHide }) => ($shouldHide ? 0 : 1)};
  span {
    position: absolute;
    top: -6px;
    right: -10px;
    display: inline-block;
    width: 20px;
    text-align: center;
    border-radius: 50%;
    background: #8a3f1a;
    background: ${COLOR.warning_hover};
    color: ${COLOR.text_light};
    font-size: ${FONT_SIZE.xs};
    line-height: 20px;
  }
  ${MEDIA_QUERY.desktop} {
    opacity: 1;
    margin-right: 30px;
    padding: 5px;
    position: absolute;
    top: -37px;
    right: 60px;
    span {
      font-size: ${FONT_SIZE.sm};
      line-height: 18px;
      top: 0px;
      right: -8px;
    }
  }
  ${MEDIA_QUERY.widescreen} {
    right: 16vw;
  }
`

export {
  DesktopBar,
  DesktopContainer,
  Nav,
  LeftIcons,
  RightIcons,
  LOGO,
  BurgerBTN,
  CloseBTN,
  SearchBTN,
  AccountBTN,
  CartBTN
}
