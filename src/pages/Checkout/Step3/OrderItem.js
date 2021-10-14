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
      <ItemImg img={item.imgUrl} to={`/products/${item.id}`} />
      <ItemInfo>
        <ItemName children={item.name} to={`/products/${item.id}`} />
        <ItemContent>
          <ItemPriceHidden children={`NT$ ${item.price}`} />
          <ItemCountHidden children={item.count} />
          <ItemCountMobile children={`${item.count} x NT$ ${item.price}`} />
        </ItemContent>
      </ItemInfo>
    </Item>
  )
}
