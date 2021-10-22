import {
  Item,
  ItemImg,
  ItemName,
  ItemPriceHidden,
  ItemContent,
  ItemCountHidden,
  ItemCountMobile,
  ItemInfo
} from './Step'
export const OrderItem = ({ item }) => {
  return (
    <Item key={item.productId}>
      <ItemImg
        img={item.Product.Product_imgs[0].imgUrlSm}
        to={`/products/${item.productId}`}
      />
      <ItemInfo>
        <ItemName
          children={item.Product.name}
          to={`/products/${item.productId}`}
        />
        <ItemContent>
          <ItemPriceHidden children={`NT$ ${item.Product.price}`} />
          <ItemCountHidden children={item.quantity} />
          <ItemCountMobile
            children={`${item.quantity} x NT$ ${item.Product.price}`}
          />
        </ItemContent>
      </ItemInfo>
    </Item>
  )
}
