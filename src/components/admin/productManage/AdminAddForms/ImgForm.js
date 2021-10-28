import { useCallback, useState } from 'react'
import styled from 'styled-components'
import { FONT_SIZE, ADMIN_COLOR } from '../../../../constants/style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { Input, InputTitle, ErrorMsg, FormTitleComponent } from '../FormStyle'
import { checkIsImg } from '../../../../utils'

const CheckIcon = styled(FontAwesomeIcon)`
  margin-left: 10px;
  margin-top: 60px;
  cursor: pointer;
`
const EditIcon = styled(CheckIcon)`
  color: ${ADMIN_COLOR.Btn_darkgrey};
`
const ImgInput = styled(Input)`
  margin-top: 3px;
`
const ImgForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 30px;
  height: 100%;
`
const ImgInputOutContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 29%;
  margin-top: 20px;
`
const FormContentContainer = styled.div`
  margin-top: 40px;
  height: 100%;
`
const ImgPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 22%;
  height: 100%;
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
  margin: 43px 5px 0px 0px;
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
  height: 100%;
`
const ImgContainer = styled.div`
  display: flex;
  width: 80%;
  height: 72%;
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
  let isBlank = imgUrl ? false : true
  return (
    <ImgPreviewContainer>
      <InputTitle>{title}</InputTitle>
      <ImgContainer
        style={{ backgroundImage: `url(${imgUrl})` }}
        isBlank={isBlank}
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
  value,
  imgData,
  setImgData
}) {
  const [inputValue, setInputValue] = useState(value || '')

  const handleOnChange = (e) => {
    const targetValue = e.target.value.trim(' ')
    const targetName = e.target.name
    setInputValue(targetValue)
    if (!targetValue) {
      delete imgData[targetName]
      return setImgData((imgData) => imgData)
    }
    const newFormData = {
      ...imgData,
      [targetName]: targetValue
    }
    setImgData((imgData) => newFormData)
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
      />
    </ImgUrlWithTitleContainer>
  )
}

function ImgInputSet({
  id,
  name,
  span,
  require,
  imgFromData,
  imgsData,
  setProductDetail,
  isChecked,
  setIsChecked
}) {
  const [imgData, setImgData] = useState(imgFromData)
  const [isDisabled, setIsDisabled] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')
  const [buttonStatus, setButtonStatus] = useState('edit')
  const inputId = parseInt(id)

  const setImgDataIsValid = useCallback(
    (imgDataIsValid) => {
      return (isChecked) => ({
        ...isChecked,
        [name]: imgDataIsValid
      })
    },
    [name]
  )

  const handleEditClick = useCallback(() => {
    setIsDisabled((isDisabled) => !isDisabled)
    setButtonStatus((buttonStatus) => 'save')
    return setIsChecked((isChecked) => ({
      ...isChecked,
      [name]: false
    }))
  }, [name, setIsChecked])

  const handleCheckClick = useCallback(
    (e) => {
      const length = Object.keys(imgData).length
      const isImgVerifyCheck = checkIsImg(imgData)
      if (length === 0 && require) {
        setErrorMsg('請完整填入此必填欄位')
        return setIsChecked(setImgDataIsValid(false))
      }
      if (length !== 0 && length !== 3) {
        setErrorMsg('請完整填入或刪除此三個欄位')
        return setIsChecked(setImgDataIsValid(false))
      }
      if (length === 3 && !isImgVerifyCheck) {
        setErrorMsg('請輸入結尾為 .jpg/.png/.jpeg 的網址')
        return setIsChecked(setImgDataIsValid(false))
      }
      setErrorMsg((errorMsg) => '')
      setIsDisabled((isDisabled) => !isDisabled)
      setButtonStatus((buttonStatus) => 'edit')
      imgsData.splice(inputId, 1, imgData)
      setProductDetail((productDetail) => ({
        ...productDetail,
        imgsData: [...imgsData]
      }))
      return setIsChecked(setImgDataIsValid(true))
    },
    [
      require,
      setProductDetail,
      imgsData,
      inputId,
      setIsChecked,
      imgData,
      setImgDataIsValid
    ]
  )
  return (
    <ImgInputOutContainer>
      <ImgPreviewSet title='圖片預覽' imgUrl={imgData.imgUrlMd}></ImgPreviewSet>
      <ImgUrlSetContainer>
        <InputTitle>
          圖片 URL<span>{span}</span>
        </InputTitle>
        <ImgInputContainer>
          <ImgUrlWithTitle
            title='Small Size'
            name='imgUrlSm'
            placeholder='small-size ImgURL'
            value={imgData.imgUrlSm}
            imgData={imgData}
            setImgData={setImgData}
            disabled={isDisabled}
          />
          <ImgUrlWithTitle
            title='Medium Size'
            name='imgUrlMd'
            placeholder='medium-size ImgURL'
            value={imgData.imgUrlMd}
            imgData={imgData}
            setImgData={setImgData}
            disabled={isDisabled}
          />
          <ImgUrlWithTitle
            title='Large Size'
            name='imgUrlLg'
            placeholder='large-size ImgURL'
            value={imgData.imgUrlLg}
            imgData={imgData}
            setImgData={setImgData}
            disabled={isDisabled}
          />
          {buttonStatus === 'edit' ? (
            <EditIcon icon={faEdit} onClick={handleEditClick} />
          ) : (
            <CheckIcon
              icon={faCheckCircle}
              onClick={handleCheckClick}
              style={{ color: '#3689c9' }}
            />
          )}
        </ImgInputContainer>
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
      </ImgUrlSetContainer>
    </ImgInputOutContainer>
  )
}

export default function DetailImgForm({
  productDetail,
  setProductDetail,
  isChecked,
  setIsChecked
}) {
  const { imgsData } = productDetail
  const imgDataOne = imgsData[0]
  const imgDataTwo = imgsData[1]
  const imgDataThree = imgsData[2]
  return (
    <ImgForm>
      <FormTitleComponent title='商品圖片網址' />
      <FormContentContainer>
        <ImgInputSet
          id='0'
          span='* 必填欄位'
          require='true'
          name='imgsDataOne'
          imgFromData={imgDataOne}
          imgsData={imgsData}
          setProductDetail={setProductDetail}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
        />
        <ImgInputSet
          id='1'
          name='imgsDataTwo'
          imgFromData={imgDataTwo}
          imgsData={imgsData}
          setProductDetail={setProductDetail}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
        />
        <ImgInputSet
          id='2'
          name='imgsDataThree'
          imgFromData={imgDataThree}
          imgsData={imgsData}
          setProductDetail={setProductDetail}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
        />
      </FormContentContainer>
    </ImgForm>
  )
}
