import { useEffect, useContext } from 'react'
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
import useModal from '../../hooks/useModal'
export default function Login() {
  const { setIsModal, Modal } = useModal('忘記了也沒辦法')
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
      <Modal />
      {isLoading && <IsLoadingComponent />}
      <AbsoluteCenter>
        <FormWrapper>
          <Tabs
            tabs={['註冊', '登入']}
            tabsPanel={[<SignUpForm />, <SignInForm setIsModal={setIsModal} />]}
            presetTab={1}
          ></Tabs>
        </FormWrapper>
      </AbsoluteCenter>
    </PageWidthHeight>
  )
}
