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
    <Item key={item.productId}>
      {/* 有些商品的 Product_imgs 陣列沒有 3 個(例如耳環)，一律抓第 3 個會出錯，故新增判斷 */}
      <ItemImg
        img={
          item.Product.Product_imgs[2]?.imgUrlSm
            ? item.Product.Product_imgs[2].imgUrlSm
            : item.Product.Product_imgs[0].imgUrlSm
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
