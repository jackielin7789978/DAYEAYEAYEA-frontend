import styled from 'styled-components'
import { ADMIN_COLOR, COLOR, FONT_SIZE } from '../../../constants/style'
import { EditBtn, LogoutBtn, SaveBtn } from '../../../components/Button'

const FormWrapper = styled.div`
  min-height: 900px;
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
`
const FormTitle = styled.div`
  font-size: ${FONT_SIZE.lg};
  color: ${ADMIN_COLOR.table_blue};
  margin-bottom: 10px;
`
const FormTitleBorder = styled.div`
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

//InfoForm
const DropdownStyle = styled.select`
  width: 200px;
  padding: 8px;
  border: 1px solid ${ADMIN_COLOR.border_grey};
  margin-left: 12px;
  &:focus {
    border: 1px solid ${ADMIN_COLOR.border_dark_grey};
  }
`

function Dropdown({ onChange, dropdownTitle, valueArray }) {
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
        return <option value={value}>{value}</option>
      })}
    </DropdownStyle>
  )
}

export {
  FormWrapper,
  Form,
  Input,
  InputTitle,
  ErrorMsg,
  RequireMsg,
  FormTitle,
  FormTitleBorder,
  Dropdown,
  ButtonGroup,
  ButtonForImgForm
}
