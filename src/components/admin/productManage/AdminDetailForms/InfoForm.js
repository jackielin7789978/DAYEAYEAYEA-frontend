import { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useHistory, useParams } from 'react-router-dom'
import { changeProductInfoById } from '../../../../webAPI/adminProductsAPI'
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
const handleBlur = (e, setValid, setErrMsg, errorMessage) => {
  const targetValue = parseInt(e.target.value.trim(' '))
  if (!targetValue) {
    setValid(false)
    return setErrMsg(errorMessage)
  }
  setValid(true)
  setErrMsg('')
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
  setIsValid,
  disabled
}) {
  const errorMessage = '此兩欄位不得為空'
  const [errorMsg, setErrorMsg] = useState('')
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
  const handleOnBlur = useCallback(
    (e) => {
      const { price, discountPrice } = inputPriceValue
      const targetValue = parseInt(e.target.value)
      handleBlur(e, setIsValid, setErrorMsg, errorMessage)
      if (isNaN(targetValue)) {
        setErrorMsg('此欄位僅限輸入數字')
        return setIsValid(false)
      }
      if (e.target.name === 'price') {
        if (discountPrice && targetValue < discountPrice) {
          setErrorMsg('原價價格不得低於特價')
          setIsValid(false)
        }
      }
      if (e.target.name === 'discountPrice') {
        if (price && targetValue > price) {
          setErrorMsg('特價價格不可高於原價')
          setIsValid(false)
        }
      }
    },
    [setIsValid, inputPriceValue]
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
            onBlur={handleOnBlur}
            disabled={disabled}
          ></PriceInput>
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
            onBlur={handleOnBlur}
            disabled={disabled}
          ></PriceInput>
        </SelectedComponent>
      </OptionsContainer>
      {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
    </InfoFormSetContainer>
  )
}

function QuantityComponent({
  quantity,
  formData,
  setFormData,
  setIsValid,
  disabled
}) {
  const [inputQuantityValue, setInputQuantityValue] = useState(quantity)
  const [errorMsg, setErrorMsg] = useState('')
  const errorMessage = '此欄位不得為空'
  const handleOnChange = useCallback(
    (e) => {
      const targetValue = parseInt(e.target.value.trim(' '))
      const newValue = targetValue ? targetValue : ''
      setInputQuantityValue(newValue)
      setFormData({ ...formData, [e.target.name]: newValue })
    },
    [setFormData, formData, setInputQuantityValue]
  )

  const handleOnBlur = useCallback(
    (e) => {
      const targetValue = parseInt(e.target.value)
      handleBlur(e, setIsValid, setErrorMsg, errorMessage)
      if (isNaN(targetValue)) {
        setErrorMsg('此欄位僅限輸入數字')
        return setIsValid(false)
      }
    },
    [setIsValid]
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
  const history = useHistory()
  const { id } = useParams()
  const { status, category, article, price, discountPrice, quantity } = product
  const [isValid, setIsValid] = useState(true)
  const [buttonStatus, setButtonStatus] = useState('edit')
  const [isDisabled, setIsDisabled] = useState(true)
  const [InfoData, setInfoData] = useState({
    status,
    category,
    article,
    price,
    discountPrice,
    quantity
  })
  const handleEditClick = useCallback((e) => {
    e.preventDefault()
    setIsDisabled((isDisabled) => !isDisabled)
    setButtonStatus((buttonStatus) => 'save')
  }, [])

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
      if (!isValid) return
      changeProductInfoById(parseInt(id), InfoData)
      setIsDisabled((isDisabled) => !isDisabled)
      setButtonStatus((buttonStatus) => 'edit')
    },
    [isValid, id, InfoData]
  )
  return (
    <InfoForm>
      <StatusComponent
        status={InfoData.status}
        category={InfoData.category}
        article={InfoData.article}
        formData={InfoData}
        setFormData={setInfoData}
        setIsValid={setIsValid}
        disabled={isDisabled}
      ></StatusComponent>
      <PriceComponent
        price={InfoData.price}
        discountPrice={InfoData.discountPrice}
        formData={InfoData}
        setFormData={setInfoData}
        setIsValid={setIsValid}
        disabled={isDisabled}
      ></PriceComponent>
      <QuantityComponent
        quantity={InfoData.quantity}
        formData={InfoData}
        setFormData={setInfoData}
        setIsValid={setIsValid}
        disabled={isDisabled}
      ></QuantityComponent>
      <ButtonGroup
        status={buttonStatus}
        isValid={isValid}
        onLeaveClick={handleLeaveClick}
        onEditClick={handleEditClick}
        onSaveClick={handleSaveClick}
      />
    </InfoForm>
  )
}
