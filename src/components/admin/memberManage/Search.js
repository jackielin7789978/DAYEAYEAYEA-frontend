import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { ADMIN_COLOR } from '../../../constants/style'
import { useEffect, useState } from 'react'
import { GeneralBtn } from '../../Button'
const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`
const Input = styled.input`
  width: 400px;
  padding: 10px 10px 10px 40px;
  border: 1px solid ${ADMIN_COLOR.border_grey};
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

export function Search({ search, setSearch, isSearching, setIsSearching }) {
  const [clearBtn, setClearBtn] = useState(false)
  useEffect(() => {
    search ? setIsSearching(true) : setIsSearching(false)
    search ? setClearBtn(true) : setClearBtn(false)
  }, [search, setClearBtn, setIsSearching])
  const handleChange = (e) => {
    setSearch(e.target.value)
  }
  return (
    <Wrapper>
      <StyledSearchIcon icon={faSearch} />
      <Input
        placeholder={'輸入帳號、信箱、名稱或是電話來搜尋使用者'}
        value={search}
        onChange={handleChange}
      ></Input>
      {clearBtn && (
        <GeneralBtn
          onClick={() => {
            setSearch('')
          }}
          color={'admin_blue'}
          children={'清除搜尋'}
          buttonStyle={{ width: '100px', marginLeft: '20px' }}
        />
      )}
    </Wrapper>
  )
}
