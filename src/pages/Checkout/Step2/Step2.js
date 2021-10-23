import { useContext, useState, useEffect, useMemo } from 'react'
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
  BtnFlexCenter
} from '../../../components/checkoutSystem/Step'
import { useForm } from 'react-hook-form'
import { GeneralBtn } from '../../../components/Button'
import { UserContext } from '../../../context'
import Login from '../../Login/Login'
import { COLOR } from '../../../constants/style'
import { LocalStorageContext } from '../../../context'
import { createOrder } from '../../../webAPI/orderAPI'
export default function Step2() {
  const { cartItems, setCartItems } = useContext(LocalStorageContext)
  const { user } = useContext(UserContext)
  const { errMsg, setErrMsg } = useState()
  const location = useHistory()
  useEffect(() => {
    if (!cartItems.length) location.push('/')
  }, [cartItems, location])
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm()
  const handleChecked = (e) => {
    if (e.target.checked) {
      setValue('orderEmail', user.email)
      setValue('orderAddress', user.address)
      setValue('orderName', user.fullname)
      setValue('orderPhone', user.phone)
    } else {
      setValue('orderEmail', '')
      setValue('orderAddress', '')
      setValue('orderName', '')
      setValue('orderPhone', '')
    }
  }
  const subTotal = useMemo(() => {
    if (!cartItems.length) return
    return cartItems
      .map((item) => item.price * item.quantity)
      .reduce((total, num) => total + num)
  }, [cartItems])
  console.log(subTotal)
  const onSubmit = async (submitData) => {
    const orderItem = cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity
    }))
    const result = await createOrder(
      submitData.orderAddress,
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
      setErrMsg(result.message)
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
                <InputTitle children='地址:' />
                <Input
                  type='text'
                  {...register('orderAddress', { required: true })}
                />
              </InputWrapper>
              <ErrorMsg>
                {errors.orderAddress?.type === 'required' && '請填寫地址'}
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
