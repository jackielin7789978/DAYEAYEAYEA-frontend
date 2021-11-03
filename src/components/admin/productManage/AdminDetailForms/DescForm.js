import { useState, useCallback, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { ADMIN_COLOR, COLOR } from '../../../../constants/style'
import { changeProductInfoById } from '../../../../webAPI/adminProductsAPI'
import { checkInputIsValid } from '../../../../utils'
import { AdminContext, ModalContext } from '../../../../context'
import { PermissionDeniedModal } from '../AdminProductModal'
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
  const { isSuperAdmin } = useContext(AdminContext)
  const { isModalOpen, setIsModalOpen, handleModalClose } =
    useContext(ModalContext)
  const [errorMsgForName, setErrorMsgForName] = useState('')
  const [errorMsgForShort, setErrorMsgForShort] = useState('')
  const [errorMsgForLong, setErrorMsgForLong] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const [validCheck, setValidCheck] = useState(true)
  const [buttonStatus, setButtonStatus] = useState('edit')
  const [isValid, setIsValid] = useState({
    name: true,
    shortDesc: true,
    longDesc: true
  })

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
        targetValue.length > 30
          ? setErrorMsgForName('此欄位不得超過中英文 30 個字')
          : setErrorMsgForName('')
        errorMsgForName
          ? setIsValid({ ...isValid, [e.target.name]: false })
          : setIsValid({ ...isValid, [e.target.name]: true })
      }
      if (targetName === 'shortDesc') {
        targetValue ? setErrorMsgForShort('') : setErrorMsgForShort(errMsg)
        targetValue.length > 200
          ? setErrorMsgForName('此欄位不得超過中英文 200 個字')
          : setErrorMsgForName('')
        errorMsgForShort
          ? setIsValid({ ...isValid, [e.target.name]: false })
          : setIsValid({ ...isValid, [e.target.name]: true })
      }
      if (targetName === 'longDesc') {
        targetValue ? setErrorMsgForLong('') : setErrorMsgForLong(errMsg)
        errorMsgForLong
          ? setIsValid({ ...isValid, [e.target.name]: false })
          : setIsValid({ ...isValid, [e.target.name]: true })
      }
    },
    [errorMsgForName, errorMsgForShort, errorMsgForLong, isValid]
  )

  const handleLeaveClick = useCallback(
    (e) => {
      e.preventDefault()
      history.push('/admin/products/1')
    },
    [history]
  )

  const handleEditClick = useCallback(
    (e) => {
      e.preventDefault()
      if (!isSuperAdmin) return setIsModalOpen(true)
      setIsDisabled((isDisabled) => !isDisabled)
      setButtonStatus((buttonStatus) => 'save')
    },
    [isSuperAdmin, setIsModalOpen]
  )

  const handleSaveClick = useCallback(
    (e) => {
      e.preventDefault()
      const allCheck = checkInputIsValid(isValid)
      if (!allCheck) {
        if (!validCheck) return
        setValidCheck(false)
        return alert('請完整填寫正確商品資訊後再提交')
      } else {
        setValidCheck(true)
        changeProductInfoById(id, descData).then((result) => {
          if (result.ok !== 1) return alert(result.message)
          alert('成功修改商品資訊')
          setIsDisabled((isDisabled) => !isDisabled)
          setButtonStatus((buttonStatus) => 'edit')
        })
      }
    },
    [isValid, id, descData, validCheck]
  )
  return (
    <DescForm>
      <PermissionDeniedModal open={isModalOpen} onClose={handleModalClose} />
      <FormTitleComponent title={'商品名稱敘述'} />
      <ComponentDiv>
        <InputTitle>
          商品名稱:<span>請輸入中英文 30 個字以內之商品名稱</span>
        </InputTitle>
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
        <InputTitle>
          商品簡述:<span>請輸入中英文 200 個字以內之商品短述</span>
        </InputTitle>
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
        validCheck={validCheck}
        onLeaveClick={handleLeaveClick}
        onEditClick={handleEditClick}
        onSaveClick={handleSaveClick}
      />
    </DescForm>
  )
}
