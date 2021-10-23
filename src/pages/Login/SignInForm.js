import { useContext } from 'react'
import {
  Form,
  Input,
  ErrorMsg,
  SendPassword,
  PasswordInput
} from '../../components/loginSystem/loginCard'
import { LoginBtn } from '../../components/Button'
import { useForm } from 'react-hook-form'
import { signIn } from '../../webAPI/loginAPI'
import { LoadingContext } from '../../context'
export default function SignInForm({
  tokenCheck,
  $errMessage,
  $setErrMessage
}) {
  const { setIsLoading } = useContext(LoadingContext)
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()
  const onSubmit = (submitData) => {
    setIsLoading(true)
    const { username, password } = submitData
    signIn(username, password).then((data) => {
      if (data.ok === 0) {
        setIsLoading(false)
        return $setErrMessage('帳號或密碼不正確')
      }
      $setErrMessage(null)
      tokenCheck(data.token)
    })
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type='text'
        placeholder='帳號名稱'
        {...register('username', { required: true })}
      />
      <ErrorMsg>
        {errors.username?.type === 'required' && '請填寫名稱'}
      </ErrorMsg>
      <PasswordInput>
        <Input
          type='password'
          placeholder='密碼'
          {...register('password', { required: true })}
        />
      </PasswordInput>
      <ErrorMsg>
        {errors.password?.type === 'required' && '請填寫密碼'}
      </ErrorMsg>

      <SendPassword to='/'>忘記密碼?</SendPassword>
      <LoginBtn
        color='accent'
        children='登入'
        marginStyle={{ marginTop: '20px' }}
      />
      {$errMessage && (
        <ErrorMsg style={{ textAlign: 'center' }}>{$errMessage}</ErrorMsg>
      )}
    </Form>
  )
}
