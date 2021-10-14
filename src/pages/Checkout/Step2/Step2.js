import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { PageWidth } from '../../../components/general'
import {
  FormTitle,
  Steps,
  FormWrapper,
  Form,
  InputWrapper,
  Label,
  RadioControl,
  RadionLabel,
  InputTitle,
  Input,
  ErrorMsg,
  BtnFlexCenter,
  LinkStyle
} from '../../../components/checkoutSystem/Step'
import { getCartItems } from '../../../utils'
import { GeneralBtn } from '../../../components/Button'

export default function Step2() {
  return (
    <PageWidth>
      <Steps />

      <FormWrapper>
        <Form>
          <FormTitle>寄送資訊</FormTitle>
          <InputWrapper>
            <InputTitle children='電郵:' />
            <Input />
          </InputWrapper>
          <InputWrapper>
            <InputTitle children='姓名:' />
            <Input />
          </InputWrapper>
          <InputWrapper>
            <InputTitle children='地址:' />
            <Input />
          </InputWrapper>
          <InputWrapper>
            <InputTitle children='電話:' />
            <Input />
          </InputWrapper>
        </Form>
        <Form>
          <FormTitle>付款方式</FormTitle>
          <Label>
            <Input type='radio' id='cash' name='pay' value='cash' />
            <RadionLabel children='貨到付款' />
          </Label>

          <Label>
            <Input type='radio' id='creditCard' name='pay' value='creditCard' />
            <RadionLabel children='信用卡' />
          </Label>

          <FormTitle>運送方式</FormTitle>
          <Label>
            <Input type='radio' id='home' name='delivery' value='home' />
            <RadionLabel children='宅配' />
          </Label>

          <Label>
            <Input type='radio' id='store' name='delivery' value='store' />
            <RadionLabel children='超商' />
          </Label>
        </Form>
      </FormWrapper>
      <BtnFlexCenter>
        <Link to='/checkout/step3'>
          <GeneralBtn color='primary' children='送出訂單' />
        </Link>
      </BtnFlexCenter>
    </PageWidth>
  )
}
