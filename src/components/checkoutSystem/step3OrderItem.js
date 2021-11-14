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
import { formatPrice } from '../../utils'
export const OrderItem = ({ item }) => {
  return (
    <Item key={`product${item.productId}`}>
      <ItemImg
        img={
          item.Product.Product_imgs[item.Product.Product_imgs.length - 1]
            ?.imgUrlSm
        }
        to={`/products/${item.productId}`}
      />
      <ItemInfo>
        <ItemName
          children={item.Product.name}
          to={`/products/${item.productId}`}
        />
        <ItemContent>
          <ItemPriceHidden children={`${formatPrice(item.Product.price)}`} />
          <ItemCountHidden children={item.quantity} />
          <ItemCountMobile
            children={`${item.quantity} x ${formatPrice(item.Product.price)}`}
          />
        </ItemContent>
      </ItemInfo>
    </Item>
  )
}
