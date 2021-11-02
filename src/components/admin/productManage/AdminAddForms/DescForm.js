import { useState, useCallback } from 'react'
import styled from 'styled-components'
import { ADMIN_COLOR, COLOR } from '../../../../constants/style'
import { Input, InputTitle, FormTitleComponent, ErrorMsg } from '../FormStyle'

const DescInput = styled(Input)`
  margin-top: 8px;
  width: 90%;
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
  productDetail,
  setProductDetail,
  isChecked,
  setIsChecked
}) {
  const { name, longDesc, shortDesc } = productDetail
  const [errorMsgForName, setErrorMsgForName] = useState('')
  const [errorMsgForShort, setErrorMsgForShort] = useState('')
  const [errorMsgForLong, setErrorMsgForLong] = useState('')

  const setDescDataIsValid = useCallback((targetName, imgDataIsValid) => {
    return (isChecked) => ({
      ...isChecked,
      [targetName]: imgDataIsValid
    })
  }, [])

  const handleOnChange = useCallback(
    (e) => {
      const targetValue = e.target.value
      const targetName = e.target.name
      setProductDetail((productDetail) => ({
        ...productDetail,
        [targetName]: targetValue
      }))
    },
    [setProductDetail]
  )

  const handleOnBlur = useCallback(
    (e) => {
      const targetName = e.target.name
      const targetValue = e.target.value.trim(' ')
      const errMsg = '此欄位不得為空'
      const checkValid = (targetValue, setErrorMsg, errMsg, targetName) => {
        if (!targetValue) {
          setErrorMsg(errMsg)
          return setIsChecked(setDescDataIsValid(targetName, false))
        }
        setErrorMsg('')
        setIsChecked(setDescDataIsValid(targetName, true))
      }
      if (targetName === 'name') {
        checkValid(targetValue, setErrorMsgForName, errMsg, targetName)
        if (targetValue.length > 30) {
          setErrorMsgForName('此欄位不得超過中英文 30 個字')
          setIsChecked(setDescDataIsValid(targetName, false))
        } else {
          setErrorMsgForName('')
          setIsChecked(setDescDataIsValid(targetName, true))
        }
      }
      if (targetName === 'shortDesc') {
        checkValid(targetValue, setErrorMsgForShort, errMsg, targetName)
        if (targetValue.length > 200) {
          setErrorMsgForShort('此欄位不得超過中英文 200 個字')
          setIsChecked(setDescDataIsValid(targetName, false))
        } else {
          setErrorMsgForShort('')
          setIsChecked(setDescDataIsValid(targetName, true))
        }
      }
      if (targetName === 'longDesc') {
        return checkValid(targetValue, setErrorMsgForLong, errMsg, targetName)
      }
    },
    [setIsChecked, setDescDataIsValid]
  )

  return (
    <DescForm>
      <FormTitleComponent title={'商品名稱敘述'} />
      <ComponentDiv>
        <InputTitle>
          商品名稱:<span>請輸入中英文 30 個字以內之商品名稱</span>
        </InputTitle>
        <DescInput
          name='name'
          value={name}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />
        {errorMsgForName && <ErrorMsg>{errorMsgForName}</ErrorMsg>}
      </ComponentDiv>
      <ComponentDiv>
        <InputTitle>
          商品簡述:<span>請輸入中英文 200 個字以內之商品短述</span>
        </InputTitle>
        <DescTextArea
          style={{ width: '90%', height: '100px' }}
          name='shortDesc'
          value={shortDesc}
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
          value={longDesc}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />
        {errorMsgForLong && <ErrorMsg>{errorMsgForLong}</ErrorMsg>}
      </ComponentDiv>
    </DescForm>
  )
}
