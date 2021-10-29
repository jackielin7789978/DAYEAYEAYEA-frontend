import { useState } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { LoginBtn } from '../../../components/Button'
import { COLOR, ADMIN_COLOR, FONT_SIZE } from '../../../constants/style'
import { adminLogin } from '../../../webAPI/adminAPIs'
import { addTokenToLocalStorage } from '../../../utils'

const Wrapper = styled.div`
  position: absolute;
  min-width: 400px;
  height: 50vh;
  min-height: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`
const Title = styled.h1`
  font-weight: bold;
  font-size: ${FONT_SIZE.xxxl};
  color: ${COLOR.text_black};
  margin: -20px 0 40px 0;
  letter-spacing: 2px;
`
const FormContainer = styled.form`
  width: 84%;
  height: 80%;
  margin: 0 auto;
  padding: 20px 0;
  background: ${ADMIN_COLOR.grey};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`
const FormTitle = styled.h3`
  font-size: ${FONT_SIZE.xl};
  font-weight: bold;
`
const Input = styled.input`
  display: block;
  width: 80%;
  height: 50px;
  padding: 8px;
  margin: 6px 0;
  border-radius: 3px;
  border: 1px solid ${COLOR.border_grey};
  &:focus {
    border: 1px solid ${COLOR.text_black};
  }
`
const Err = styled.p`
  width: 77%;
  text-align: left;
  margin: -14px;
  padding: 0;
  height: 12px;
  line-height: 4px;
  color: ${ADMIN_COLOR.warning};
  font-size: ${FONT_SIZE.sm};
`

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  let history = useHistory()

  const handleLogin = (e) => {
    e.preventDefault()
    if (!username || !password) return setErrMsg('缺少帳號或密碼')
    ;(async () => {
      const res = await adminLogin(username, password)
      if (!res.ok) return setErrMsg('帳號或密碼錯誤')
      alert('登入成功')
      addTokenToLocalStorage(res.token)
      history.push('/admin/members')
    })()
  }

  return (
    <Wrapper>
      <Title>DAYEAYEAYEA 生活選物</Title>
      <FormContainer onSubmit={handleLogin}>
        <FormTitle>登入管理後臺</FormTitle>
        <Input
          placeholder='帳號'
          onChange={(e) => {
            setErrMsg('')
            setUsername(e.target.value)
          }}
        ></Input>
        <Input
          type='password'
          placeholder='密碼'
          onChange={(e) => {
            setErrMsg('')
            setPassword(e.target.value)
          }}
        ></Input>
        <Err>{errMsg}</Err>
        <LoginBtn
          buttonStyle={{
            background: ADMIN_COLOR.Btn_darkgrey,
            width: '80%',
            height: '50px'
          }}
        >
          登入
        </LoginBtn>
      </FormContainer>
    </Wrapper>
  )
}
