import { useCallback, useState, useContext } from 'react'
import styled from 'styled-components'
import { useHistory, useParams } from 'react-router-dom'
import { checkInputIsValid } from '../../../../utils'
import { changeProductInfoById } from '../../../../webAPI/adminProductsAPI'
import { AdminContext, ModalContext } from '../../../../context'
import { PermissionDeniedModal } from '../AdminProductModal'
import {
  Form,
  FormTitleComponent,
  PriceInput,
  InputTitle,
  Dropdown,
  SelectedComponent,
  QuantityInputStyle,
  ButtonGroup,
  ErrorMsg
} from '../FormStyle'

const InfoForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 30px;
  height: 100%;
`
const InfoFormSetContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-around;
  width: 100%;
  height: 33%;
`
const OptionsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-top: 20px;
`

const SubTitle = styled.div`
  font-size: 10px;
  margin-left: 5px;
  margin-top: 5px;
`

function StatusDropdown({ productValue, disabled, onChange, name }) {
  return (
    <SelectedComponent>
      <InputTitle>上架狀態</InputTitle>
      <Dropdown
        valueArray={['on', 'off']}
        productValue={productValue}
        disabled={disabled}
        onChange={onChange}
        name={name}
      />
    </SelectedComponent>
  )
}

function CategoriesDropdown({ productValue, disabled, onChange, name }) {
  return (
    <SelectedComponent>
      <InputTitle>商品分類</InputTitle>
      <Dropdown
        valueArray={[
          'home',
          'apparel',
          'kitchenware',
          'food',
          'stationery',
          'outdoor'
        ]}
        productValue={productValue}
        disabled={disabled}
        onChange={onChange}
        name={name}
      />
    </SelectedComponent>
  )
}

function ArticlesDropdown({ productValue, disabled, onChange, name }) {
  return (
    <SelectedComponent>
      <InputTitle>活動文章</InputTitle>
      <Dropdown
        valueArray={['fragrance', 'dining', 'camping', 'null']}
        productValue={productValue}
        disabled={disabled}
        onChange={onChange}
        name={name}
      />
    </SelectedComponent>
  )
}

// styledComponent End

const handleBlur = (e, isValid, setIsValid, setErrMsg) => {
  const targetValue = e.target.value.trim(' ')
  if (!targetValue) {
    setErrMsg('此欄位不得為空')
    return setIsValid({ ...isValid, [e.target.name]: false })
  }
  if (isNaN(targetValue)) {
    setErrMsg('此欄位僅限輸入數字')
    return setIsValid({ ...isValid, [e.target.name]: false })
  }
  if (targetValue >= 100000) {
    setErrMsg('此欄位數字超過上限五位數')
    return setIsValid({ ...isValid, [e.target.name]: false })
  }
  setErrMsg('')
  setIsValid({ ...isValid, [e.target.name]: true })
}

function StatusComponent({
  status,
  category,
  article,
  disabled,
  setFormData,
  formData
}) {
  const [productStatus, setProductStatus] = useState({
    status,
    category,
    article
  })
  const handleOnChange = useCallback(
    (e) => {
      setProductStatus({ ...productStatus, [e.target.name]: e.target.value })
      setFormData({ ...formData, [e.target.name]: e.target.value })
    },
    [productStatus, formData, setFormData]
  )
  return (
    <InfoFormSetContainer>
      <FormTitleComponent title='商品狀態' />
      <OptionsContainer>
        <StatusDropdown
          name='status'
          productValue={productStatus.status}
          disabled={disabled}
          onChange={handleOnChange}
        />
        <CategoriesDropdown
          name='category'
          productValue={productStatus.category}
          disabled={disabled}
          onChange={handleOnChange}
        />
        <ArticlesDropdown
          name='article'
          productValue={productStatus.article}
          disabled={disabled}
          onChange={handleOnChange}
        />
      </OptionsContainer>
    </InfoFormSetContainer>
  )
}

function PriceComponent({
  price,
  discountPrice,
  formData,
  setFormData,
  isValid,
  setIsValid,
  disabled
}) {
  const [errorMsgForPrice, setErrorMsgForPrice] = useState('')
  const [errorMsgForDiscount, setErrorMsgForDiscount] = useState('')
  const [inputPriceValue, setInputPriceValue] = useState({
    price,
    discountPrice
  })
  const handleOnChange = useCallback(
    (e) => {
      const targetValue = e.target.value.trim(' ')
      setInputPriceValue({ ...inputPriceValue, [e.target.name]: targetValue })
      setFormData({ ...formData, [e.target.name]: targetValue })
    },
    [setFormData, formData, inputPriceValue]
  )
  const handleOnPriceBlur = useCallback(
    (e) => {
      const { discountPrice } = inputPriceValue
      const targetValue = parseInt(e.target.value)
      handleBlur(e, isValid, setIsValid, setErrorMsgForPrice)
      if (discountPrice && targetValue < discountPrice) {
        setErrorMsgForPrice('原價價格不得低於特價')
        return setIsValid({ ...isValid, [e.target.name]: false })
      }
    },
    [setIsValid, inputPriceValue, isValid]
  )

  const handleOnDiscountBlur = useCallback(
    (e) => {
      const { price } = inputPriceValue
      const targetValue = parseInt(e.target.value)
      handleBlur(e, isValid, setIsValid, setErrorMsgForDiscount)
      if (price && targetValue > price) {
        setErrorMsgForDiscount('特價價格不可高於原價')
        return setIsValid({ ...isValid, [e.target.name]: false })
      }
    },
    [setIsValid, inputPriceValue, isValid]
  )

  return (
    <InfoFormSetContainer>
      <FormTitleComponent title='商品價格' />
      <OptionsContainer>
        <SelectedComponent>
          <InputTitle>商品原價</InputTitle>
          <PriceInput
            name='price'
            value={inputPriceValue.price}
            onChange={handleOnChange}
            onBlur={handleOnPriceBlur}
            disabled={disabled}
          ></PriceInput>
          {errorMsgForPrice && <ErrorMsg>{errorMsgForPrice}</ErrorMsg>}
        </SelectedComponent>
        <SelectedComponent>
          <InputTitle>
            商品特價
            <SubTitle>(如無特價請輸入同原價價格)</SubTitle>
          </InputTitle>
          <PriceInput
            name='discountPrice'
            value={inputPriceValue.discountPrice}
            onChange={handleOnChange}
            onBlur={handleOnDiscountBlur}
            disabled={disabled}
          ></PriceInput>
          {errorMsgForDiscount && <ErrorMsg>{errorMsgForDiscount}</ErrorMsg>}
        </SelectedComponent>
      </OptionsContainer>
    </InfoFormSetContainer>
  )
}

function QuantityComponent({
  quantity,
  formData,
  setFormData,
  isValid,
  setIsValid,
  disabled
}) {
  const [inputQuantityValue, setInputQuantityValue] = useState(quantity)
  const [errorMsg, setErrorMsg] = useState('')

  const handleOnChange = useCallback(
    (e) => {
      const targetValue = e.target.value.trim(' ')
      setInputQuantityValue(targetValue)
      setFormData({ ...formData, [e.target.name]: targetValue })
    },
    [setFormData, formData, setInputQuantityValue]
  )

  const handleOnBlur = useCallback(
    (e) => {
      handleBlur(e, isValid, setIsValid, setErrorMsg)
    },
    [isValid, setIsValid]
  )
  return (
    <InfoFormSetContainer>
      <FormTitleComponent title='商品數量' />
      <OptionsContainer>
        <QuantityInputStyle
          name='quantity'
          value={inputQuantityValue}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          disabled={disabled}
        ></QuantityInputStyle>
      </OptionsContainer>
      {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
    </InfoFormSetContainer>
  )
}

export default function DetailInfoForm({ product }) {
  const { isSuperAdmin } = useContext(AdminContext)
  const { isModalOpen, setIsModalOpen, handleModalClose } =
    useContext(ModalContext)
  const history = useHistory()
  const { id } = useParams()
  const { status, category, article, price, discountPrice, quantity } = product
  const [buttonStatus, setButtonStatus] = useState('edit')
  const [isDisabled, setIsDisabled] = useState(true)
  const [validCheck, setValidCheck] = useState(true)
  const [InfoData, setInfoData] = useState({
    status,
    category,
    article,
    price,
    discountPrice,
    quantity
  })
  const [isValid, setIsValid] = useState({
    status: true,
    price: true,
    discountPrice: true,
    quantity: true
  })
  const handleEditClick = useCallback(
    (e) => {
      e.preventDefault()
      if (!isSuperAdmin) return setIsModalOpen(true)
      setIsDisabled((isDisabled) => !isDisabled)
      setButtonStatus((buttonStatus) => 'save')
    },
    [isSuperAdmin, setIsModalOpen]
  )

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
      const allCheck = checkInputIsValid(isValid)
      if (!allCheck) {
        if (!validCheck) return
        setValidCheck(false)
        return alert('請完整填寫正確商品資訊後再提交')
      } else {
        setValidCheck(true)
        changeProductInfoById(parseInt(id), InfoData).then((result) => {
          if (result.ok !== 1) return alert(result.message)
          alert('成功修改商品資訊')
          setIsDisabled((isDisabled) => !isDisabled)
          setButtonStatus((buttonStatus) => 'edit')
        })
      }
    },
    [isValid, id, InfoData, validCheck]
  )
  return (
    <InfoForm>
      <PermissionDeniedModal open={isModalOpen} onClose={handleModalClose} />
      <StatusComponent
        status={InfoData.status}
        category={InfoData.category}
        article={InfoData.article}
        formData={InfoData}
        setFormData={setInfoData}
        isValid={isValid}
        setIsValid={setIsValid}
        disabled={isDisabled}
      ></StatusComponent>
      <PriceComponent
        price={InfoData.price}
        discountPrice={InfoData.discountPrice}
        formData={InfoData}
        setFormData={setInfoData}
        isValid={isValid}
        setIsValid={setIsValid}
        disabled={isDisabled}
      ></PriceComponent>
      <QuantityComponent
        quantity={InfoData.quantity}
        formData={InfoData}
        setFormData={setInfoData}
        isValid={isValid}
        setIsValid={setIsValid}
        disabled={isDisabled}
      ></QuantityComponent>
      <ButtonGroup
        status={buttonStatus}
        validCheck={validCheck}
        onLeaveClick={handleLeaveClick}
        onEditClick={handleEditClick}
        onSaveClick={handleSaveClick}
      />
    </InfoForm>
  )
}
