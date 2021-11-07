import { useContext, useState, useEffect, useMemo, useCallback } from 'react'
import { useHistory } from 'react-router'
import { PageWidth } from '../../../components/general'
import { ErrorMsg } from '../../../components/loginSystem/loginCard'
import {
  MsgTitle,
  FormTitle,
  Steps,
  FormWrapper,
  Form,
  InputWrapper,
  Label,
  RadionLabel,
  InputTitle,
  Input,
  BtnFlexCenter,
  Select
} from '../../../components/checkoutSystem/Step'
import { useForm } from 'react-hook-form'
import { useTwZipCode, cities, districts } from 'use-tw-zipcode'
import { GeneralBtn } from '../../../components/Button'
import { UserContext } from '../../../context'
import Login from '../../Login/Login'
import { COLOR } from '../../../constants/style'
import { LocalStorageContext } from '../../../context'
import { createOrder } from '../../../webAPI/orderAPI'
import { getMe } from '../../../webAPI/memberAPI'
import { getTokenFromLocalStorage } from '../../../utils'
export default function Step2() {
  const { cartItems, setCartItems } = useContext(LocalStorageContext)
  const { user, setUser } = useContext(UserContext)
  const { errMsg } = useState()
  const location = useHistory()
  const [userStreet, setUserStreet] = useState()

  const { city, zipCode, handleCityChange, handleDistrictChange } =
    useTwZipCode()

  const newCity = useMemo(() => {
    if (!user?.address) return ''
    return cities.filter((item) => user?.address.includes(item))[0]
  }, [user])

  const newDistricts = useMemo(() => {
    if (!newCity) return ''
    return districts[newCity].filter((district) =>
      user.address.includes(district)
    )[0]
  }, [user, newCity])

  useEffect(() => {
    if (!user?.address) return ''
    setUserStreet(user?.address.replace(newCity + newDistricts, ''))
  }, [user, newCity, newDistricts])

  useEffect(() => {
    if (!cartItems?.length) location.push('/')
  }, [cartItems, location])

  useEffect(() => {
    if (!getTokenFromLocalStorage()) return false
    getMe().then((res) => {
      setUser(res.data)
      console.log(user)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm()

  const handleChecked = useCallback(
    async (e) => {
      if (e.target.checked) {
        if (user?.address) {
          await handleCityChange(newCity)
          await handleDistrictChange(newDistricts)
          setTimeout(() => {
            setValue('district', newDistricts)
          }, 0)
          setValue('city', newCity)
          setValue('street', userStreet)
        }
        setValue('orderEmail', user.email)
        setValue('orderName', user.fullname)
        setValue('orderPhone', user.phone)
      } else {
        setValue('orderEmail', '')
        setValue('street', '')
        setValue('orderName', '')
        setValue('orderPhone', '')
      }
    },
    [
      handleCityChange,
      handleDistrictChange,
      newCity,
      newDistricts,
      user,
      userStreet,
      setValue
    ]
  )
  const subTotal = useMemo(() => {
    if (!cartItems?.length) return
    return (
      cartItems
        .map((item) => item.discountPrice * item.quantity)
        .reduce((total, num) => total + num) + 80
    )
  }, [cartItems])
  const onSubmit = async (submitData) => {
    const address = `${zipCode}${submitData.city}${submitData.district}${submitData.street}`
    const orderItem = cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity
    }))
    const result = await createOrder(
      address,
      submitData.orderEmail,
      submitData.orderName,
      submitData.orderPhone,
      submitData.payment,
      submitData.shipping,
      orderItem,
      subTotal,
      0 //isDelete
    )
    if (result.ok === 0) {
      console.log(result.message)
    }
    localStorage.removeItem('cartItemsList')
    location.push(`/checkout/step3/${result.ticketNo}`)
    setCartItems([])
  }
  return (
    <PageWidth>
      <Steps />
      {user ? (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <FormWrapper>
              <FormTitle>寄送資訊</FormTitle>
              <InputWrapper>
                <InputTitle children='電郵:' />
                <Input
                  type='text'
                  {...register('orderEmail', {
                    required: true,
                    pattern: /\S+@\S+\.\S+/
                  })}
                />
              </InputWrapper>
              <ErrorMsg>
                {errors.orderEmail?.type === 'required' && '請填寫電郵'}
                {errors.orderEmail?.type === 'pattern' && '電郵請填寫完整'}
              </ErrorMsg>
              <InputWrapper>
                <InputTitle children='姓名:' />
                <Input
                  type='text'
                  {...register('orderName', { required: true })}
                />
              </InputWrapper>
              <ErrorMsg>
                {errors.orderName?.type === 'required' && '請填寫姓名'}
              </ErrorMsg>
              <InputWrapper>
                <InputTitle children='電話:' />
                <Input
                  type='tel'
                  {...register('orderPhone', {
                    required: true,
                    pattern:
                      /(\d{2,3}-?|\(\d{2,3}\))\d{3,4}-?\d{4}|09\d{2}(\d{6}|-\d{3}-\d{3})/
                  })}
                />
              </InputWrapper>
              <ErrorMsg>
                {errors.orderPhone?.type === 'required' && '請填寫電話'}
                {errors.orderPhone?.type === 'pattern' && '請符合電話號碼規格'}
              </ErrorMsg>
              <InputWrapper>
                <InputTitle children='地址:' />
                <Select
                  {...register('city')}
                  onChange={(e) => handleCityChange(e.target.value)}
                >
                  {cities.map((city, i) => {
                    return <option key={i}>{city}</option>
                  })}
                </Select>
                <Select
                  {...register('district')}
                  onChange={(e) => handleDistrictChange(e.target.value)}
                >
                  {districts[city].map((district, i) => {
                    return <option key={i}>{district}</option>
                  })}
                </Select>
              </InputWrapper>
              <InputWrapper>
                <Input
                  style={{ marginLeft: '55px' }}
                  type='text'
                  {...register('street', { required: true })}
                />
              </InputWrapper>
              <ErrorMsg>
                {errors.street?.type === 'required' && '請填寫地址'}
              </ErrorMsg>

              <Label>
                <input type='checkbox' id='userData' onChange={handleChecked} />
                <label htmlFor='userData'>寄件資訊與顧客資訊相同</label>
              </Label>
            </FormWrapper>
            <FormWrapper>
              <FormTitle>付款方式</FormTitle>
              <Label>
                <Input
                  type='radio'
                  id='cash'
                  name='pay'
                  value='貨到付款'
                  {...register('payment', { required: true })}
                />
                <RadionLabel children='貨到付款' />
              </Label>

              <Label>
                <Input
                  type='radio'
                  id='creditCard'
                  name='pay'
                  value='信用卡'
                  {...register('payment', { required: true })}
                />
                <RadionLabel children='信用卡' />
              </Label>
              <ErrorMsg>
                {errors.payment?.type === 'required' && '請選擇付款方式'}
              </ErrorMsg>
              <FormTitle>運送方式</FormTitle>
              <Label>
                <Input
                  type='radio'
                  id='home'
                  name='delivery'
                  value='宅配'
                  checked
                  {...register('shipping', { required: true })}
                />
                <RadionLabel children='宅配' />
              </Label>
              {/* <Label>
                <Input type='radio' id='store' name='delivery' value='store' />
                <RadionLabel children='超商' />
              </Label> */}
            </FormWrapper>
          </div>
          {errMsg && <ErrorMsg>{errMsg}</ErrorMsg>}
          <BtnFlexCenter>
            <GeneralBtn
              color='primary'
              buttonStyle={{ marginTop: '20px' }}
              children='送出訂單'
            />
          </BtnFlexCenter>
        </Form>
      ) : (
        <>
          <MsgTitle>
            請先<span style={{ color: COLOR.text_warning }}>登入</span>
            再繼續購買
          </MsgTitle>
          <Login />
          <BtnFlexCenter>
            <GeneralBtn
              color='light_grey'
              buttonStyle={{ cursor: 'not-allowed' }}
              children='送出訂單'
            />
          </BtnFlexCenter>
        </>
      )}
    </PageWidth>
  )
}
