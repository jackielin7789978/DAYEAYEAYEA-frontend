import { useContext } from 'react'
import { LocalStorageContext } from '../../context'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { COLOR, FONT_SIZE, MEDIA_QUERY } from '../../constants/style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { formatPrice } from '../../utils'

const ItemContainer = styled.div`
  border-bottom: 2px solid ${COLOR.border_grey};
  padding: 20px 0px;
  display: flex;
  position: relative;
  ${MEDIA_QUERY.desktop} {
    padding: 10px 0px;
  }
`
const Pic = styled(Link)`
  min-width: 70px;
  height: 70px;
  background: url(${({ $img }) => $img}) no-repeat center;
  background-size: cover;
  &:hover {
    transition: all 0.3s;
    transform: scale(1.05);
  }
`
const Info = styled.div`
  padding-left: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const Name = styled(Link)`
  font-size: ${FONT_SIZE.sm};
  font-weight: bold;
  color: ${COLOR.text_dark};
  &:hover {
    transition: all 0.2s;
    color: ${COLOR.text_black};
  }
  ${MEDIA_QUERY.desktop} {
    font-size: ${FONT_SIZE.xs};
  }
`
const NumPrice = styled.div`
  font-size: ${FONT_SIZE.sm};
  font-weight: bold;
  letter-spacing: 1px;
  ${MEDIA_QUERY.desktop} {
    font-size: ${FONT_SIZE.xs};
  }
`
const RemoveBtn = styled(FontAwesomeIcon)`
  cursor: pointer;
  position: absolute;
  right: 2px;
  bottom: 16px;
  ${MEDIA_QUERY.desktop} {
    bottom: 8px;
    transition: all 0.1s;
    &:hover {
      color: ${COLOR.primary_dark} !important;
    }
  }
`

export default function CartItem({ id, name, img, price, quantity }) {
  const { handleRemoveCartItem } = useContext(LocalStorageContext)
  return (
    <ItemContainer>
      <Pic to={`/products/${id}`} style={{ height: '70px' }} $img={img} />
      <Info>
        <Name to={`/products/${id}`}>{name}</Name>
        <NumPrice>
          {quantity} x {formatPrice(price)}
        </NumPrice>
        <RemoveBtn
          icon={faTrashAlt}
          onClick={() => {
            handleRemoveCartItem(id)
          }}
        />
      </Info>
    </ItemContainer>
  )
}
