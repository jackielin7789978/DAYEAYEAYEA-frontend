import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
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
const StyledSearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translate(0, -50%);
  cursor: pointer;
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

const keywordsSearch = (history, setInputValue, keyword) => {
  history.push(`/admin/products/1?search=${keyword}`)
  setInputValue((inputValue) => '')
}

function CategoryDropdown({ onChange }) {
  return (
    <Dropdown
      name='filter'
      id='filter'
      onChange={onChange}
      defaultValue={'DEFAULT'}
    >
      <option value='DEFAULT' disabled>
        商品分類
      </option>
      <option value='all'>所有商品</option>
      <option value='home'>居家生活</option>
      <option value='apparel'>服飾配件</option>
      <option value='kitchenware'>廚房餐具</option>
      <option value='food'>食材雜貨</option>
      <option value='stationery'>設計文具</option>
      <option value='outdoor'>休閒戶外</option>
    </Dropdown>
  )
}

function Search() {
  const [inputValue, setInputValue] = useState('')
  const keyword = inputValue.trim('').replace(/ /g, '%2B')
  const history = useHistory()

  const handleOnChange = useCallback((e) => {
    setInputValue(e.target.value)
  }, [])

  const handleOnClick = useCallback(() => {
    keywordsSearch(history, setInputValue, keyword)
  }, [history, keyword])

  const handleKeyDown = useCallback(
    (e) => {
      if (e.keyCode !== 13) return
      keywordsSearch(history, setInputValue, keyword)
    },
    [history, keyword]
  )

  return (
    <Wrapper>
      <StyledSearchIcon icon={faSearch} onClick={handleOnClick} />
      <Input
        placeholder='搜尋商品'
        type='text'
        name='search'
        value={inputValue}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
      ></Input>
    </Wrapper>
  )
}

export { CategoryDropdown, Search, StyledSearchIcon, Wrapper, Input }
