import { useContext } from 'react'
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
export default function Step2() {
  const { user } = useContext(UserContext) // memberId
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()
  const onSubmit = (submitData) => {
    console.log(submitData)
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
                  type='email'
                  {...register('orderEmail', { required: true })}
                />
              </InputWrapper>
              <ErrorMsg>
                {errors.orderEmail?.type === 'required' && '請填寫電郵'}
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
                    pattern: /^[0-9]{10}$/
                  })}
                />
              </InputWrapper>
              <ErrorMsg>
                {errors.orderPhone?.type === 'required' && '請填寫電話'}
                {errors.password?.type === 'pattern' && '請符合電話號碼規格'}
              </ErrorMsg>
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
          <BtnFlexCenter>
            <GeneralBtn
              color='primary'
              marginStyle={{ marginTop: '20px' }}
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
          <Login $location={'/checkout/step2'} />
          <BtnFlexCenter>
            <GeneralBtn
              color='light_grey'
              marginStyle={{ cursor: 'not-allowed' }}
              children='送出訂單'
            />
          </BtnFlexCenter>
        </>
      )}
    </PageWidth>
  )
}
