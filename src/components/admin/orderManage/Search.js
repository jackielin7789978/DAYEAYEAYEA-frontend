import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { ADMIN_COLOR } from '../../../constants/style'

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`
const Input = styled.input`
  width: 200px;
  padding: 10px 10px 10px 40px;
  border: 1px solid ${ADMIN_COLOR.border_grey};
  border-radius: 3px;
  &:focus {
    border: 1px solid ${ADMIN_COLOR.border_dark_grey};
  }
`
const StyledSearchIcon = styled(FontAwesomeIcon)`
  font-size: 14px;
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translate(0, -50%);
`
const Dropdown = styled.select`
  display: inline-block;
  width: 200px;
  padding: 11px;
  border: 1px solid ${ADMIN_COLOR.border_grey};
  border-radius: 3px;
  margin-left: 12px;
  &:focus {
    border: 1px solid ${ADMIN_COLOR.border_dark_grey};
  }
`

export function Search({ searchVal, setSearchVal }) {
  return (
    <Wrapper>
      <StyledSearchIcon
        icon={faSearch}
        style={{ color: ADMIN_COLOR.border_dark_grey }}
      />
      <Input
        placeholder={'搜尋訂單'}
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
      ></Input>
    </Wrapper>
  )
}

export function Filter({ filter, handleFilter }) {
  return (
    <Dropdown
      name='filter'
      id='filter'
      onChange={(e) => {
        handleFilter(e.target.value)
      }}
      value={filter}
    >
      <option value='所有訂單'>所有訂單</option>
      <option value='處理中'>處理中</option>
      <option value='已出貨'>已出貨</option>
      <option value='已取消'>已取消</option>
      <option value='已完成'>已完成</option>
    </Dropdown>
  )
}
