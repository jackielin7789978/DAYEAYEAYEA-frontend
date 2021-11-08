import { useEffect, useState, useContext } from 'react'
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
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { formatPrice } from '../../utils'
import { ModalContext, OversoldContext } from '../../context'
export const Cart = ({
  item,
  handleRemoveCartItem,
  handleUpdateCount,
  $setNotAllowed
}) => {
  const [quantity, setQuantity] = useState(item.quantity)
  const [totalQuantity, setTotalQuantity] = useState()
  const [itemStatus, setItemStatus] = useState()
  const [warningMessage, setWarningMessage] = useState('')
  const { setIsModalOpen } = useContext(ModalContext)
  const { isOversold } = useContext(OversoldContext)

  useEffect(() => {
    ;(async () => {
      const result = await getProductById(item.id)
      if (!result) return
      setItemStatus(result.data.status)
      setTotalQuantity(result.data.quantity)
    })()
    handleUpdateCount(quantity, item.id)
  }, [quantity, handleUpdateCount, item.id])

  useEffect(() => {
    if (isOversold) {
      if (itemStatus === 'off') {
        setIsModalOpen(true)
        setWarningMessage(`已下架，請移除商品`)
      }
      if (quantity > totalQuantity) {
        setIsModalOpen(true)
        setWarningMessage(`庫存不足，剩餘庫存 ${totalQuantity} 個`)
      }
    }
  }, [
    $setNotAllowed,
    itemStatus,
    setIsModalOpen,
    quantity,
    totalQuantity,
    isOversold
  ])

  const handleCount = (type) => {
    if (isOversold && itemStatus === 'off') {
      return
    }
    setWarningMessage('')
    if (quantity === '') return setQuantity(1)
    if (type === 'increment') {
      if (quantity >= totalQuantity) {
        setQuantity(totalQuantity)
        return setWarningMessage('已達商品數量上限')
      }
      setQuantity(quantity + 1)
    } else {
      if (quantity <= 1) return setQuantity(1)
      if (quantity > totalQuantity) {
        setQuantity(totalQuantity)
        return setWarningMessage('已達商品數量上限')
      }
      setQuantity(quantity - 1)
    }
  }

  function handleChange(e) {
    if (isOversold && itemStatus === 'off') {
      return
    }
    setWarningMessage('')
    if (e.target.value > totalQuantity) {
      setWarningMessage('已達商品數量上限')
      return setQuantity(totalQuantity)
    }
    if (e.target.value === '' || e.target.value === '0') {
      setWarningMessage('請填寫數量')
      return e.target.value === ''
        ? setQuantity('')
        : setQuantity(Number(e.target.value))
    }
    setQuantity(Number(e.target.value))
  }

  useEffect(() => {
    if (item.quantity === '') {
      $setNotAllowed(true)
      setWarningMessage('請填寫數量')
    }
  }, [$setNotAllowed, item.quantity])

  useEffect(() => {
    warningMessage === '請填寫數量'
      ? $setNotAllowed(true)
      : $setNotAllowed(false)
  }, [$setNotAllowed, quantity, warningMessage])

  return (
    <Item key={item.id}>
      <ItemImg img={item.img} to={`/products/${item.id}`} />
      <ItemInfo>
        <ItemName children={item.name} to={`/products/${item.id}`} />
        <ItemContent>
          <ItemPrice children={formatPrice(item.discountPrice)} />
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
        icon={faTrashAlt}
        onClick={() => {
          handleRemoveCartItem(item.id)
        }}
      />
    </Item>
  )
}
