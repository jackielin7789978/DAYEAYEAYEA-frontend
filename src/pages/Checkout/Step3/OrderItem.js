import {
  Item,
  ItemImg,
  ItemName,
  ItemPriceHidden,
  ItemContent,
  ItemCountHidden,
  ItemCountMobile,
  ItemInfo
} from '../../../components/checkoutSystem/Step'
export const OrderItem = ({ item }) => {
  return (
    <Item key={item.id}>
      <ItemImg img={item.img} to={`/products/${item.id}`} />
      <ItemInfo>
        <ItemName children={item.name} to={`/products/${item.id}`} />
        <ItemContent>
          <ItemPriceHidden children={`NT$ ${item.price}`} />
          <ItemCountHidden children={item.quantity} />
          <ItemCountMobile children={`${item.quantity} x NT$ ${item.price}`} />
        </ItemContent>
      </ItemInfo>
    </Item>
  )
}
