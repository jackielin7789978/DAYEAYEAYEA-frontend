import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import {
  ADMIN_COLOR,
  COLOR,
  FONT_SIZE,
  ADMIN_MEDIA_QUERY
} from '../../../constants/style'
import { Wrapper } from '../../../components/admin/TableStyle'
import { LogoutBtn } from '../../../components/Button'
import { AdminIsLoadingComponent } from '../../../components/admin/AdminIsLoading'
import { GeneralBtn } from '../../../components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { formatPrice } from '../../../utils'
import {
  getSingleOrder,
  updateOrderStatus,
  archiveOrder
} from '../../../webAPI/adminAPIs'
import useFetchData from '../../../hooks/useFetchData'
import useModal from '../../../hooks/useModal'
import Item from '../../../components/admin/orderManage/DetailItem'
import OrderInfo from '../../../components/admin/orderManage/OrderInfo'
import Buttons from '../../../components/admin/orderManage/Buttons'

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 60px auto;
  width: 70vw;
  ${ADMIN_MEDIA_QUERY.md} {
    max-width: 1480px;
  }
  ${ADMIN_MEDIA_QUERY.lg} {
    max-width: 1480px;
  }
`
const Container = styled(Wrapper)`
  width: 100%;
  min-height: 40px;
  background: ${ADMIN_COLOR.light_grey};
  border-radius: 20px;
  position: relative;
  margin: 40px auto;
  padding-bottom: 20px;
  &:first-child {
    margin-top: 10vh;
  }
`
const Title = styled.h3`
  text-align: center;
  padding: 20px;
  font-weight: bold;
`
const Subtotal = styled.div`
  text-align: center;
  span {
    margin: 0 8px;
  }
`
const Collapser = styled.div`
  margin-top: 10px;
`
const Icon = styled(FontAwesomeIcon)`
  cursor: pointer;
  transition: all 0.2s;
  ${({ $isOpen }) => $isOpen && 'transform: rotate(180deg)'};
`
const Menu = styled.div`
  height: ${({ $isOpen }) => ($isOpen ? 'unset' : 0)};
  div {
    transition: opacity 0.1s;
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  }
`
const TableHeaders = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px;
  margin: 0 20px;
  border-bottom: 1px solid ${COLOR.border_grey};
  span {
    text-align: center;
  }
  span:first-child {
    text-align: left;
    width: 70%;
  }
  span:last-child {
    text-align: right;
  }
`
const Header = styled.span`
  width: 10%;
`
const PriceDetail = styled.div`
  width: 100%;
  padding: 4px 30px;
  text-align: right;
  div {
    margin: 10px 0px;
  }
  div:first-child {
    font-size: ${FONT_SIZE.md};
  }
  div:last-child {
    font-size: ${FONT_SIZE.lg};
    font-weight: bold;
  }
`

const ModalButton = ({ children, color, onClick }) => {
  const style = {
    fontSize: '16px',
    width: '45%'
  }
  return (
    <GeneralBtn
      color={color}
      buttonStyle={style}
      children={children}
      onClick={onClick}
    />
  )
}
export default function AdminOrderDetail() {
  const [isOpen, setIsOpen] = useState(false)
  const [orderDetail, setOrderDetail] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { ticket } = useParams()
  const { isModal, setIsModal, handleModalClose, Modal } = useModal()
  const [modalContent, setModalContent] = useState('')

  useFetchData(getSingleOrder, setOrderDetail, setIsLoading, ticket)

  const handleArchive = (ticketNo) => {
    ;(async () => {
      const res = await archiveOrder(ticketNo)
      if (!res.ok) return alert('發生錯誤：' + res.message)
      setModalContent('已封存訂單')
      setIsModal(true)
      setOrderDetail({ ...orderDetail, isDeleted: 1 })
    })()
  }

  const handleOrderStatus = (action) => {
    // 按下取消後，會先跳 Modal 向使用者確認是否取消
    if (action === 'cancel' && !isModal) {
      setModalContent('確定要取消這筆訂單？')
      setIsModal(true)
      return
    }
    if (action === 'cancel') {
      setModalContent('確定要取消這筆訂單？')
    } else {
      setModalContent('變更成功！')
    }
    ;(async () => {
      const res = await updateOrderStatus(ticket, action)
      if (!res.ok) return alert('發生錯誤：' + res.message)
      setIsModal(true)
      setOrderDetail({ ...orderDetail, status: convertOrderStatus(action) })
    })()
  }

  return (
    <PageWrapper $isOpen={isOpen}>
      {isLoading && <AdminIsLoadingComponent />}
      <Link to='/admin/orders'>
        <LogoutBtn
          color='admin_blue'
          children='回訂單列表'
          buttonStyle={{ width: '120px' }}
        />
      </Link>
      <Container>
        {orderDetail && (
          <>
            <Title>訂購明細</Title>
            <Subtotal>
              <span>
                共 <b>{orderDetail.Order_items.length}</b> 件商品
              </span>
              <span>
                合計：
                <b>
                  {orderDetail.subTotal && formatPrice(orderDetail.subTotal)}
                </b>
              </span>
              <Collapser
                onClick={() => {
                  setIsOpen(!isOpen)
                }}
              >
                <Icon icon={faChevronDown} $isOpen={isOpen} />
              </Collapser>
            </Subtotal>
            <Menu $isOpen={isOpen}>
              <TableHeaders>
                <Header>商品名稱</Header>
                <Header>單件價格</Header>
                <Header>數量</Header>
                <Header>小計</Header>
              </TableHeaders>
              {orderDetail.Order_items.map((item) => (
                <Item key={item.productId} item={item} />
              ))}
              <PriceDetail>
                <div>
                  <span>運費：</span>
                  <span>{formatPrice(80)}</span>
                </div>
                <div>
                  <span>合計：</span>
                  <span>
                    {orderDetail.subTotal && formatPrice(orderDetail.subTotal)}
                  </span>
                </div>
              </PriceDetail>
            </Menu>
          </>
        )}
      </Container>
      <Container>
        {orderDetail && (
          <>
            <Title>訂單資料</Title>
            <OrderInfo orderDetail={orderDetail} />
            <Buttons
              orderDetail={orderDetail}
              handleOrderStatus={handleOrderStatus}
              handleArchive={handleArchive}
              isModal={isModal}
              setIsModal={setIsModal}
            />
          </>
        )}
      </Container>
      {modalContent === '確定要取消這筆訂單？' ? (
        <Modal
          open={isModal}
          content={modalContent}
          buttonOne={
            <ModalButton
              color={'admin_blue'}
              onClick={() => handleOrderStatus('cancel')}
            >
              確定
            </ModalButton>
          }
          buttonTwo={
            <ModalButton color={'admin_grey'} onClick={() => setIsModal(false)}>
              返回
            </ModalButton>
          }
          onClose={handleModalClose}
        />
      ) : (
        <Modal open={isModal} content={modalContent} />
      )}
    </PageWrapper>
  )
}

const convertOrderStatus = (status) => {
  let convertedStatus = ''
  switch (status) {
    case 'ship':
      convertedStatus = '已出貨'
      break
    case 'cancel':
      convertedStatus = '已取消'
      break
    case 'complete':
      convertedStatus = '已完成'
      break
    default:
      convertedStatus = '處理中'
  }
  return convertedStatus
}
