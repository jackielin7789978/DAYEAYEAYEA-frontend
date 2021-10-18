import { useState, useContext } from 'react'
import { useHistory } from 'react-router'
import {
  PageWidthHeight,
  FormWrapper,
  AbsoluteCenter
} from '../../components/loginSystem/loginCard'
import { Tabs } from '../../components/Tab'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import { addTokenToLocalStorage } from '../../utils'
import { getMe } from '../../webAPI/loginAPI'
import { LoadingContext, UserContext } from '../../context'
import { IsLoadingComponent } from '../../components/IsLoading'
export default function Login({ $location = '/' }) {
  const { isLoading } = useContext(LoadingContext)
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
      location.push($location)
    })
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
