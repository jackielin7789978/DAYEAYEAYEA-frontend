import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { ADMIN_COLOR, FONT_SIZE } from '../../../constants/style'

const Wrapper = styled.div`
  padding: 10px 40px;
  div {
    margin: 8px 0px;
  }
`

const Archived = styled.span`
  margin-left: 4px;
  color: ${ADMIN_COLOR.Btn_grey};
  span {
    opacity: 0;
    transition: opacity 0.2s;
    padding: 4px;
    border-bottom: 1px dotted black;
    font-size: ${FONT_SIZE.xs};
    position: relative;
    bottom: 8px;
    left: 8px;
  }
  &:hover {
    span {
      opacity: 1;
    }
  }
`

export default function OrderInfo({ orderDetail }) {
  return (
    <Wrapper>
      <div>
        訂單狀態：{orderDetail.status}
        {orderDetail.isDeleted ? (
          <Archived>
            <FontAwesomeIcon icon={faQuestionCircle} />
            <span>此筆訂單已封存</span>
          </Archived>
        ) : (
          <></>
        )}
      </div>
      <div>訂單編號：{orderDetail.ticketNo}</div>
      <div>訂購人姓名：{orderDetail.orderName}</div>
      <div>寄送地址：{orderDetail.orderAddress}</div>
      <div>聯絡信箱：{orderDetail.orderEmail}</div>
      <div>聯絡電話：{orderDetail.orderPhone}</div>
      <div>付款方式：{orderDetail.payment}</div>
      <div>運送方式：{orderDetail.shipping}</div>
    </Wrapper>
  )
}
