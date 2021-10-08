import styled from 'styled-components'
import { COLOR, FONT_SIZE, MEDIA_QUERY } from '../../constants/style'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'

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
  width: 70px;
  min-width: 70px;
  height: 70px;
  background: ${COLOR.accent};
`
const Info = styled.div`
  padding-left: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const Name = styled.div`
  font-size: ${FONT_SIZE.sm};
  font-weight: bold;
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
  }
`

export default function CartItem({ id, name, price, handleRemove }) {
  return (
    <ItemContainer>
      <Pic />
      <Info>
        <Name>{name}</Name>
        <NumPrice>1 x NT${price}</NumPrice>
        <RemoveBtn
          onClick={() => {
            handleRemove(id)
          }}
        />
      </Info>
    </ItemContainer>
  )
}
