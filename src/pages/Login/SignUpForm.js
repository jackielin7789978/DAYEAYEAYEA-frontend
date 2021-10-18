import { useContext } from 'react'
import {
  Form,
  Input,
  ErrorMsg,
  PasswordInput
} from '../../components/loginSystem/loginCard'
import { ArrowBtn } from '../../components/Button'
import { useForm } from 'react-hook-form'
import { signIn, signUp } from '../../webAPI/loginAPI'
import { LoadingContext } from '../../context'
export default function SignUpForm({
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
    const { username, email, password } = submitData
    signUp(username, email, password).then((data) => {
      if (data.ok === 0) {
        setIsLoading(false)
        return $setErrMessage('該帳號或信箱已被註冊')
      }
      signIn(username, password).then((data) => {
        if (data.ok === 0) {
          return $setErrMessage(data.message)
        }
        $setErrMessage(null)
        tokenCheck(data.token)
      })
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
      <Input
        type='email'
        placeholder='電郵'
        {...register('email', { required: true })}
      />
      <ErrorMsg>{errors.email?.type === 'required' && '請填寫電郵'}</ErrorMsg>
      <PasswordInput>
        <Input
          type='password'
          placeholder='密碼，需 6 碼以上的英數混合'
          {...register('password', {
            required: true,
            pattern: /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,}$/
          })}
        />
      </PasswordInput>
      <ErrorMsg>
        {errors.password?.type === 'required' && '請填寫密碼'}
        {errors.password?.type === 'pattern' &&
          '密碼需為 6 碼以上且含數字及小寫英文'}
      </ErrorMsg>
      <ArrowBtn
        color='accent'
        children='註冊'
        marginStyle={{ marginTop: '20px' }}
      />
      {$errMessage && (
        <ErrorMsg style={{ textAlign: 'center' }}>{$errMessage}</ErrorMsg>
      )}
    </Form>
  )
}
