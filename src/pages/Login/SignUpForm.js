import { Form, Input, ErrorMsg } from '../../components/loginSystem/style'
import { ArrowBtn } from '../../components/Button'
import { useForm } from 'react-hook-form'
export default function SignUpForm() {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()
  const onSubmit = (data) => console.log(data)
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder='帳號名稱'
        {...register('username', { required: true })}
      />
      <ErrorMsg>
        {errors.username?.type === 'required' && '請填寫名稱'}
      </ErrorMsg>
      <Input placeholder='電郵' {...register('email', { required: true })} />
      <ErrorMsg>{errors.email?.type === 'required' && '請填寫電郵'}</ErrorMsg>
      <Input placeholder='密碼' {...register('password', { required: true })} />
      <ErrorMsg>
        {errors.password?.type === 'required' && '請填寫密碼'}
      </ErrorMsg>
      <ArrowBtn
        color='accent'
        children='註冊'
        marginStyle={{ marginTop: '20px' }}
      />
    </Form>
  )
}
