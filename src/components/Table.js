import styled from 'styled-components'
import { COLOR, MEDIA_QUERY } from '../constants/style'
import { GeneralBtn } from './Button'


const Button = ({ children, onClick }) => {
  const style = {
    width: '50%'
  }
  return <GeneralBtn color={'accent'} buttonStyle={style} children={children} onClick={onClick}/>
}


const Table = styled.table`
  width: 100%;
  text-align: center;
  /* border: 1px solid ${COLOR.border_light_grey}; */
  ${MEDIA_QUERY.tablet} {
    transform: translateY(5%);
  }

  tr {
    display: flex;
  }

  tr + tr {
    border-top: 2px solid ${COLOR.border_light_grey};
  }
  
  th, td {
    padding: 12px 0;
    ${({ col }) => col && `
      width: calc(100%/${col});
    `}
    
  }

  th {
    background: #9A8B66;
    color: #FFF;
  }

  td {
    padding: 16px 0;
  }
`

export {
  Button,
  Table
}
