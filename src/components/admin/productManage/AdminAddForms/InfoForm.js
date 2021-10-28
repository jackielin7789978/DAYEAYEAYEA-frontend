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

const handleBlur = (e, setIsChecked, setErrorMsg, errorMsg) => {
  const targetName = e.target.name
  const targetValue = e.target.value.trim(' ')
  if (!targetValue) {
    setErrorMsg(errorMsg)
    return setIsChecked((isChecked) => ({ ...isChecked, [targetName]: false }))
  }
  setErrorMsg('')
  setIsChecked((isChecked) => ({ ...isChecked, [targetName]: true }))
}

function StatusComponent({ setProductDetail }) {
  const [productStatus, setProductStatus] = useState({
    status: 'on',
    category: 'home',
    article: 'fragrance'
  })
  const handleOnChange = useCallback(
    (e) => {
      setProductStatus({ ...productStatus, [e.target.name]: e.target.value })
      setProductDetail((productDetail) => ({
        ...productDetail,
        [e.target.name]: e.target.value
      }))
    },
    [productStatus, setProductDetail]
  )
  return (
    <InfoFormSetContainer>
      <FormTitleComponent title='商品狀態' />
      <OptionsContainer>
        <StatusDropdown
          name='status'
          productValue={productStatus.status}
          onChange={handleOnChange}
        />
        <CategoriesDropdown
          name='category'
          productValue={productStatus.category}
          onChange={handleOnChange}
        />
        <ArticlesDropdown
          name='article'
          productValue={productStatus.article}
          onChange={handleOnChange}
        />
      </OptionsContainer>
    </InfoFormSetContainer>
  )
}

function PriceComponent({ setProductDetail, setIsChecked }) {
  const errorMessage = '此兩欄位不得為空'
  const [errorMsg, setErrorMsg] = useState('')
  const [inputPriceValue, setInputPriceValue] = useState({
    price: '',
    discountPrice: ''
  })
  const handleOnChange = useCallback(
    (e) => {
      const targetValue = parseInt(e.target.value.trim(' '))
      const newValue = targetValue ? targetValue : ''
      setInputPriceValue({ ...inputPriceValue, [e.target.name]: newValue })
      setProductDetail((productDetail) => ({
        ...productDetail,
        [e.target.name]: newValue
      }))
    },
    [setProductDetail, inputPriceValue]
  )

  const handleOnBlur = useCallback(
    (e) => {
      const { price, discountPrice } = inputPriceValue
      const targetValue = parseInt(e.target.value)
      handleBlur(e, setIsChecked, setErrorMsg, errorMessage)
      if (e.target.name === 'price') {
        if (discountPrice && targetValue < discountPrice) {
          setErrorMsg('原價價格不得低於特價')
          setIsChecked((isChecked) => ({
            ...isChecked,
            [e.target.name]: false
          }))
        }
      }
      if (e.target.name === 'discountPrice') {
        if (price && targetValue > price) {
          setErrorMsg('特價價格不可高於原價')
          setIsChecked((isChecked) => ({
            ...isChecked,
            [e.target.name]: false
          }))
        }
      }
    },
    [setIsChecked, inputPriceValue]
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
          ></PriceInput>
        </SelectedComponent>
      </OptionsContainer>
      {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
    </InfoFormSetContainer>
  )
}

function QuantityComponent({ setProductDetail, setIsChecked }) {
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
    [setProductDetail, setInputQuantityValue]
  )
  const handleOnBlur = useCallback(
    (e) => {
      handleBlur(e, setIsChecked, setErrorMsg, errorMessage)
    },
    [setIsChecked]
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
        ></QuantityInputStyle>
      </OptionsContainer>
      {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
    </InfoFormSetContainer>
  )
}

export default function DetailInfoForm({ setIsChecked, setProductDetail }) {
  return (
    <InfoForm>
      <StatusComponent
        setProductDetail={setProductDetail}
        setIsChecked={setIsChecked}
      ></StatusComponent>
      <PriceComponent
        setProductDetail={setProductDetail}
        setIsChecked={setIsChecked}
      ></PriceComponent>
      <QuantityComponent
        setProductDetail={setProductDetail}
        setIsChecked={setIsChecked}
      ></QuantityComponent>
    </InfoForm>
  )
}
