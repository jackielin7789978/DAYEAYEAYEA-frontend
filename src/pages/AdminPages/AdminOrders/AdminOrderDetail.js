import { useEffect, useState } from 'react'
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
import useModal from '../../../hooks/useModal'
import useFetch from '../../../hooks/useFetch'
import { Item, OrderInfo, Buttons } from '../../../components/admin/orderManage'

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
  const { ticket } = useParams()
  const checkModal = useModal('??????????????????????????????')
  const modal = useModal('')

  // ???????????????
  const {
    isLoading,
    value: order,
    fetchData
  } = useFetch(`/admin/orders/${ticket}`)

  useEffect(() => {
    fetchData()
  }, [fetchData])

  //????????????
  const { fetchData: archiveOrder } = useFetch(`/admin/orders/${ticket}`, {
    method: 'DELETE'
  })

  const handleArchive = () => {
    archiveOrder({
      handler: () => {
        modal.handleModalOpen('??????????????????')
        order.data.isDeleted = 1
      }
    })
  }

  //??????????????????
  const { fetchData: updateOrderStatus } = useFetch(
    `/admin/orders/${ticket}/`,
    {
      method: 'PATCH'
    }
  )

  const handleOrderStatus = (action) => {
    if (action === 'check cancel') {
      checkModal.handleModalOpen('??????????????????????????????')
      return
    }
    checkModal.setIsModal(false)
    modal.handleModalOpen('???????????????')
    updateOrderStatus({
      suffixPath: action,
      handler: () => {
        order.data.status = convertOrderStatus(action)
      }
    })
  }

  return (
    <PageWrapper $isOpen={isOpen}>
      <Link to='/admin/orders'>
        <LogoutBtn
          color='admin_blue'
          children='???????????????'
          buttonStyle={{ width: '120px' }}
        />
      </Link>
      {isLoading ? (
        <AdminIsLoadingComponent />
      ) : (
        <>
          <Container>
            <Title>????????????</Title>
            <Subtotal>
              <span>
                ??? <b>{order?.data?.Order_items.length}</b> ?????????
              </span>
              <span>
                ?????????
                <b>
                  {order?.data?.subTotal && formatPrice(order?.data?.subTotal)}
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
                <Header>????????????</Header>
                <Header>????????????</Header>
                <Header>??????</Header>
                <Header>??????</Header>
              </TableHeaders>
              {order?.data?.Order_items.map((item) => (
                <Item key={item.productId} item={item} />
              ))}
              <PriceDetail>
                <div>
                  <span>?????????</span>
                  <span>{formatPrice(80)}</span>
                </div>
                <div>
                  <span>?????????</span>
                  <span>
                    {order?.data?.subTotal &&
                      formatPrice(order?.data?.subTotal)}
                  </span>
                </div>
              </PriceDetail>
            </Menu>
          </Container>
          <Container>
            <Title>????????????</Title>
            <OrderInfo orderDetail={order?.data} />
            <Buttons
              orderDetail={order?.data}
              handleOrderStatus={handleOrderStatus}
              handleArchive={handleArchive}
            />
          </Container>
        </>
      )}
      <modal.Modal open={modal.isModal} />
      <checkModal.Modal
        open={checkModal.isModalOpen}
        buttonOne={
          <ModalButton
            color={'admin_blue'}
            onClick={() => handleOrderStatus('cancel')}
          >
            ??????
          </ModalButton>
        }
        buttonTwo={
          <ModalButton
            color={'admin_grey'}
            onClick={() => checkModal.setIsModal(false)}
          >
            ??????
          </ModalButton>
        }
      />
    </PageWrapper>
  )
}

const convertOrderStatus = (status) => {
  let convertedStatus = ''
  switch (status) {
    case 'ship':
      convertedStatus = '?????????'
      break
    case 'cancel':
      convertedStatus = '?????????'
      break
    case 'complete':
      convertedStatus = '?????????'
      break
    default:
      convertedStatus = '?????????'
  }
  return convertedStatus
}
