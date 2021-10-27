import { useCallback, useState } from 'react'
import styled from 'styled-components'
import {
  FormTitleComponent,
  PriceInput,
  InputTitle,
  ForNewDropdown,
  SelectedComponent,
  QuantityInputStyle,
  ErrorMsg
} from '../FormStyle'

const InfoForm = styled.div`
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

function StatusDropdown({ value, onChange, name }) {
  return (
    <SelectedComponent>
      <InputTitle>上架狀態</InputTitle>
      <ForNewDropdown
        dropdownTitle='status'
        valueArray={['on', 'off']}
        value={value}
        onChange={onChange}
        name={name}
      />
    </SelectedComponent>
  )
}

function CategoriesDropdown({ value, onChange, name }) {
  return (
    <SelectedComponent>
      <InputTitle>商品分類</InputTitle>
      <ForNewDropdown
        dropdownTitle='Category'
        valueArray={[
          'home',
          'apparel',
          'kitchenware',
          'food',
          'stationery',
          'outdoor'
        ]}
        value={value}
        onChange={onChange}
        name={name}
      />
    </SelectedComponent>
  )
}

function ArticlesDropdown({ value, onChange, name }) {
  return (
    <SelectedComponent>
      <InputTitle>活動文章</InputTitle>
      <ForNewDropdown
        dropdownTitle='article'
        valueArray={['fragrance', 'dining', 'camping', 'null']}
        value={value}
        onChange={onChange}
        name={name}
      />
    </SelectedComponent>
  )
}

// styledComponent End

const handleBlur = (e, isValid, setIsValid, setErrMsg, errorMessage) => {
  const targetValue = parseInt(e.target.value.trim(' '))
  if (!targetValue || targetValue === 0) {
    const falseValid = { ...isValid, [e.target.name]: false }
    setIsValid(falseValid)
    return setErrMsg(errorMessage)
  }
  const trueValid = { ...isValid, [e.target.name]: true }
  setIsValid(trueValid)
  setErrMsg('')
}

function StatusComponent({ setProductDetail, productDetail }) {
  const [productStatus, setProductStatus] = useState({})
  const handleOnChange = useCallback(
    (e) => {
      setProductStatus((productStatus) => ({
        ...productStatus,
        [e.target.name]: e.target.value
      }))
      setProductDetail((productDetail) => ({
        ...productDetail,
        [e.target.name]: e.target.value
      }))
    },
    [setProductDetail]
  )
  return (
    <InfoFormSetContainer>
      <FormTitleComponent title='商品狀態' />
      <OptionsContainer>
        <StatusDropdown
          name='status'
          onChange={() => handleOnChange}
          value={productStatus['status']}
        />
        <CategoriesDropdown
          name='category'
          onChange={() => handleOnChange}
          value={productStatus['category']}
        />
        <ArticlesDropdown
          name='article'
          onChange={() => handleOnChange}
          value={productStatus['article']}
        />
      </OptionsContainer>
    </InfoFormSetContainer>
  )
}

function PriceComponent({
  setProductDetail,
  productDetail,
  isValid,
  setIsValid
}) {
  const errorMessage = '此兩欄位不得為空'
  const [errorMsg, setErrorMsg] = useState('')
  const [inputPriceValue, setInputPriceValue] = useState({})

  const handleOnChange = useCallback(
    (e) => {
      const targetValue = parseInt(e.target.value.trim(' '))
      const newValue = targetValue ? targetValue : ''
      setInputPriceValue((inputPriceValue) => ({
        ...inputPriceValue,
        [e.target.name]: newValue
      }))
      setProductDetail((productDetail) => ({
        ...productDetail,
        [e.target.name]: newValue
      }))
    },
    [setProductDetail]
  )

  const handleOnBlur = useCallback(
    (e) => {
      handleBlur(e, isValid, setIsValid, setErrorMsg, errorMessage)
    },
    [setIsValid, isValid]
  )

  return (
    <InfoFormSetContainer>
      <FormTitleComponent title='商品價格' />
      <OptionsContainer>
        <SelectedComponent>
          <InputTitle>商品原價</InputTitle>
          <PriceInput
            name='price'
            value={inputPriceValue['price']}
            onChange={() => handleOnChange}
            onBlur={() => handleOnBlur}
          ></PriceInput>
        </SelectedComponent>
        <SelectedComponent>
          <InputTitle>
            商品特價
            <SubTitle>(如無特價請輸入同原價價格)</SubTitle>
          </InputTitle>
          <PriceInput
            name='discountPrice'
            value={inputPriceValue['discountPrice']}
            onChange={() => handleOnChange}
            onBlur={() => handleOnBlur}
          ></PriceInput>
        </SelectedComponent>
      </OptionsContainer>
      {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
    </InfoFormSetContainer>
  )
}

function QuantityComponent({
  setProductDetail,
  productDetail,
  isValid,
  setIsValid
}) {
  const [inputQuantityValue, setInputQuantityValue] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const errorMessage = '此欄位不得為空'

  const handleOnChange = useCallback(
    (e) => {
      const targetValue = parseInt(e.target.value.trim(' '))
      const newValue = targetValue ? targetValue : ''
      setInputQuantityValue(newValue)
      setProductDetail((productDetail) => ({
        ...productDetail,
        [e.target.name]: newValue
      }))
    },
    [setProductDetail]
  )

  const handleOnBlur = useCallback(
    (e) => {
      handleBlur(e, isValid, setIsValid, setErrorMsg, errorMessage)
    },
    [setIsValid, isValid]
  )
  return (
    <InfoFormSetContainer>
      <FormTitleComponent title='商品數量' />
      <OptionsContainer>
        <QuantityInputStyle
          name='quantity'
          value={inputQuantityValue}
          onChange={() => handleOnChange}
          onBlur={() => handleOnBlur}
        />
      </OptionsContainer>
      {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
    </InfoFormSetContainer>
  )
}

export default function DetailInfoForm({
  isInfoChecked,
  setIsInfoChecked,
  productDetail,
  setProductDetail
}) {
  const [isValid, setIsValid] = useState({
    quantity: true,
    price: true,
    status: true,
    discountPrice: true,
    category: true,
    article: true
  })

  return (
    <InfoForm>
      <StatusComponent
        isValid={isValid}
        setIsValid={setIsValid}
        setProductDetail={setProductDetail}
        productDetail={productDetail}
      ></StatusComponent>
      <PriceComponent
        isValid={isValid}
        setIsValid={setIsValid}
        setProductDetail={setProductDetail}
        productDetail={productDetail}
      ></PriceComponent>
      <QuantityComponent
        isValid={isValid}
        setIsValid={setIsValid}
        setProductDetail={setProductDetail}
        productDetail={productDetail}
      ></QuantityComponent>
    </InfoForm>
  )
}
