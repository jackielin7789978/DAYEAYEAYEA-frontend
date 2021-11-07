import { useState, useCallback, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { COLOR, MEDIA_QUERY, FONT_SIZE } from '../../../constants/style'
import { GeneralBtn } from '../../../components/Button'
import { PageWidth } from '../../../components/general'
import { getOrderOne, cancelOrder } from '../../../webAPI/orderAPI'
import ItemTable from './ItemTable'
import { formatPrice } from '../../../utils'
import useModal from '../../../hooks/useModal'


const PageWidthHeight = styled(PageWidth)`
  min-height: 600px;
`
const Container = styled.div`
  margin: 60px auto 0;
  width: 80%;
  min-width: 350px;
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
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  top: 20px;
  right: 20px;
  button + button {
    margin-left: 16px;
    margin-top: 4px;
  }

  ${MEDIA_QUERY.desktop} {
    flex-direction: row;
  }
`

const Button = ({ children, color, onClick }) => {
  const style = {
    fontSize: '14px',
    width: '70px'
  }
  return <GeneralBtn color={color} buttonStyle={style} children={children} onClick={onClick}/>
}

const ModalButton = ({ children, color, onClick }) => {
  const style = {
    fontSize: '16px',
    width: '100px'
  }
  return <GeneralBtn color={color} buttonStyle={style} children={children} onClick={onClick}/>
}

const OrderDetail = () => {
  const [data, setData] = useState(null);
  const { handleModalOpen, handleModalClose, Modal } = useModal()
  const history = useHistory()
  const { ticket } = useParams()
  const refreshOrder = useCallback(() => {
    getOrderOne(ticket)
      .then((res) => {
        setData(() => res.data)
      })
  }, [ticket])

  const handleCancel = useCallback(() => {
    handleModalClose()
    cancelOrder(ticket)
      .then((res) => {
        refreshOrder()
      })
  }, [ticket, handleModalClose, refreshOrder])

  useEffect(() => {
    refreshOrder()
  }, [refreshOrder])

  return (
    <PageWidthHeight>
      <Modal 
        content={'確定取消訂單 ？ '}
        buttonOne={<ModalButton color={'accent'} onClick={handleCancel}>確定</ModalButton>}
        buttonTwo={<ModalButton color={'primary'} onClick={handleModalClose}>取消</ModalButton>}
      />
      <Container>
        <Title>訂單詳情</Title>
        <Wrapper>
          <Info>
            <ButtonGroup>
              <Button color={'accent'} onClick={() => history.push('/member/orders')} >返回</Button>
              {
                (data?.status === '處理中') && <Button color={'warning'} onClick={handleModalOpen} >取消訂單</Button>
              }
            </ButtonGroup>
            <Field>
              <h5>訂單狀態:　</h5>
              <p>{ data?.status }</p>
            </Field>
            <Field>
              <h5>訂單金額:　</h5>
              <p>{ data?.subTotal && formatPrice(data.subTotal) }</p>
            </Field>
            <Field>
              <h5>收件人電郵:</h5>
              <p>{ data?.orderEmail || '' }</p>
            </Field>
            <Field>
              <h5>收件人姓名:</h5>
              <p>{ data?.orderName || '' }</p>
            </Field>
            <Field>
              <h5>收件人地址:</h5>
              <p>{ data?.orderAddress || '' }</p>
            </Field>
            <Field>
              <h5>收件人電話:</h5>
              <p>{ data?.orderPhone || '' }</p>
            </Field>
          </Info>
          <ItemTable order={ data?.Order_items || [] } />
        </Wrapper>
      </Container>
    </PageWidthHeight>
  )
}

export default OrderDetail