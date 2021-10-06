import styled from 'styled-components'
import { COLOR, FONT_SIZE } from '../../constants/style'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'

const ItemContainer = styled.div`
  border-bottom: 2px solid ${COLOR.border_grey};
  padding: 14px 0px;
  margin: 10px 0px;
  display: flex;
  position: relative;
`
const Pic = styled.div`
  width: 90px;
  min-width: 90px;
  height: 90px;
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
`
const NumPrice = styled.div`
  font-size: ${FONT_SIZE.sm};
  font-weight: bold;
  padding: 4px 0px;
`
const DeleteBTN = styled(DeleteOutlinedIcon)`
  position: absolute;
  right: 2px;
  bottom: 18px;
`

export default function CartItem() {
  return (
    <ItemContainer>
      <Pic />
      <Info>
        <Name>荷蘭 Kinfill 時髦家事 全方位濃縮劑四件組</Name>
        <NumPrice>1 x NT$ 2,322</NumPrice>
        <DeleteBTN />
      </Info>
    </ItemContainer>
  )
}
