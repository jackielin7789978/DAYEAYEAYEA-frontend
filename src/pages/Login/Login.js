import { useState, useContext } from 'react'
import { useHistory, useLocation } from 'react-router'
import {
  PageWidthHeight,
  FormWrapper,
  AbsoluteCenter
} from '../../components/loginSystem/loginCard'
import { Tabs } from '../../components/Tab'
import SignInForm from '../../components/loginSystem/SignInForm'
import SignUpForm from '../../components/loginSystem/SignUpForm'
import { addTokenToLocalStorage } from '../../utils'
import { getMe } from '../../webAPI/loginAPI'
import { LoadingContext, UserContext } from '../../context'
import { IsLoadingComponent } from '../../components/IsLoading'
import useAuth from '../../hooks/useAuth'
export default function Login() {
  const { isLoading } = useContext(LoadingContext)
  const [errMessage, setErrMessage] = useState()
  const { setUser } = useContext(UserContext)
  const history = useHistory()
  const location = useLocation()
  const { token, signIn, signUp, logout } = useAuth()
  const addToken = (token) => {
    addTokenToLocalStorage(token)
    if (location.pathname === '/checkout/step2') {
      return
    }
    history.push('/')
  }
  return (
    <PageWidthHeight>
      {isLoading && <IsLoadingComponent />}
      <AbsoluteCenter>
        <FormWrapper>
          <Tabs
            tabs={['註冊', '登入']}
            tabsPanel={[
              <SignUpForm
                addToken={addToken}
                errMessage={errMessage}
                setErrMessage={setErrMessage}
              />,
              <SignInForm
                addToken={addToken}
                errMessage={errMessage}
                setErrMessage={setErrMessage}
                signIn={signIn}
                token={token}
              />
            ]}
            presetTab={1}
          ></Tabs>
        </FormWrapper>
      </AbsoluteCenter>
    </PageWidthHeight>
  )
}
