import { useState, useContext } from 'react'
import { useHistory } from 'react-router'
import {
  PageWidthHeight,
  Title,
  FormWrapper,
  AbsoluteCenter
} from '../../components/loginSystem/loginCard'
import { Tabs } from '../../components/Tab'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import { addTokenToLocalStorage } from '../../utils'
import { getMe } from '../../webAPI/loginAPI'
import { UserContext } from '../../context'
export default function Login() {
  const location = useHistory()
  const [errMessage, setErrMessage] = useState()
  const { setUser } = useContext(UserContext)
  const tokenCheck = (token) => {
    addTokenToLocalStorage(token)
    getMe().then((res) => {
      if (res.ok === 0) {
        setErrMessage(res.message)
      }
      setUser(res.data)
      location.push('/')
    })
  }
  return (
    <PageWidthHeight>
      <AbsoluteCenter>
        <Title children={'會員專區'} />
        <FormWrapper>
          <Tabs
            tabs={['註冊', '登入']}
            tabsPanel={[
              <SignUpForm
                tokenCheck={tokenCheck}
                $errMessage={errMessage}
                $setErrMessage={setErrMessage}
              />,
              <SignInForm
                tokenCheck={tokenCheck}
                $errMessage={errMessage}
                $setErrMessage={setErrMessage}
              />
            ]}
            presetTab={1}
          ></Tabs>
        </FormWrapper>
      </AbsoluteCenter>
    </PageWidthHeight>
  )
}
