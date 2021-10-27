import { useState, useCallback } from 'react'
import styled from 'styled-components'
import { ADMIN_COLOR, COLOR } from '../../../../constants/style'
import {
  Form,
  Input,
  InputTitle,
  FormTitleComponent,
  ErrorMsg
} from '../FormStyle'

const DescInput = styled(Input)`
  margin-top: 8px;
  width: 89%;
`
const DescForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  padding: 30px;
  height: 100%;
`
const ComponentDiv = styled.div`
  margin-bottom: 20px;
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

export default function DetailDescForm({
  isChecked,
  setIsChecked,
  productDetail,
  setProductDetail
}) {
  const [descData, setDescData] = useState({})
  const [errorMsgForName, setErrorMsgForName] = useState('')
  const [errorMsgForShort, setErrorMsgForShort] = useState('')
  const [errorMsgForLong, setErrorMsgForLong] = useState('')
  const [isValid, setIsValid] = useState({
    name: true,
    shortDesc: true,
    longDesc: true
  })

  const handleOnChange = useCallback(
    (e) => {
      const targetValue = e.target.value.trim(' ')
      const targetName = e.target.name
      const newDescData = {
        ...descData,
        [targetName]: targetValue
      }
      setDescData(newDescData)
      setProductDetail((productDetail) => ({
        ...productDetail,
        [targetName]: targetValue
      }))
    },
    [setProductDetail, descData]
  )

  const handleOnBlur = useCallback(
    (e) => {
      const targetName = e.target.name
      const targetValue = e.target.value.trim(' ')
      const errMsg = '此欄位不得為空'
      targetValue ? setIsValid(true) : setIsValid(false)
      const falseValid = {
        ...isValid,
        [targetName]: false
      }
      const trueValid = {
        ...isValid,
        [targetName]: true
      }

      const checkValid = (targetValue, setErrorMsg) => {
        targetValue
          ? setErrorMsg('') && setIsValid((isValid) => trueValid)
          : setErrorMsg(errMsg) && setIsValid((isValid) => falseValid)

        targetValue
          ? setIsChecked((isChecked) => ({ ...isChecked, [targetName]: true }))
          : setIsChecked((isChecked) => ({ ...isChecked, [targetName]: false }))
      }
      if (targetName === 'name') {
        return checkValid(targetValue, setErrorMsgForName)
      }
      if (targetName === 'shortDesc') {
        return checkValid(targetValue, setErrorMsgForShort)
      }
      if (targetName === 'longDesc') {
        return checkValid(targetValue, setErrorMsgForLong)
      }
    },
    [setIsChecked, isValid]
  )

  return (
    <DescForm>
      <FormTitleComponent title={'商品名稱敘述'} />
      <ComponentDiv>
        <InputTitle>商品名稱:</InputTitle>
        <DescInput
          name='name'
          value={descData.name}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />
        {errorMsgForName && <ErrorMsg>{errorMsgForName}</ErrorMsg>}
      </ComponentDiv>
      <ComponentDiv>
        <InputTitle>商品簡述:</InputTitle>
        <DescTextArea
          rows='3'
          cols='116'
          name='shortDesc'
          value={descData.shortDesc}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />
        {errorMsgForShort && <ErrorMsg>{errorMsgForShort}</ErrorMsg>}
      </ComponentDiv>
      <ComponentDiv>
        <InputTitle>商品文案:</InputTitle>
        <DescTextArea
          rows='10'
          cols='116'
          name='longDesc'
          value={descData.longDesc}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />
        {errorMsgForLong && <ErrorMsg>{errorMsgForLong}</ErrorMsg>}
      </ComponentDiv>
    </DescForm>
  )
}
