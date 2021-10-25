import styled from 'styled-components'
import { EditBtn } from '../../../components/Button'

const Container = styled.div`
  width: 90%;
  margin: 24px auto;
  text-align: left;
`

const InfoWrapper = styled.div`
  position: relative;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Field = styled.div`
  display: flex;

  h5 {
    margin-right: 36px;
  }

  &+& {
    margin-top: 20px;
  }
`

const Button = ({ children }) => {
  const style = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    width: '120px'
  }
  return <EditBtn color={'accent'} buttonStyle={style} children={children}/>
}


const ModifyInfo = ({ profile  }) => {
  return (
    <Container>
      <InfoWrapper>
        <Button>編輯</Button>
        <Field>
          <h5>帳號:</h5>
          <p>{ profile.username }</p>
        </Field>
        <Field>
          <h5>電郵:</h5>
          <p>{ profile.email }</p>
        </Field>
        <Field>
          <h5>姓名:</h5>
          <p>{ profile.fullname }</p>
        </Field>
        <Field>
          <h5>地址:</h5>
          <p>{ profile.address }</p>
        </Field>
        <Field>
          <h5>電話:</h5>
          <p>{ profile.phone }</p>
        </Field>
      </InfoWrapper>
    </Container>
  )
}

export default ModifyInfo