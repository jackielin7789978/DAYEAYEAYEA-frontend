import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search'
import { ADMIN_COLOR } from '../../../constants/style'

const Wrapper = styled.div`
  position: relative;
`
const Input = styled.input`
  width: 200px;
  padding: 10px 10px 10px 40px;
  border: 1px solid ${ADMIN_COLOR.border_grey};
  &:focus {
    border: 1px solid ${ADMIN_COLOR.border_dark_grey};
  }
`
const StyledSearchIcon = styled(SearchIcon)`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translate(0, -50%);
`
const Dropdown = styled.select`
  width: 200px;
  padding: 10px;
  border: 1px solid ${ADMIN_COLOR.border_grey};
  margin-left: 12px;
  &:focus {
    border: 1px solid ${ADMIN_COLOR.border_dark_grey};
  }
`

export function Search() {
  return (
    <Wrapper>
      <StyledSearchIcon />
      <Input placeholder={'搜尋訂單'}></Input>
    </Wrapper>
  )
}

export function Filter({ handleFilter }) {
  return (
    <Dropdown
      name='filter'
      id='filter'
      onChange={(e) => {
        handleFilter(e.target.value)
      }}
    >
      <option value='所有訂單'>所有訂單</option>
      <option value='處理中'>處理中</option>
      <option value='已出貨'>已出貨</option>
      <option value='已取消'>已取消</option>
      <option>已完成</option>
    </Dropdown>
  )
}
