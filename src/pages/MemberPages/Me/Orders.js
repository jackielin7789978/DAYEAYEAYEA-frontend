import styled from 'styled-components'
import OrderTable from '../../../components/memberSystem/OrderTable'
import { COLOR } from '../../../constants/style'

const Container = styled.div`
  width: 90%;
  margin: 24px auto;
  text-align: left;
`

const PageList = styled.ul`
  display: flex;
  justify-content: center;
  margin: 16px auto 4px;
`

const Li = styled.li`
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  user-select: none;
  
  & + & {
    margin-left: 8px;
  }
`

const PageLi = styled(Li)`
  border: 1px solid #111;
  cursor: pointer;
  transition: background .3s;

  &:hover, &.active {
    color: ${COLOR.light};
    background: ${COLOR.primary_light_hover};
    border: ${COLOR.border_light_grey};
  }
`

const testArray = [1, 2, 3, 4, 5, 6]

const renderPageBar = (array) => {
  if (array.length <= 5) {
    return array.map(i => <PageLi>{i}</PageLi>)
  }
  return (
    <>
      <PageLi>1</PageLi>
      <PageLi>2</PageLi>
      <PageLi>3</PageLi>
      <Li>...</Li>
      <PageLi>{ array.length }</PageLi>
    </>
  )
}


const Orders = () => {

  return (
    <Container>
      <OrderTable orders={testArray} />
      <PageList>
        { renderPageBar(testArray) }
      </PageList>
    </Container>
  )
}

export default Orders