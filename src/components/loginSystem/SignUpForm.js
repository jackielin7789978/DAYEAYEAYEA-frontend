import { useContext, useState } from 'react'
import {
  Form,
  Input,
  ErrorMsg,
  PasswordInput
} from '../../components/loginSystem/loginCard'
import { ArrowBtn } from '../../components/Button'
import { useForm } from 'react-hook-form'
import { UserContext } from '../../context'
import { useEffect } from 'react/cjs/react.development'
export default function SignUpForm() {
  const [errMessage, setErrMessage] = useState()
  const { error, signUp } = useContext(UserContext)
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()
  const onSubmit = (submitData) => {
    setErrMessage(null)
    const { username, email, password } = submitData
    signUp(username, email, password)
  }
  useEffect(() => {
    if (error) {
      setErrMessage('該帳號或信箱已被註冊')
      console.log(error)
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
            pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/
          })}
        />
      </PasswordInput>
      <ErrorMsg>
        {errors.password?.type === 'required' && '請填寫密碼'}
        {errors.password?.type === 'pattern' &&
          '密碼需為 6 碼以上且含數字及英文'}
      </ErrorMsg>
      <ArrowBtn
        color='accent'
        children='註冊'
        buttonStyle={{ marginTop: '20px' }}
      />
      {errMessage && (
        <ErrorMsg style={{ textAlign: 'center' }}>{errMessage}</ErrorMsg>
      )}
    </Form>
  )
}
