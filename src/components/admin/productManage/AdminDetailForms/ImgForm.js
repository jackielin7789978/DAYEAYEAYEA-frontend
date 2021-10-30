import { useEffect, useCallback, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { imgVerify } from '../../../../utils'
import { FONT_SIZE, ADMIN_COLOR } from '../../../../constants/style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { changeProductInfoById } from '../../../../webAPI/adminProductsAPI'
import {
  Form,
  Input,
  InputTitle,
  ErrorMsg,
  FormTitleComponent,
  ButtonForImgForm
} from '../FormStyle'

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
const ImgForm = styled(Form)`
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
  height: 75%;
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
  value,
  placeholder,
  disabled,
  formData,
  setFormData
}) {
  const [inputValue, setInputValue] = useState('')
  useEffect(() => {
    if (value) setInputValue((inputValue) => value)
  }, [value])

  const handleOnChange = (e) => {
    const targetValue = e.target.value.trim(' ')
    const targetName = e.target.name
    setInputValue((inputValue) => targetValue)
    if (!targetValue) {
      delete formData[targetName]
      return setFormData((formData) => formData)
    }
    const newFormData = {
      ...formData,
      [targetName]: targetValue
    }
    setFormData((formData) => newFormData)
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

const deleteKeysFromData = (data) => {
  delete data.id
  return data
}

function ImgInputSet({
  id,
  span,
  formData,
  require,
  setFormData,
  isValid,
  setIsValid
}) {
  const [isDisabled, setIsDisabled] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')
  const [imgData, setImgData] = useState({})
  const [buttonStatus, setButtonStatus] = useState('edit')
  const inputId = parseInt(id)

  const setInputValid = useCallback(
    (valid) => {
      return {
        ...isValid,
        [inputId]: valid
      }
    },
    [isValid, inputId]
  )

  const checkIsImg = useCallback((imgData) => {
    const newData = deleteKeysFromData(JSON.parse(JSON.stringify(imgData)))
    let isChecked
    // eslint-disable-next-line array-callback-return
    Object.values(newData).map((imgUrl) => {
      isChecked = imgVerify(imgUrl)
      if (!isChecked) return isChecked
    })
    return isChecked
  }, [])

  useEffect(() => {
    setImgData(formData)
  }, [formData])

  const handleEditClick = useCallback(() => {
    setIsDisabled((isDisabled) => !isDisabled)
    setButtonStatus((buttonStatus) => 'save')
  }, [])

  const handleCheckClick = useCallback(() => {
    const length = Object.keys(imgData).length
    const isNotValid = setInputValid(false)
    const isImgCheck = checkIsImg(imgData)
    if (imgData.id !== undefined) {
      if (length !== 4 && require) {
        setErrorMsg('請完整填入此必填欄位')
        return setIsValid((isValid) => isNotValid)
      }
      if (length !== 1 && length !== 4) {
        setErrorMsg('請完整填入或刪除此三個欄位')
        return setIsValid((isValid) => isNotValid)
      }
      if (length !== 1 && !isImgCheck) {
        setErrorMsg('請輸入結尾為 .jpg/.png/.jpeg 的網址')
        return setIsValid((isValid) => isNotValid)
      }
      setFormData((formData) => imgData)
    }
    if (imgData.id === undefined) {
      if (length !== 0 && length !== 3) {
        setErrorMsg('請完整填入或刪除此三個欄位')
        return setIsValid((isValid) => isNotValid)
      }
      if (length === 3) {
        if (!isImgCheck) {
          setErrorMsg('請輸入結尾為 .jpg/.png/.jpeg 的網址')
          return setIsValid((isValid) => isNotValid)
        }
        setFormData((formData) => imgData)
      }
    }
    setErrorMsg((errorMsg) => '')
    setIsDisabled((isDisabled) => !isDisabled)
    setButtonStatus((buttonStatus) => 'edit')
    const newValid = setInputValid(true)
    setIsValid((isValid) => newValid)
  }, [imgData, require, setIsValid, setFormData, setInputValid, checkIsImg])

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
            value={imgData.imgUrlSm}
            placeholder='small-size ImgURL'
            formData={imgData}
            setFormData={setImgData}
            disabled={isDisabled}
          />
          <ImgUrlWithTitle
            title='Medium Size'
            name='imgUrlMd'
            value={imgData.imgUrlMd}
            placeholder='medium-size ImgURL'
            formData={imgData}
            setFormData={setImgData}
            disabled={isDisabled}
          />
          <ImgUrlWithTitle
            title='Large Size'
            name='imgUrlLg'
            value={imgData.imgUrlLg}
            placeholder='large-size ImgURL'
            formData={imgData}
            setFormData={setImgData}
            disabled={isDisabled}
          />
          {buttonStatus === 'edit' ? (
            <EditIcon icon={faEdit} onClick={handleEditClick} />
          ) : (
            <CheckIcon
              icon={faCheckCircle}
              onClick={handleCheckClick}
              style={{ color: isValid[id] ? '#3689c9' : '#aaa' }}
            />
          )}
        </ImgInputContainer>
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
      </ImgUrlSetContainer>
    </ImgInputOutContainer>
  )
}

export default function DetailImgForm({ product }) {
  const { id } = useParams()
  const { Product_imgs } = product
  const [productImgUrlOne, setProductImgUrlOne] = useState({})
  const [productImgUrlOTwo, setProductImgUrlTwo] = useState({})
  const [productImgUrlThree, setProductImgUrlThree] = useState({})
  const [isValid, setIsValid] = useState({
    1: true,
    2: true,
    3: true
  })
  const [isChecked, setIsChecked] = useState(true)
  const history = useHistory()
  const deleteKeysFromData = (data) => {
    delete data.productId
    delete data.createdAt
    delete data.updatedAt
    return data
  }

  useEffect(() => {
    if (Product_imgs) {
      Product_imgs[0] &&
        setProductImgUrlOne(deleteKeysFromData(Product_imgs[0]))
      Product_imgs[1] &&
        setProductImgUrlTwo(deleteKeysFromData(Product_imgs[1]))
      Product_imgs[2] &&
        setProductImgUrlThree(deleteKeysFromData(Product_imgs[2]))
    }
  }, [Product_imgs])

  const handleLeaveClick = useCallback(
    (e) => {
      e.preventDefault()
      history.push('/admin/products/1')
    },
    [history]
  )

  const handleSaveClick = useCallback(
    (e) => {
      e.preventDefault()
      for (const key in isValid) {
        if (isValid[key] === false) {
          return setIsChecked(false)
        }
        setIsChecked(true)
      }
      const newProductImgs = {
        imgsData: [productImgUrlOne, productImgUrlOTwo, productImgUrlThree]
      }
      changeProductInfoById(parseInt(id), newProductImgs)
    },
    [isValid, productImgUrlOne, productImgUrlOTwo, productImgUrlThree, id]
  )

  return (
    <ImgForm>
      <FormTitleComponent title='商品圖片網址' />
      <FormContentContainer>
        <ImgInputSet
          id='1'
          span='* 必填欄位'
          require='true'
          formData={productImgUrlOne}
          setFormData={setProductImgUrlOne}
          isValid={isValid}
          setIsValid={setIsValid}
        />
        <ImgInputSet
          id='2'
          formData={productImgUrlOTwo}
          setFormData={setProductImgUrlTwo}
          isValid={isValid}
          setIsValid={setIsValid}
        />
        <ImgInputSet
          id='3'
          formData={productImgUrlThree}
          setFormData={setProductImgUrlThree}
          isValid={isValid}
          setIsValid={setIsValid}
        />
      </FormContentContainer>
      <ButtonForImgForm
        onSaveClick={handleSaveClick}
        onLeaveClick={handleLeaveClick}
        isChecked={isChecked}
      />
    </ImgForm>
  )
}
