import { useEffect, useState } from 'react'
import {
  Item,
  ItemImg,
  ItemName,
  ItemPrice,
  ItemContent,
  ItemDelete,
  ItemInfo,
  WarningMessage
} from './Step'
import { ItemCounter } from '../Counter'
import { getProductById } from '../../webAPI/productsAPI'
export const Cart = ({ item, handleRemoveCartItem, handleUpdateCount }) => {
  const [quantity, setQuantity] = useState(item.quantity)
  const [totalQuantity, setTotalQuantity] = useState()
  const [warningMessage, setWarningMessage] = useState('')
  const handleCount = (type) => {
    setWarningMessage('')
    if (type === 'increment') {
      return quantity >= totalQuantity
        ? setWarningMessage('已達商品數量上限')
        : setQuantity(quantity + 1)
    } else {
      setQuantity(quantity - 1)
    }
  }
  function handleChange(e) {
    setWarningMessage('')
    if (e.target.value > totalQuantity) {
      setWarningMessage('已達商品數量上限')
      return setQuantity(totalQuantity)
    }
    e.target.value === ''
      ? setQuantity(1)
      : setQuantity(parseInt(e.target.value))
  }

  useEffect(() => {
    getProductById(item.id).then((res) => setTotalQuantity(res.data.quantity))
    handleUpdateCount(quantity, item.id)
  }, [quantity, handleUpdateCount, item.id, totalQuantity])
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
            count={quantity}
          />
        </ItemContent>
        {warningMessage && <WarningMessage>{warningMessage}</WarningMessage>}
      </ItemInfo>
      <ItemDelete
        onClick={() => {
          handleRemoveCartItem(item.id)
        }}
      />
    </Item>
  )
}
