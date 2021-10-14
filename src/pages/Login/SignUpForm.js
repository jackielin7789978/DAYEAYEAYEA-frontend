import { useState } from 'react'
import {
  Form,
  Input,
  ErrorMsg,
  PasswordInput,
  EyeIcon,
  VisibilityIcon,
  VisibilityOffIcon
} from '../../components/loginSystem/loginCard'
import { ArrowBtn } from '../../components/Button'
import { useForm } from 'react-hook-form'
import { signUp } from '../../webAPI/loginAPI'
export default function SignUpForm() {
  const [passwordShow, setPasswordShow] = useState(false)
  const togglePasswordvisibility = () => {
    setPasswordShow(passwordShow ? false : true)
  }
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()
  const onSubmit = (submitData) => {
    const { username, email, password } = submitData
    signUp(username, email, password)
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
          type={passwordShow ? 'text' : 'password'}
          placeholder='密碼'
          {...register('password', {
            required: true,
            pattern: /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/
          })}
        />
        <EyeIcon onClick={togglePasswordvisibility}>
          {passwordShow ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </EyeIcon>
      </PasswordInput>
      <ErrorMsg>
        {errors.password?.type === 'required' && '請填寫密碼'}
        {errors.password?.type === 'pattern' &&
          '密碼需為 8 碼以上且含數字及小寫英文'}
      </ErrorMsg>
      <ArrowBtn
        color='accent'
        children='註冊'
        marginStyle={{ marginTop: '20px' }}
      />
    </Form>
  )
}
