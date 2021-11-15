import { useContext, useState, useEffect } from 'react'
import {
  Form,
  Input,
  ErrorMsg,
  SendPassword,
  PasswordInput
} from '../../components/loginSystem/loginCard'
import { LoginBtn } from '../../components/Button'
import { useForm } from 'react-hook-form'
import { UserContext } from '../../context'
export default function SignInForm({ setIsModal }) {
  const [errMessage, setErrMessage] = useState()
  const { signIn, error } = useContext(UserContext)
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()

  const onSubmit = (submitData) => {
    setErrMessage(null)
    const { username, password } = submitData
    signIn(username, password)
  }
  useEffect(() => {
    if (error) {
      return setErrMessage('帳號或密碼不正確')
    }
  }, [error])
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

      <SendPassword onClick={() => setIsModal(true)}>忘記密碼?</SendPassword>
      <LoginBtn
        color='accent'
        children='登入'
        buttonStyle={{ marginTop: '20px' }}
      />
      {errMessage && (
        <ErrorMsg style={{ textAlign: 'center' }}>{errMessage}</ErrorMsg>
      )}
    </Form>
  )
}
