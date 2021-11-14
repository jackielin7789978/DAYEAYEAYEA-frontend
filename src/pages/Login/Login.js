import { useContext } from 'react'
import { useHistory, useLocation } from 'react-router'
import {
  PageWidthHeight,
  FormWrapper,
  AbsoluteCenter
} from '../../components/loginSystem/loginCard'
import { Tabs } from '../../components/Tab'
import SignInForm from '../../components/loginSystem/SignInForm'
import SignUpForm from '../../components/loginSystem/SignUpForm'
import { UserContext } from '../../context'
import { IsLoadingComponent } from '../../components/IsLoading'
import { useEffect } from 'react/cjs/react.development'
export default function Login() {
  const { user, isLoading } = useContext(UserContext)
  const history = useHistory()
  const location = useLocation()
  useEffect(() => {
    if (user) {
      if (location.pathname === '/checkout/step2') {
        return
      }
      history.push('/')
    }
  }, [history, location.pathname, user])
  return (
    <PageWidthHeight>
      {isLoading && <IsLoadingComponent />}
      <AbsoluteCenter>
        <FormWrapper>
          <Tabs
            tabs={['註冊', '登入']}
            tabsPanel={[<SignUpForm />, <SignInForm />]}
            presetTab={1}
          ></Tabs>
        </FormWrapper>
      </AbsoluteCenter>
    </PageWidthHeight>
  )
}
