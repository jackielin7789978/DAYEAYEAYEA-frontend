import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search'
import { useState, useCallback } from 'react'
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
  cursor: pointer;
`
export const Dropdown = styled.select`
  width: 200px;
  padding: 10px;
  border: 1px solid ${ADMIN_COLOR.border_grey};
  margin-left: 12px;
  &:focus {
    border: 1px solid ${ADMIN_COLOR.border_dark_grey};
  }
`
export function Search({ content, onClick, onKeyDown, onChange, inputValue }) {
  return (
    <Wrapper>
      <StyledSearchIcon onClick={onClick} />
      <Input
        placeholder={content}
        type='text'
        name='search'
        value={inputValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
      ></Input>
    </Wrapper>
  )
}
