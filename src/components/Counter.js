import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

const Counter = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border: solid 1.5px;
  padding: 5px;
`
const Number = styled.input`
  background: transparent;
  text-align: center;
  width: 100%;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &[type='number'] {
    -moz-appearance: textfield;
  }
`

export const ItemCounter = ({
  marginStyle,
  handleCount,
  handleChange,
  handleOnBlur,
  count,
  targetId
}) => {
  const blockInvalidChar = (e) =>
    ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()
  return (
    <Counter style={marginStyle}>
      <FontAwesomeIcon
        icon={faMinus}
        onClick={() => handleCount('decrement', targetId)}
      />
      <Number
        id={targetId}
        type='number'
        value={count}
        onChange={handleChange}
        onBlur={handleOnBlur}
        onKeyDown={blockInvalidChar}
      />
      <FontAwesomeIcon
        icon={faPlus}
        onClick={() => handleCount('increment', targetId)}
      />
    </Counter>
  )
}
