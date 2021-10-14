import styled from 'styled-components'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'

const Counter = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border: solid 1.5px;
  padding: 5px;
`
const Number = styled.input`
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
  count
}) => {
  return (
    <Counter style={marginStyle}>
      <RemoveIcon onClick={() => handleCount('decrement')} />
      <Number type='number' value={count} onChange={handleChange} />
      <AddIcon onClick={() => handleCount('increment')} />
    </Counter>
  )
}
