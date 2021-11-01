import { useState, useCallback, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { COLOR, MEDIA_QUERY, FONT_SIZE } from '../../../constants/style'
import { GeneralBtn } from '../../../components/Button'
import { PageWidth } from '../../../components/general'
import { IsLoadingComponent as Loading } from '../../../components/IsLoading'
import ItemTable from '../../../components/memberSystem/ItemTable'
import { getOrderOne, cancelOrder } from '../../../webAPI/orderAPI'


const PageWidthHeight = styled(PageWidth)`
  min-height: 600px;
`
const Container = styled.div`
  margin: 60px auto 0;
  width: 80%;
  min-width: 450px;
`
const Title = styled.div`
  font-size: ${FONT_SIZE.lg};
  margin-top: 30px;
  font-weight: bold;
`

const Wrapper = styled.div`
  margin: 30px auto;
  min-height: 400px;
  border: 1px solid ${COLOR.border_light_grey};
  ${MEDIA_QUERY.tablet} {
    transform: translateY(5%);
  }
`
const Info = styled.div`
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

const ButtonGroup = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  button + button {
    margin-left: 16px;
  }
`

const Button = ({ children, onClick }) => {
  const style = {
    fontSize: '14px',
    width: '70px'
  }
  return <GeneralBtn color={'accent'} buttonStyle={style} children={children} onClick={onClick}/>
}

const OrderDetail = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()
  const { ticket } = useParams()
  const handleCancel = useCallback(() => {
    setIsLoading(() => true)
    cancelOrder(ticket)
      .then((res) => {
        setIsLoading(() => false)
        history.go(0)
      })
  }, [ticket, history])

  useEffect(() => {
    setIsLoading(() => true)
    getOrderOne(ticket)
      .then((res) => {
        setIsLoading(() => false)
        setData(() => res.data)
      })
  }, [ticket])

  return (
    <PageWidthHeight>
      { isLoading && <Loading/> }
      <Container>
        <Title>訂單詳情</Title>
        <Wrapper>
          <Info>
            <ButtonGroup>
              <Button onClick={() => history.goBack(-1)} >返回</Button>
              <Button onClick={handleCancel} >取消訂單</Button>
            </ButtonGroup>
            <Field>
              <h5>訂單狀態:</h5>
              <p>{ data?.status }</p>
            </Field>
            <Field>
              <h5>收件人電郵:</h5>
              <p>{ data?.orderEmail || '尚未輸入' }</p>
            </Field>
            <Field>
              <h5>收件人姓名:</h5>
              <p>{ data?.orderName || '尚未輸入' }</p>
            </Field>
            <Field>
              <h5>收件人地址:</h5>
              <p>{ data?.orderAddress || '尚未輸入' }</p>
            </Field>
            <Field>
              <h5>收件人電話:</h5>
              <p>{ data?.orderPhone || '尚未輸入' }</p>
            </Field>
          </Info>
          <ItemTable order={ data?.Order_items || [] } />
        </Wrapper>
      </Container>
    </PageWidthHeight>
  )
}

export default OrderDetail