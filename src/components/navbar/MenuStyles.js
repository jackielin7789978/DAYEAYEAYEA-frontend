import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { COLOR, FONT_SIZE, MEDIA_QUERY } from '../../constants/style'

export const HoverArea = styled.div`
  position: fixed;
  overflow: hidden;
  height: 100vh;
  width: 100%;
  transition: linear 0.3s;
  top: ${({ $isOpen }) => ($isOpen ? '50px' : '-100vh')};
  background: ${COLOR.light};
  z-index: 1;
  ${MEDIA_QUERY.desktop} {
    transition: ease 0.2s;
    height: ${({ $isOpen }) => ($isOpen ? 'unset' : '0px')};
    width: ${({ $isOpen }) => ($isOpen ? '380px' : 'unset')};
    top: 40px;
    right: 110px;
    background: transparent;
  }
`
export const MenuContainer = styled.div`
  width: 84%;
  margin: 20px auto;
  position: relative;
  button {
    width: 100%;
    height: 35px;
    background: ${COLOR.primary_light};
    color: #fff;
    border-radius: 3px;
  }
  ${MEDIA_QUERY.desktop} {
    width: unset;
    display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
    outline: 1px solid
      ${({ $isOpen }) => ($isOpen ? COLOR.primary_light : 'transparent')};
    height: ${({ $isOpen }) => ($isOpen ? '100%' : '0px')};
    padding: ${({ $isOpen }) => ($isOpen ? '16px' : '0px')};
    background: ${COLOR.light};
    position: relative;
    bottom: 0;
    margin: ${({ $isOpen }) => ($isOpen ? '10px 0 0 0;' : '0px')};
  }
`
const Triangle = styled.div`
  ${MEDIA_QUERY.desktop} {
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 15px solid ${COLOR.primary_light};
    position: absolute;
    top: -15px;
    right: 32px;

    p {
      width: 0;
      height: 0;
      border-left: 14px solid transparent;
      border-right: 14px solid transparent;
      border-bottom: 14px solid ${COLOR.light};
      position: absolute;
      right: -14px;
      top: 1px;
    }
  }
`
export const Title = styled.div`
  text-align: center;
  font-size: ${FONT_SIZE.md};
  font-weight: bold;
  margin-bottom: 10px;
`
export const AccountTitle = styled(Link)`
  font-size: ${FONT_SIZE.sm};
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  font-size: ${FONT_SIZE.md};
  padding: 20px;
  font-weight: bold;
  color: ${COLOR.text_dark};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 12%;
  & + & {
    border-top: 2px solid ${COLOR.border_grey};
  }

  &:hover {
    color: ${COLOR.text_primary_dark};
  }
  ${MEDIA_QUERY.desktop} {
    padding: 10px;
  }
`
export function CSSTriangle({ $isOpen }) {
  return (
    <Triangle $isOpen={$isOpen}>
      <p></p>
    </Triangle>
  )
}
