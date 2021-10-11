import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PageWidth } from '../../../components/general'
import { ItemCounter } from '../../../components/Counter'
import {
  Title,
  Steps,
  TitleWidth,
  TitleGroup,
  CarTitles,
  CarTitle,
  Item,
  ItemImg,
  ItemName,
  ItemPrice,
  ItemContent,
  ItemDelete,
  ItemInfo,
  TotalPrice,
  BtnFlex,
  LinkStyle
} from '../../../components/checkoutSystem/Step'
import { setCartItems, getCartItems } from '../../../utils'
import { GeneralBtn } from '../../../components/Button'

export default function Step1() {
  const [itemList, setItemList] = useState(() => {
    if (getCartItems()) {
      let itemData = getCartItems()
      return JSON.parse(itemData)
    }
    return []
  })
  const [totalPrice, setTotalPrice] = useState(0)
  const handleAddProduct = () => {
    let random = Math.floor(Math.random() * 10) + 1
    fetch(`https://api.coolizz.tw/products/${random}`)
      .then((res) => res.json())
      .then((res) =>
        setItemList([
          ...itemList,
          {
            id: res.data.id,
            name: res.data.name,
            price: res.data.price,
            imgUrl: res.data.Product_imgs[0].imgUrlSm,
            count: 1
          }
        ])
      )
  }
  useEffect(() => {
    setCartItems(JSON.stringify(itemList))
    setTotalPrice(
      itemList.reduce((total, item) => {
        return total + item.price * item.count
      }, 0)
    )
  }, [itemList])

  const handleItemDelete = (id) => {
    setItemList(itemList.filter((item) => item.id !== id))
  }

  const handleUpdateCount = (value, id) => {
    if (value < 1) {
      return setItemList(itemList.filter((item) => item.id !== id))
    }
    setItemList(
      itemList.map((item) => {
        if (item.id !== id) return item
        return {
          ...item,
          count: value
        }
      })
    )
  }

  return (
    <PageWidth>
      <div onClick={handleAddProduct}>
        <GeneralBtn color='primary' children='加入購物車' />
      </div>
      <Steps />
      <Title>{`購物車( ${itemList.length} 件)`}</Title>
      <CarTitles>
        <TitleWidth />
        <TitleGroup>
          <CarTitle>購買項目</CarTitle>
          <CarTitle>金額</CarTitle>
          <CarTitle>數量</CarTitle>
        </TitleGroup>
      </CarTitles>

      {itemList.map((item) => (
        <Item key={item.id}>
          <ItemImg img={item.imgUrl} to={`/products/${item.id}`} />
          <ItemInfo>
            <ItemName children={item.name} to={`/products/${item.id}`} />
            <ItemContent>
              <ItemPrice children={`NT$ ${item.price}`} />
              <ItemCounter
                marginStyle={{ marginRight: '25px' }}
                value={parseInt(item.count)}
                handleUpdateCount={handleUpdateCount}
                id={item.id}
              />
            </ItemContent>
          </ItemInfo>
          <ItemDelete
            onClick={() => {
              handleItemDelete(item.id)
            }}
          />
        </Item>
      ))}
      <TotalPrice>{`總金額 NT$ ${totalPrice}`}</TotalPrice>
      <BtnFlex>
        <Link style={LinkStyle} to='/'>
          <GeneralBtn color='accent' children='繼續購物' />
        </Link>
        <Link style={LinkStyle} to='/checkout/step2'>
          <GeneralBtn color='primary' children='前往結帳' />
        </Link>
      </BtnFlex>
    </PageWidth>
  )
}
