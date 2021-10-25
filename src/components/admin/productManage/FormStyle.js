import styled from 'styled-components'
import { ADMIN_COLOR, COLOR, FONT_SIZE } from '../../../constants/style'
import { EditBtn, LogoutBtn, SaveBtn } from '../../../components/Button'

const FormWrapper = styled.div`
  min-height: 850px;
  height: 100%;
  transition: 1.5s;
  width: 90%;
  margin: 30px auto;
  border: 1px solid ${ADMIN_COLOR.border_grey};
`
const Form = styled.form`
  padding: 20px 0px 50px 0px;
  height: 100%;
`
const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  border-radius: 3px;
  border: solid 1px ${ADMIN_COLOR.border_grey};
  ::placeholder {
    color: ${COLOR.text_placeholder};
  }
  &:focus {
    border: solid 1px ${ADMIN_COLOR.border_dark_grey};
  }
`
const InputTitle = styled.div`
  display: flex;
  font-size: ${FONT_SIZE.md};
  margin-bottom: 10px;
  word-break: break-all;
`
const FormTitle = styled.div`
  font-size: ${FONT_SIZE.lg};
  color: ${ADMIN_COLOR.table_blue};
`
const FormTitleBorder = styled.div`
  margin-top: 5px;
  border-top: 1px solid ${ADMIN_COLOR.border_grey};
`

const ErrorMsg = styled.p`
  margin-top: 5px;
  color: ${ADMIN_COLOR.warning};
  font-size: ${FONT_SIZE.xs};
  font-weight: bold;
  text-align: left;
`
const RequireMsg = styled.p`
  margin-left: 10px;
  margin-top: 3px;
  color: ${ADMIN_COLOR.warning};
  font-size: ${FONT_SIZE.xs};
  font-weight: bold;
  text-align: left;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0px 50px 0px;
`

const ButtonDiv = styled.div`
  width: 15%;
  margin: 0px 8px;
`
function ButtonForImgForm({ onLeaveClick }) {
  return (
    <ButtonContainer>
      <ButtonDiv onClick={onLeaveClick}>
        <LogoutBtn color='admin_blue'>離開</LogoutBtn>
      </ButtonDiv>
    </ButtonContainer>
  )
}

function ButtonGroup({
  status,
  onEditClick,
  onSaveClick,
  onLeaveClick,
  isValid
}) {
  return (
    <ButtonContainer>
      {status === 'edit' ? (
        <ButtonDiv onClick={onEditClick}>
          <EditBtn color='admin_blue'>編輯</EditBtn>
        </ButtonDiv>
      ) : (
        <ButtonDiv onClick={onSaveClick}>
          <SaveBtn color={isValid ? 'admin_blue' : ''}>儲存</SaveBtn>
        </ButtonDiv>
      )}
      <ButtonDiv onClick={onLeaveClick}>
        <LogoutBtn color='admin_blue'>離開</LogoutBtn>
      </ButtonDiv>
    </ButtonContainer>
  )
}

function FormTitleComponent({ title }) {
  return (
    <FormTitle>
      {title}
      <FormTitleBorder />
    </FormTitle>
  )
}

//InfoForm
const SelectedComponent = styled.div`
  width: 33%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`
const DropdownStyle = styled.select`
  width: 200px;
  padding: 8px;
  margin-top: 3px;
  border: 1px solid ${ADMIN_COLOR.border_grey};
  &:focus {
    border: 1px solid ${ADMIN_COLOR.border_dark_grey};
  }
`

function Dropdown({
  onChange,
  dropdownTitle,
  valueArray,
  value,
  productValue,
  disabled,
  name
}) {
  return (
    <DropdownStyle name={name} id='filter' onChange={onChange}>
      {valueArray.map((value) => {
        let isSelected = productValue === value ? true : false
        return (
          <option
            key={value}
            value={value}
            selected={isSelected}
            disabled={disabled}
          >
            {value}
          </option>
        )
      })}
    </DropdownStyle>
  )
}

function ForNewDropdown({ onChange, dropdownTitle, valueArray, productValue }) {
  return (
    <DropdownStyle
      name='filter'
      id='filter'
      defaultValue={'DEFAULT'}
      onChange={onChange}
    >
      <option value='DEFAULT' disabled>
        {dropdownTitle}
      </option>
      {valueArray.map((value) => {
        return (
          <option key={value} value={value}>
            {value}
          </option>
        )
      })}
    </DropdownStyle>
  )
}

const PriceInputContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
`

const InputMark = styled.div`
  width: 12%;
  padding: 3px;
  border-radius: 3px 0px 0px 3px;
  text-align: center;
  border: solid 1px ${ADMIN_COLOR.border_grey} !important;
  border-right: none !important;
  background-color: ${ADMIN_COLOR.light_grey};
`

const PriceInputStyle = styled.input`
  display: block;
  width: 53%;
  padding: 3px;
  border-radius: 0px 3px 3px 0px;
  border: solid 1px ${ADMIN_COLOR.border_grey};
  ::placeholder {
    color: ${COLOR.text_placeholder};
  }
  &:focus {
    border: solid 1px ${ADMIN_COLOR.border_grey};
  }
`

function PriceInput({ value, onChange, onBlur, name, disabled }) {
  return (
    <PriceInputContainer>
      <InputMark style={{ border: '1px solid gray' }}>$</InputMark>
      <PriceInputStyle
        type='text'
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        disabled={disabled}
      ></PriceInputStyle>
    </PriceInputContainer>
  )
}

const QuantityInputStyle = styled.input`
  display: block;
  width: 22%;
  padding: 3px;
  border-radius: 0px 3px 3px 0px;
  border: solid 1px ${ADMIN_COLOR.border_grey};
  ::placeholder {
    color: ${COLOR.text_placeholder};
  }
  &:focus {
    border: solid 1px ${ADMIN_COLOR.border_grey};
  }
`

export {
  FormWrapper,
  Form,
  Input,
  InputTitle,
  ErrorMsg,
  RequireMsg,
  FormTitle,
  FormTitleBorder,
  FormTitleComponent,
  Dropdown,
  ForNewDropdown,
  ButtonGroup,
  ButtonForImgForm,
  PriceInput,
  SelectedComponent,
  QuantityInputStyle
}
