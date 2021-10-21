import { useEffect } from 'react'
import styled from 'styled-components'
import { ArrowBtn } from '../../../components/Button'
import { COLOR, ADMIN_COLOR, FONT_SIZE } from '../../../constants/style'

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
  border-radius: 3px;
  border: 1px solid ${COLOR.border_dark_grey};
  &:focus {
    border: 1px solid ${COLOR.text_black};
  }
`

export default function AdminLogin() {
  return (
    <Wrapper>
      <Title>DAYEAYEAYEA 生活選物</Title>
      <FormContainer>
        <FormTitle>登入管理後臺</FormTitle>
        <Input placeholder='電郵'></Input>
        <Input placeholder='密碼'></Input>
        <ArrowBtn
          buttonStyle={{
            background: ADMIN_COLOR.Btn_darkgrey,
            width: '80%',
            height: '50px'
          }}
        >
          登入
        </ArrowBtn>
      </FormContainer>
    </Wrapper>
  )
}
