import { useEffect } from 'react'
import { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { FONT_SIZE, ADMIN_COLOR } from '../../../../constants/style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
// import {
//   changeProductImgById,
//   createProductImg,
//   deleteProductImgById
// } from '../../../../webAPI/adminProductsAPI'
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

function ImgInputSet({ span, formData, imgId, require, isNew, setFormData }) {
  // const { id } = useParams()
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

  const handleCheckClick = useCallback(
    (e) => {
      const length = Object.keys(imgData).length
      console.log(length)
      console.log(isNew)
      console.log(imgId)
      if (!isNew) {
        if (length === 1) {
          if (require) {
            return setErrorMsg((errorMsg) => '此欄位為必填欄位')
          }
          //刪除圖片API
        }
        if (length !== 1 && length !== 4) {
          return setErrorMsg((errorMsg) => '請完整填入三張圖片')
        }
        // changeProductImgById(id, imgData)
      } else {
        if (length !== 0 && length !== 3) {
          return setErrorMsg((errorMsg) => '請完整填入三張圖片')
        }
        if (length === 3) {
          // createProductImg({ productId: parseInt(id), ...imgData })
          // setFormData({ productId: parseInt(id), ...imgData })
        }
      }
      setErrorMsg((errorMsg) => '')
      setIsDisabled((isDisabled) => !isDisabled)
      setButtonStatus((buttonStatus) => 'edit')
    },
    [imgData, isNew, require, imgId]
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
            <CheckIcon icon={faCheckCircle} onClick={handleCheckClick} />
          )}
        </ImgInputContainer>
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
      </ImgUrlSetContainer>
    </ImgInputOutContainer>
  )
}

export default function DetailImgForm({ product }) {
  // const productData = JSON.parse(JSON.stringify(product))
  // const imgData = productData.Product_imgs
  const { Product_imgs } = product
  const [productImgUrlOne, setProductImgUrlOne] = useState({})
  const [productImgUrlTwo, setProductImgUrlTwo] = useState({})
  const [productImgUrlThree, setProductImgUrlThree] = useState({})
  // const [idOne, setIdOne] = useState()
  // const [idTwo, setIdTwo] = useState()
  // const [idThree, setIdThree] = useState()
  const history = useHistory()

  useEffect(() => {
    if (Product_imgs) {
      setProductImgUrlOne(Product_imgs[0])
      setProductImgUrlTwo(Product_imgs[1] || {})
      setProductImgUrlThree(Product_imgs[2] || {})
    }
  }, [Product_imgs])

  // useLayoutEffect(() => {
  //   if (imgData) {
  //     setIdOne(imgData[0].id)
  //     setIdTwo(imgData[1].id || null)
  //     setIdThree(imgData[2].id || null)
  //   }
  // }, [imgData])

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
          // imgId={idOne}
          isNew={Object.keys(productImgUrlOne).length === 0 ? true : false}
          require='true'
          formData={productImgUrlOne}
          setFormData={setProductImgUrlOne}
        />
        <ImgInputSet
          // imgId={idTwo}
          isNew={Object.keys(productImgUrlTwo).length === 0 ? true : false}
          formData={productImgUrlTwo}
          setFormData={setProductImgUrlTwo}
        />
        <ImgInputSet
          // imgId={idThree}
          isNew={Object.keys(productImgUrlThree).length === 0 ? true : false}
          formData={productImgUrlThree}
          setFormData={setProductImgUrlThree}
        />
      </FormContentContainer>
      <ButtonForImgForm onLeaveClick={handleLeaveClick} />
    </ImgForm>
  )
}
