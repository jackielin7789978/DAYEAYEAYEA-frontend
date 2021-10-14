import { useEffect, useState } from 'react'
import {
  Item,
  ItemImg,
  ItemName,
  ItemPrice,
  ItemContent,
  ItemDelete,
  ItemInfo
} from '../../../components/checkoutSystem/Step'
import { ItemCounter } from '../../../components/Counter'
export const Cart = ({ item, handleRemoveCartItem, handleUpdateCount }) => {
  const [count, setCount] = useState(item.quantity)
  const handleCount = (type) => {
    return type === 'increment' ? setCount(count + 1) : setCount(count - 1)
  }
  function handleChange(e) {
    setCount(parseInt(e.target.value))
  }
  useEffect(() => {
    handleUpdateCount(count, item.id)
  }, [count, handleUpdateCount, item.id])
  return (
    <Item key={item.id}>
      <ItemImg img={item.img} to={`/products/${item.id}`} />
      <ItemInfo>
        <ItemName children={item.name} to={`/products/${item.id}`} />
        <ItemContent>
          <ItemPrice children={`NT$ ${item.price}`} />
          <ItemCounter
            marginStyle={{ marginRight: '25px' }}
            handleCount={handleCount}
            handleChange={handleChange}
            count={count}
          />
        </ItemContent>
      </ItemInfo>
      <ItemDelete
        onClick={() => {
          handleRemoveCartItem(item.id)
        }}
      />
    </Item>
  )
}
