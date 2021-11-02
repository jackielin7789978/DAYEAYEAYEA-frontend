import styled from 'styled-components'
import OrderTable from '../OrderTable'


const Container = styled.div`
  width: 90%;
  margin: 24px auto;
  text-align: left;
`

const Orders = ({ orders }) => {

  return (
    <Container>
      <OrderTable pageBar={true} orders={orders} />
    </Container>
  )
}

export default Orders