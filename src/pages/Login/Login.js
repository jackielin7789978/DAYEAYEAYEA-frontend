import { useState } from 'react'
import {
  PageWidthHeight,
  Title,
  FormWrapper,
  AbsoluteCenter
} from '../../components/loginSystem/loginCard'
import { Tabs } from '../../components/Tab'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

export default function Login() {
  return (
    <PageWidthHeight>
      <AbsoluteCenter>
        <Title children={'會員專區'} />
        <FormWrapper>
          <Tabs
            tabs={['註冊', '登入']}
            tabsPanel={[<SignUpForm />, <SignInForm />]}
            preset={1}
          ></Tabs>
        </FormWrapper>
      </AbsoluteCenter>
    </PageWidthHeight>
  )
}
