import { useState, useCallback } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { ADMIN_COLOR, COLOR } from '../../../../constants/style'
import { changeProductInfoById } from '../../../../webAPI/adminProductsAPI'
import {
  Form,
  Input,
  InputTitle,
  FormTitleComponent,
  ButtonGroup,
  ErrorMsg
} from '../FormStyle'

const DescInput = styled(Input)`
  margin-top: 8px;
  width: 90%;
`
const DescForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  padding: 30px;
  height: 100%;
`
const ComponentDiv = styled.div`
  margin-top: 20px;
`
const DescTextArea = styled.textarea`
  margin-top: 8px;
  padding: 10px;
  border-radius: 3px;
  border: solid 1px ${ADMIN_COLOR.border_grey};
  white-space: pre-wrap;
  ::placeholder {
    color: ${COLOR.text_placeholder};
  }
  &:focus {
    border: solid 1px ${ADMIN_COLOR.border_dark_grey};
  }
`

export default function DetailDescForm({ product }) {
  const history = useHistory()
  const { id } = useParams()
  const { name, shortDesc, longDesc } = product
  const [descData, setDescData] = useState({ name, shortDesc, longDesc })
  const [errorMsgForName, setErrorMsgForName] = useState('')
  const [errorMsgForShort, setErrorMsgForShort] = useState('')
  const [errorMsgForLong, setErrorMsgForLong] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const [isValid, setIsValid] = useState(true)
  const [buttonStatus, setButtonStatus] = useState('edit')

  const handleOnChange = useCallback(
    (e) => {
      const targetValue = e.target.value
      const targetName = e.target.name
      const newDescData = {
        ...descData,
        [targetName]: targetValue
      }
      setDescData(newDescData)
    },
    [descData]
  )

  const handleOnBlur = useCallback(
    (e) => {
      const targetName = e.target.name
      const targetValue = e.target.value.trim(' ')
      const errMsg = '此欄位不得為空'
      if (targetName === 'name') {
        targetValue ? setErrorMsgForName('') : setErrorMsgForName(errMsg)
        targetValue.length > 40
          ? setErrorMsgForName('此欄位不得超過中英文 40 個字')
          : setErrorMsgForName('')
        errorMsgForName ? setIsValid(true) : setIsValid(false)
      }
      if (targetName === 'shortDesc') {
        targetValue ? setErrorMsgForShort('') : setErrorMsgForShort(errMsg)
        targetValue.length > 200
          ? setErrorMsgForName('此欄位不得超過中英文 200 個字')
          : setErrorMsgForName('')
        errorMsgForShort ? setIsValid(true) : setIsValid(false)
      }
      if (targetName === 'longDesc') {
        targetValue ? setErrorMsgForLong('') : setErrorMsgForLong(errMsg)
        errorMsgForLong ? setIsValid(true) : setIsValid(false)
      }
    },
    [errorMsgForName, errorMsgForShort, errorMsgForLong]
  )

  const handleLeaveClick = useCallback(
    (e) => {
      e.preventDefault()
      history.push('/admin/products/1')
    },
    [history]
  )

  const handleEditClick = useCallback((e) => {
    e.preventDefault()
    setIsDisabled((isDisabled) => !isDisabled)
    setButtonStatus((buttonStatus) => 'save')
  }, [])

  const handleSaveClick = useCallback(
    (e) => {
      e.preventDefault()
      if (!isValid) return
      if (isValid) changeProductInfoById(id, descData)
      setIsDisabled((isDisabled) => !isDisabled)
      setButtonStatus((buttonStatus) => 'edit')
    },
    [isValid, id, descData]
  )
  return (
    <DescForm>
      <FormTitleComponent title={'商品名稱敘述'} />
      <ComponentDiv>
        <InputTitle>商品名稱:</InputTitle>
        <DescInput
          name='name'
          value={descData.name}
          disabled={isDisabled}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />
        {errorMsgForName && <ErrorMsg>{errorMsgForName}</ErrorMsg>}
      </ComponentDiv>
      <ComponentDiv>
        <InputTitle>商品簡述:</InputTitle>
        <DescTextArea
          style={{ width: '90%', height: '100px' }}
          name='shortDesc'
          value={descData.shortDesc}
          disabled={isDisabled}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />
        {errorMsgForShort && <ErrorMsg>{errorMsgForShort}</ErrorMsg>}
      </ComponentDiv>
      <ComponentDiv>
        <InputTitle>商品文案:</InputTitle>
        <DescTextArea
          style={{ width: '90%', height: '250px' }}
          name='longDesc'
          value={descData.longDesc}
          disabled={isDisabled}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />
        {errorMsgForLong && <ErrorMsg>{errorMsgForLong}</ErrorMsg>}
      </ComponentDiv>
      <ButtonGroup
        status={buttonStatus}
        isValid={isValid}
        onLeaveClick={handleLeaveClick}
        onEditClick={handleEditClick}
        onSaveClick={handleSaveClick}
      />
    </DescForm>
  )
}
