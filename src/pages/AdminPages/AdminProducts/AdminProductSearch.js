import { Search } from '../../../components/admin/productManage/SearchStyle'
import { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'

const keywordsSearch = (history, setInputValue, keyword) => {
  history.push(`/admin/search/1?search=${keyword}`)
  setInputValue((inputValue) => '')
}

export default function SearchMenu() {
  const [inputValue, setInputValue] = useState([])
  const keyword = inputValue.trim('').replace(/ /g, '%2B')
  const history = useHistory()

  const handleOnChange = useCallback((e) => {
    setInputValue(e.target.value)
  }, [])

  // const handleOnClick = useCallback(() => {
  //   keywordsSearch(history, setInputValue, keyword)
  // }, [history, keyword])

  // const handleKeyDown = useCallback(
  //   (e) => {
  //     if (e.keyCode !== 13) return
  //     keywordsSearch(history, setInputValue, keyword)
  //   },
  //   [history, keyword]
  // )

  return (
    <Search
      onChange={handleOnChange}
      // onKeyDown={handleKeyDown}
      // onClick={handleOnClick}
    />
  )
}
