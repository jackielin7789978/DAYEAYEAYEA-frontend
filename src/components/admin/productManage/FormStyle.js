import styled from 'styled-components'
import { Wrapper } from '../../../components/admin/TableStyle'
import { ADMIN_COLOR, COLOR, FONT_SIZE } from '../../../constants/style'

const FormContainer = styled(Wrapper)`
  background: ${ADMIN_COLOR.light_grey};
  border-radius: 20px;
  position: relative;
  margin: 40px auto;
  padding: 20px 40px;
  width: 70vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const FormTitle = styled.h4`
  text-align: center;
  padding: 20px;
  font-weight: bold;
`
const FormInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const FormInput = styled.div`
  display: flex;
  margin-bottom: 50px;
  align-items: flex-start;
  justify-content: flex-start;
`

const FormInputTitleStyle = styled.div`
  font-size: ${FONT_SIZE.md};
  color: ${COLOR.text_dark};
  font-weight: bold;
  white-space: nowrap;
  width: 15%;
`

function FormInputTitle({ title }) {
  return <FormInputTitleStyle>{title}</FormInputTitleStyle>
}

const FormInputMsgDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const FormInputStyle = styled.input`
  width: 42vw;
  padding: 5px;
  border: 1px solid ${ADMIN_COLOR.border_grey};
  &:focus {
    border: 1px solid ${ADMIN_COLOR.border_dark_grey};
  }
  font-size: ${FONT_SIZE.sm};
  color: ${COLOR.text_dark};
  font-weight: bold;
  margin-left: 30px;
  margin-top: 2px;
  white-space: pre-wrap;
`

function FormInputContent({ value }) {
  return <FormInputStyle value={value} />
}

const ErrorMsgStyle = styled.div`
  color: ${COLOR.text_warning};
  font-size: ${FONT_SIZE.xs};
  margin: 10px 0px 0px 30px;
`

const ProductDescTextArea = styled.textarea`
  border: 1px solid ${ADMIN_COLOR.border_grey};
  &:focus {
    border: 1px solid ${ADMIN_COLOR.border_dark_grey};
  }
  font-size: ${FONT_SIZE.sm};
  color: ${COLOR.text_dark};
  font-weight: bold;
  margin-left: 30px;
  margin-top: 2px;
  padding: 5px;
  white-space: pre-wrap;
`

function ProductTextAreaSet({ title, value }) {
  return (
    <FormInput>
      <FormInputTitle title={title} />
      <ProductDescTextArea rows='5' cols='69' value={value} />
    </FormInput>
  )
}

function ProductInputSet({ title, value, className, name, error, onChange }) {
  return (
    <FormInput>
      <FormInputTitle title={title} />
      <FormInputMsgDiv>
        <FormInputContent
          value={value}
          onChange={onChange}
          className={className}
          name={name}
          type='text'
        />
        {error && <ErrorMsgStyle>請填入此欄位</ErrorMsgStyle>}
      </FormInputMsgDiv>
    </FormInput>
  )
}

export {
  FormContainer,
  FormTitle,
  FormInputContainer,
  ProductInputSet,
  ProductTextAreaSet,
  ErrorMsgStyle
}
