import {
  Wrapper,
  StyledSearchIcon,
  Input
} from '../../../components/admin/productManage/SearchStyle'
import { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'

const keywordsSearch = (history, setInputValue, keyword) => {
  history.push(`/admin/products/1?search=${keyword}`)
  setInputValue((inputValue) => '')
}

export default function Search() {
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
      <StyledSearchIcon onClick={handleOnClick} />
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
