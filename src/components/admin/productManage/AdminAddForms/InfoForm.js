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
const setImgDataIsValid = (name, imgDataIsValid) => {
  return (isChecked) => ({
    ...isChecked,
    [name]: imgDataIsValid
  })
}

const handleChange = (e, setProductDetail) => {
  const targetValue = e.target.value.trim(' ')
  setProductDetail((productDetail) => ({
    ...productDetail,
    [e.target.name]: targetValue
  }))
}

const handleBlur = (e, setIsChecked, setErrorMsg) => {
  const targetName = e.target.name
  const targetValue = e.target.value.trim(' ')
  if (!targetValue) {
    setErrorMsg('此欄位不得為空')
    return setIsChecked(setImgDataIsValid(targetName, false))
  }
  if (isNaN(targetValue)) {
    setErrorMsg('此欄位僅限輸入數字')
    return setIsChecked(setImgDataIsValid(targetName, false))
  }
  if (targetValue >= 100000) {
    setErrorMsg('此欄位數字超過上限五位數')
    return setIsChecked(setImgDataIsValid(targetName, false))
  }
  setErrorMsg('')
  setIsChecked(setImgDataIsValid(targetName, true))
}

function StatusComponent({ productDetail, setProductDetail }) {
  const { status, category, article } = productDetail
  const handleOnChange = useCallback(
    (e) => {
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
          productValue={status}
          onChange={handleOnChange}
        />
        <CategoriesDropdown
          name='category'
          productValue={category}
          onChange={handleOnChange}
        />
        <ArticlesDropdown
          name='article'
          productValue={article}
          onChange={handleOnChange}
        />
      </OptionsContainer>
    </InfoFormSetContainer>
  )
}

function PriceComponent({ productDetail, setProductDetail, setIsChecked }) {
  const { price, discountPrice } = productDetail
  const [errorMsgForPrice, setErrorMsgForPrice] = useState('')
  const [errorMsgForDiscount, setErrorMsgForDiscount] = useState('')
  const handleOnChange = useCallback(
    (e) => {
      handleChange(e, setProductDetail)
    },
    [setProductDetail]
  )

  const handleOnPriceBlur = useCallback(
    (e) => {
      const targetName = e.target.name
      const targetValue = parseInt(e.target.value)
      handleBlur(e, setIsChecked, setErrorMsgForPrice)
      if (discountPrice && targetValue < discountPrice) {
        setErrorMsgForPrice('原價價格不得低於特價')
        return setIsChecked(setImgDataIsValid(targetName, false))
      }
    },
    [discountPrice, setIsChecked]
  )

  const handleOnDiscountBlur = useCallback(
    (e) => {
      const targetName = e.target.name
      const targetValue = parseInt(e.target.value)
      handleBlur(e, setIsChecked, setErrorMsgForDiscount)

      if (price && targetValue > price) {
        setErrorMsgForDiscount('特價價格不可高於原價')
        return setIsChecked(setImgDataIsValid(targetName, false))
      }
    },
    [price, setIsChecked]
  )
  return (
    <InfoFormSetContainer>
      <FormTitleComponent title='商品價格' />
      <OptionsContainer>
        <SelectedComponent>
          <InputTitle>商品原價</InputTitle>
          <PriceInput
            name='price'
            value={price}
            onChange={handleOnChange}
            onBlur={handleOnPriceBlur}
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
            value={discountPrice}
            onChange={handleOnChange}
            onBlur={handleOnDiscountBlur}
          ></PriceInput>
          {errorMsgForDiscount && <ErrorMsg>{errorMsgForDiscount}</ErrorMsg>}
        </SelectedComponent>
      </OptionsContainer>
    </InfoFormSetContainer>
  )
}

function QuantityComponent({ productDetail, setProductDetail, setIsChecked }) {
  const { quantity } = productDetail
  const [errorMsg, setErrorMsg] = useState('')
  const handleOnChange = useCallback(
    (e) => {
      handleChange(e, setProductDetail)
    },
    [setProductDetail]
  )

  const handleOnBlur = useCallback(
    (e) => {
      handleBlur(e, setIsChecked, setErrorMsg)
    },
    [setIsChecked]
  )

  return (
    <InfoFormSetContainer>
      <FormTitleComponent title='商品數量' />
      <OptionsContainer>
        <QuantityInputStyle
          name='quantity'
          value={quantity}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        ></QuantityInputStyle>
      </OptionsContainer>
      {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
    </InfoFormSetContainer>
  )
}

export default function DetailInfoForm({
  productDetail,
  setProductDetail,
  isChecked,
  setIsChecked
}) {
  return (
    <InfoForm>
      <StatusComponent
        productDetail={productDetail}
        setProductDetail={setProductDetail}
        setIsChecked={setIsChecked}
      ></StatusComponent>
      <PriceComponent
        productDetail={productDetail}
        setProductDetail={setProductDetail}
        setIsChecked={setIsChecked}
      ></PriceComponent>
      <QuantityComponent
        productDetail={productDetail}
        setProductDetail={setProductDetail}
        setIsChecked={setIsChecked}
      ></QuantityComponent>
    </InfoForm>
  )
}
