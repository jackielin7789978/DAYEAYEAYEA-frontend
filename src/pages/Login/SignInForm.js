import { useState } from 'react'
import {
  Form,
  Input,
  ErrorMsg,
  SendPassword,
  PasswordInput,
  EyeIcon,
  VisibilityIcon,
  VisibilityOffIcon
} from '../../components/loginSystem/loginCard'
import { ArrowBtn } from '../../components/Button'
import { useForm } from 'react-hook-form'
import { signIn } from '../../webAPI/loginAPI'
export default function SignInForm({
  tokenCheck,
  $errMessage,
  $setErrMessage
}) {
  // const [passwordShow, setPasswordShow] = useState(false)
  // const togglePasswordvisibility = () => {
  //   setPasswordShow(passwordShow ? false : true)
  // }
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()
  const onSubmit = (submitData) => {
    const { username, password } = submitData
    signIn(username, password).then((data) => {
      if (data.ok === 0) {
        return $setErrMessage(data.message)
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
        {/* <EyeIcon onClick={togglePasswordvisibility}>
          {passwordShow ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </EyeIcon> */}
      </PasswordInput>
      <ErrorMsg>
        {errors.password?.type === 'required' && '請填寫密碼'}
      </ErrorMsg>
      <SendPassword to='/'>忘記密碼?</SendPassword>
      <ArrowBtn
        color='accent'
        children='登入'
        marginStyle={{ marginTop: '20px' }}
      />
      {$errMessage && <ErrorMsg>{$errMessage}</ErrorMsg>}
    </Form>
  )
}
