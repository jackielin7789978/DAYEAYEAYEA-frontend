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
import { UserContext, OversoldContext } from '../../../context'
import Login from '../../Login/Login'
import { COLOR } from '../../../constants/style'
import { LocalStorageContext } from '../../../context'
import { getTokenFromLocalStorage } from '../../../utils'
import useFetch from '../../../hooks/useFetch'
export default function Step2() {
  const { cartItems, setCartItems } = useContext(LocalStorageContext)
  const { user, setUser } = useContext(UserContext)
  const getMe = useFetch('/members/me')
  const createOrder = useFetch('/orders', { method: 'POST' })
  const { setIsOversold } = useContext(OversoldContext)
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
    setUserStreet(user?.address.replace(newCity, '').replace(newDistricts, ''))
  }, [user, newCity, newDistricts])

  useEffect(() => {
    if (!cartItems?.length) location.push('/')
  }, [cartItems, location])

  useEffect(() => {
    if (!getTokenFromLocalStorage()) return false
    getMe.fetchData({
      handler: (res) => {
        setUser(res.data)
      }
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
          if (newCity) {
            await handleCityChange(newCity)
            setValue('city', newCity)
          }
          if (newDistricts) {
            await handleDistrictChange(newDistricts)
            setTimeout(() => {
              setValue('district', newDistricts)
            }, 0)
          }
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
    const { orderEmail, orderName, orderPhone, payment, shipping } = submitData
    const orderAddress = `${zipCode}${submitData.city}${submitData.district}${submitData.street}`
    const orderItem = cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity
    }))
    createOrder.fetchData({
      bodyData: {
        orderAddress,
        orderEmail,
        orderName,
        orderPhone,
        payment,
        shipping,
        orderItem,
        subTotal,
        isDeleted: 0
      }
    })
  }
  useEffect(() => {
    if (createOrder.value.ok === 0) {
      setIsOversold(true)
      return location.push(`/checkout/step1`)
    }
    if (createOrder.value.ok === 1) {
      localStorage.removeItem('cartItemsList')
      location.push(`/checkout/step3/${createOrder.value.ticketNo}`)
      setCartItems([])
    }
  }, [createOrder.value, location, setCartItems, setIsOversold])
  return (
    <PageWidth>
      <Steps />
      {user ? (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <FormWrapper>
              <FormTitle>????????????</FormTitle>
              <InputWrapper>
                <InputTitle children='??????:' />
                <Input
                  type='text'
                  {...register('orderEmail', {
                    required: true,
                    pattern: /\S+@\S+\.\S+/
                  })}
                />
              </InputWrapper>
              <ErrorMsg>
                {errors.orderEmail?.type === 'required' && '???????????????'}
                {errors.orderEmail?.type === 'pattern' && '?????????????????????'}
              </ErrorMsg>
              <InputWrapper>
                <InputTitle children='??????:' />
                <Input
                  type='text'
                  {...register('orderName', { required: true })}
                />
              </InputWrapper>
              <ErrorMsg>
                {errors.orderName?.type === 'required' && '???????????????'}
              </ErrorMsg>
              <InputWrapper>
                <InputTitle children='??????:' />
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
                {errors.orderPhone?.type === 'required' && '???????????????'}
                {errors.orderPhone?.type === 'pattern' && '???????????????????????????'}
              </ErrorMsg>
              <InputWrapper>
                <InputTitle children='??????:' />
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
                {errors.street?.type === 'required' && '???????????????'}
              </ErrorMsg>

              <Label>
                <input type='checkbox' id='userData' onChange={handleChecked} />
                <label htmlFor='userData'>?????????????????????????????????</label>
              </Label>
            </FormWrapper>
            <FormWrapper>
              <FormTitle>????????????</FormTitle>
              <Label>
                <Input
                  type='radio'
                  id='cash'
                  name='pay'
                  value='????????????'
                  {...register('payment', { required: true })}
                />
                <RadionLabel children='????????????' />
              </Label>

              <Label>
                <Input
                  type='radio'
                  id='creditCard'
                  name='pay'
                  value='?????????'
                  {...register('payment', { required: true })}
                />
                <RadionLabel children='?????????' />
              </Label>
              <ErrorMsg>
                {errors.payment?.type === 'required' && '?????????????????????'}
              </ErrorMsg>
              <FormTitle>????????????</FormTitle>
              <Label>
                <Input
                  type='radio'
                  id='home'
                  name='delivery'
                  value='??????'
                  checked
                  {...register('shipping', { required: true })}
                />
                <RadionLabel children='??????' />
              </Label>
              {/* <Label>
                <Input type='radio' id='store' name='delivery' value='store' />
                <RadionLabel children='??????' />
              </Label> */}
            </FormWrapper>
          </div>
          {errMsg && <ErrorMsg>{errMsg}</ErrorMsg>}
          <BtnFlexCenter>
            <GeneralBtn
              color='primary'
              buttonStyle={{ marginTop: '20px' }}
              children='????????????'
            />
          </BtnFlexCenter>
        </Form>
      ) : (
        <>
          <MsgTitle>
            ??????<span style={{ color: COLOR.text_warning }}>??????</span>
            ???????????????
          </MsgTitle>
          <Login />
          <BtnFlexCenter>
            <GeneralBtn
              color='light_grey'
              buttonStyle={{ cursor: 'not-allowed' }}
              children='????????????'
            />
          </BtnFlexCenter>
        </>
      )}
    </PageWidth>
  )
}
