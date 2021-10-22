import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search'
// import { useState, useCallback } from 'react'
import { ADMIN_COLOR } from '../../../constants/style'

export const Wrapper = styled.div`
  position: relative;
`
export const Input = styled.input`
  width: 200px;
  padding: 10px 10px 10px 40px;
  border: 1px solid ${ADMIN_COLOR.border_grey};
  &:focus {
    border: 1px solid ${ADMIN_COLOR.border_dark_grey};
  }
`
export const StyledSearchIcon = styled(SearchIcon)`
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
