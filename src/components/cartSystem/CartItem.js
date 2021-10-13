import { useContext } from 'react'
import { LocalStorageContext } from '../../context'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { COLOR, FONT_SIZE, MEDIA_QUERY } from '../../constants/style'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { ImgAnchor } from '../general'

const ItemContainer = styled.div`
  border-bottom: 2px solid ${COLOR.border_grey};
  padding: 20px 0px;
  display: flex;
  position: relative;
  ${MEDIA_QUERY.desktop} {
    padding: 10px 0px;
  }
`
const Pic = styled.div`
  min-width: 70px;
  height: 70px;
  background: url(${({ $img }) => ($img ? $img : $img)});
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
    color: ${COLOR.text_dark};
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
const RemoveBtn = styled(DeleteOutlinedIcon)`
  cursor: pointer;
  position: absolute;
  right: 2px;
  bottom: 16px;
  ${MEDIA_QUERY.desktop} {
    bottom: 8px;
    &:hover {
      fill: ${COLOR.primary_dark};
    }
  }
`

export default function CartItem({ id, name, img, price, quantity }) {
  const { handleRemoveCartItem } = useContext(LocalStorageContext)
  return (
    <ItemContainer>
      <Pic $img={img}>
        <ImgAnchor to={`/products/${id}`} style={{ height: '70px' }} />
      </Pic>
      <Info>
        <Name to={`/products/${id}`}>{name}</Name>
        <NumPrice>
          {quantity} x NT${price}
        </NumPrice>
        <RemoveBtn
          onClick={() => {
            handleRemoveCartItem(id)
          }}
        />
      </Info>
    </ItemContainer>
  )
}
