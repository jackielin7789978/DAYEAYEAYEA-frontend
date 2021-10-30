import styled from 'styled-components'
import { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { HoverArea, MenuContainer, CSSTriangle, Title } from './MenuStyles'
import { COLOR, FONT_SIZE, MEDIA_QUERY } from '../../constants/style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const RestyledHoverArea = styled(HoverArea)`
  ${MEDIA_QUERY.desktop} {
    right: 160px;
  }
  ${MEDIA_QUERY.widescreen} {
    right: 20vw;
  }
`
const SearchTitle = styled(Title)`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
`
const SearchMenuContainer = styled(MenuContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const SearchInput = styled.input`
  display: ${({ $isOpen }) => ($isOpen ? 'inline-block' : 'none')};
  width: 100%;
  padding: 9px 21px;
  border: 1px solid ${COLOR.border_grey};
  color: ${COLOR.text_dark};
  border-radius: 30px;
  background: ${COLOR.light};
  font-size: ${FONT_SIZE.sm};
  line-height: ${FONT_SIZE.sm};
  height: 34px;

  &:focus {
    outline: none;
    border: 1px solid ${COLOR.border_grey};
  }
}
`
const SearchButton = styled(FontAwesomeIcon)`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  margin-left: 8px;
  cursor: pointer;
  color: ${COLOR.grey};
`
const SearchDiv = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? 'inline-block' : 'none')};
  display: flex;
  align-items: center;
  width: 100%;
  ${MEDIA_QUERY.tablet} {
    width: 80%;
  }
  ${MEDIA_QUERY.desktop} {
    width: 80%;
  }
`
const keywordsSearch = (history, setInputValue, keyword) => {
  history.push(`/search/?search=${keyword}&p=1`)
  setInputValue((inputValue) => '')
}

export default function SearchMenu({ handleHover, $isOpen }) {
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
    <RestyledHoverArea
      onMouseOver={() => {
        handleHover('search')
      }}
      onMouseOut={() => {
        handleHover('')
      }}
      $isOpen={$isOpen}
    >
      <SearchMenuContainer $isOpen={$isOpen}>
        <CSSTriangle $isOpen={$isOpen} />
        <SearchTitle $isOpen={$isOpen}>找商品</SearchTitle>
        <SearchDiv $isOpen={$isOpen}>
          <SearchInput
            $isOpen={$isOpen}
            placeholder='搜尋關鍵字'
            type='text'
            name='search'
            value={inputValue}
            onChange={handleOnChange}
            onKeyDown={handleKeyDown}
          />
          <SearchButton
            $isOpen={$isOpen}
            onClick={handleOnClick}
            icon={faSearch}
          />
        </SearchDiv>
      </SearchMenuContainer>
    </RestyledHoverArea>
  )
}
