import { useEffect } from 'react'
import { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { FONT_SIZE, ADMIN_COLOR } from '../../../../constants/style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
// import { changeProductImgById } from '../../../../webAPI/adminProductsAPI'
import {
  Form,
  Input,
  InputTitle,
  ErrorMsg,
  ButtonForImgForm,
  RequireMsg,
  FormTitleComponent
} from '../FormStyle'

const EditIcon = styled(FontAwesomeIcon)`
  margin-left: 10px;
  margin-top: 60px;
  cursor: pointer;

  & path {
    color: ${ADMIN_COLOR.Btn_darkgrey};
  }
`
const CheckIcon = styled(FontAwesomeIcon)`
  margin-left: 10px;
  margin-top: 60px;
  cursor: pointer;

  & path {
    color: ${ADMIN_COLOR.Btn_blue};
  }
`

const ImgInput = styled(Input)`
  margin-top: 3px;
`
const ImgForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 30px;
  height: 100%;
`
const ImgPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 22%;
  height: 100%;
  margin-right: 5px;
`
const ImgUrlSetContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 76%;
  height: 100%;
`
const ImgUrlWithTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 30px 5px 0px 0px;
  width: 100%;
`
const SmallTitle = styled.div`
  font-size: ${FONT_SIZE.xs};
  margin: 5px 0px;
`
const ImgInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 29%;
  margin-top: 20px;
`
const ImgContainer = styled.div`
  display: flex;
  width: 70%;
  height: 60%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border: 1px solid ${ADMIN_COLOR.border_grey};
  color: ${ADMIN_COLOR.grey};
  ${({ $isBlank }) => !$isBlank && 'color: transparent'};
  justify-content: center;
  align-items: center;
`

function ImgPreviewSet({ title, imgUrl }) {
  let $isBlank = imgUrl ? false : true
  return (
    <ImgPreviewContainer>
      <InputTitle>{title}</InputTitle>
      <ImgContainer
        style={{ backgroundImage: `url(${imgUrl})` }}
        $isBlank={$isBlank}
      >
        圖片預覽
      </ImgContainer>
    </ImgPreviewContainer>
  )
}

function ImgUrlWithTitle({
  title,
  name,
  placeholder,
  disabled,
  formData,
  setFormData
}) {
  const [inputValue, setInputValue] = useState('')

  const handleOnChange = (e) => {
    const targetValue = e.target.value.trim(' ')
    const targetName = e.target.name
    setInputValue((inputValue) => targetValue)
    if (!targetValue) {
      delete formData[targetName]
      return setFormData(formData)
    }
    const newFormData = {
      ...formData,
      [targetName]: targetValue
    }
    setFormData(newFormData)
  }

  return (
    <ImgUrlWithTitleContainer>
      <SmallTitle>{title}</SmallTitle>
      <ImgInput
        type='text'
        name={name}
        placeholder={placeholder}
        value={inputValue}
        disabled={disabled}
        onChange={handleOnChange}
        formData={formData}
        setFormData={setFormData}
      />
    </ImgUrlWithTitleContainer>
  )
}

function ImgInputSet({ productImgUrl, span, id, require }) {
  const [isDisabled, setIsDisabled] = useState(true)
  const [buttonStatus, setButtonStatus] = useState('edit')
  const [errorMsg, setErrorMsg] = useState('')
  const [imgData, setImgData] = useState({})

  const handleEditClick = useCallback(() => {
    setIsDisabled((isDisabled) => !isDisabled)
    setButtonStatus((buttonStatus) => 'save')
  }, [])

  // fix
  const handleCheckClick = useCallback(() => {
    const length = Object.keys(imgData).length
    if (length === 1 && require)
      return setErrorMsg((errorMsg) => '此欄位為必填欄位')

    if (length !== 1 && length !== 4) {
      return setErrorMsg((errorMsg) => '請完整填入三張圖片')
    }
    //新增圖片 API
    setErrorMsg((errorMsg) => '')
    setIsDisabled((isDisabled) => !isDisabled)
    setButtonStatus((buttonStatus) => 'edit')
  }, [imgData, require])

  return (
    <ImgInputContainer>
      <ImgPreviewSet
        title='圖片預覽'
        imgUrl={productImgUrl.imgUrlMd}
      ></ImgPreviewSet>
      <ImgUrlSetContainer>
        <InputTitle>
          圖片 URL
          <RequireMsg>{span}</RequireMsg>
        </InputTitle>
        <ImgInputContainer>
          <ImgUrlWithTitle
            title='Small Size'
            name='imgUrlSm'
            placeholder='small-size ImgURL'
            formData={imgData}
            setFormData={setImgData}
            disabled={isDisabled}
          />
          <ImgUrlWithTitle
            title='Medium Size'
            name='imgUrlMd'
            placeholder='medium-size ImgURL'
            formData={imgData}
            setFormData={setImgData}
            disabled={isDisabled}
          />
          <ImgUrlWithTitle
            title='Large Size'
            name='imgUrlLg'
            placeholder='large-size ImgURL'
            formData={imgData}
            setFormData={setImgData}
            disabled={isDisabled}
          />
          {buttonStatus === 'edit' ? (
            <EditIcon icon={faEdit} onClick={handleEditClick} />
          ) : (
            <CheckIcon icon={faCheckCircle} onClick={handleCheckClick} />
          )}
        </ImgInputContainer>
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
      </ImgUrlSetContainer>
    </ImgInputContainer>
  )
}

export default function DetailImgForm() {
  const history = useHistory()

  const handleLeaveClick = useCallback(
    (e) => {
      e.preventDefault()
      history.push('/admin/products/1')
    },
    [history]
  )

  return (
    <ImgForm>
      <FormTitleComponent title='商品圖片網址' />
      <div style={{ marginTop: '40px', height: '100%' }}>
        <ImgInputSet span='* 必填欄位' require='true' />
        <ImgInputSet />
        <ImgInputSet />
      </div>
      <ButtonForImgForm onLeaveClick={handleLeaveClick} />
    </ImgForm>
  )
}
