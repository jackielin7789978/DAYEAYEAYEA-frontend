import {
  Form,
  Input,
  ErrorMsg,
  SendPassword
} from '../../components/loginSystem/loginCard'
import { ArrowBtn } from '../../components/Button'
import { useForm } from 'react-hook-form'
export default function SignInForm() {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()
  const onSubmit = (data) => console.log(data)
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
        type='password'
        placeholder='密碼'
        {...register('password', { required: true })}
      />
      <ErrorMsg>
        {errors.password?.type === 'required' && '請填寫密碼'}
      </ErrorMsg>
      <SendPassword to='/'>忘記密碼?</SendPassword>
      <ArrowBtn
        color='accent'
        children='登入'
        marginStyle={{ marginTop: '20px' }}
      />
    </Form>
  )
}
