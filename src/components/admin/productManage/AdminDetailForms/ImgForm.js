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
  imgUrl,
  placeholder,
  disabled,
  formData,
  setFormData
}) {
  const [inputValue, setInputValue] = useState('')
  useEffect(() => {
    if (imgUrl) setInputValue((inputValue) => imgUrl)
  }, [imgUrl])

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

function ImgInputSet({ productImgUrl, span, formData, id, require }) {
  const [isDisabled, setIsDisabled] = useState(true)
  const [buttonStatus, setButtonStatus] = useState('edit')
  const [errorMsg, setErrorMsg] = useState('')
  const [imgData, setImgData] = useState({})
  const getImgData = (formData) => {
    delete formData.id
    delete formData.createdAt
    delete formData.updatedAt
    return formData
  }
  useEffect(() => {
    setImgData((imgData) => getImgData(formData))
  }, [formData])

  const handleEditClick = useCallback(() => {
    setIsDisabled((isDisabled) => !isDisabled)
    setButtonStatus((buttonStatus) => 'save')
  }, [])

  // fix
  const handleCheckClick = useCallback(() => {
    const length = Object.keys(imgData).length
    if (length === 1) {
      if (require) {
        return setErrorMsg((errorMsg) => '此欄位為必填欄位')
      }
      //刪除圖片API
    }
    if (length !== 1 && length !== 4) {
      return setErrorMsg((errorMsg) => '請完整填入三張圖片')
    }
    if (Object.keys(productImgUrl).length === 0) {
      //新增圖片 API
    } else {
      // changeProductImgById(id, imgData)
    }
    setErrorMsg((errorMsg) => '')
    setIsDisabled((isDisabled) => !isDisabled)
    setButtonStatus((buttonStatus) => 'edit')
  }, [imgData, productImgUrl, require])

  return (
    <ImgInputOutContainer>
      <ImgPreviewSet
        title='圖片預覽'
        imgUrl={productImgUrl.imgUrlMd}
      ></ImgPreviewSet>
      <ImgUrlSetContainer>
        <InputTitle>
          圖片 URL<span>{span}</span>
        </InputTitle>
        <ImgInputContainer>
          <ImgUrlWithTitle
            title='Small Size'
            name='imgUrlSm'
            imgUrl={productImgUrl.imgUrlSm}
            placeholder='small-size ImgURL'
            formData={imgData}
            setFormData={setImgData}
            disabled={isDisabled}
          />
          <ImgUrlWithTitle
            title='Medium Size'
            name='imgUrlMd'
            imgUrl={productImgUrl.imgUrlMd}
            placeholder='medium-size ImgURL'
            formData={imgData}
            setFormData={setImgData}
            disabled={isDisabled}
          />
          <ImgUrlWithTitle
            title='Large Size'
            name='imgUrlLg'
            imgUrl={productImgUrl.imgUrlLg}
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
    </ImgInputOutContainer>
  )
}

export default function DetailImgForm({ product }) {
  const { Product_imgs } = product
  const [productImgUrlOne, setProductImgUrlOne] = useState({})
  const [productImgUrlTwo, setProductImgUrlTwo] = useState({})
  const [productImgUrlThree, setProductImgUrlThree] = useState({})
  const history = useHistory()

  useEffect(() => {
    if (Product_imgs) {
      setProductImgUrlOne(Product_imgs[0])
      setProductImgUrlTwo(Product_imgs[1] || {})
      setProductImgUrlThree(Product_imgs[2] || {})
    }
  }, [product, Product_imgs])

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
      <FormContentContainer>
        <ImgInputSet
          span='* 必填欄位'
          id={productImgUrlOne.id}
          require='true'
          productImgUrl={productImgUrlOne}
          formData={productImgUrlOne}
        />
        <ImgInputSet
          id={productImgUrlTwo.id}
          productImgUrl={productImgUrlTwo}
          formData={productImgUrlTwo}
        />
        <ImgInputSet
          id={productImgUrlThree.id}
          productImgUrl={productImgUrlThree}
          formData={productImgUrlThree}
        />
      </FormContentContainer>
      <ButtonForImgForm onLeaveClick={handleLeaveClick} />
    </ImgForm>
  )
}
