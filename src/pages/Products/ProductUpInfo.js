import styled from 'styled-components'
import { useState, useCallback, useMemo } from 'react'
import { COLOR, FONT_SIZE, MEDIA_QUERY } from '../../constants/style'
import { ShoppingCarBtn } from '../../components/Button'
import { ItemCounter } from '../../components/Counter'
import { AddItemsInLocalStorage } from '../../utils'

const ProductInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0px 30px;
  margin: 15px 0px;
  ${MEDIA_QUERY.tablet} {
    width: 50%;
    margin: 0px;
  }

  ${MEDIA_QUERY.desktop} {
    width: 50%;
    margin: 0px;
  }
`

const InfoStyle = styled.div`
  width: 100%;
  word-wrap: break-word;
  text-align: left;
`

const ProductName = styled(InfoStyle)`
  font-size: ${FONT_SIZE.lg};
  font-weight: bold;
  color: ${FONT_SIZE.text_dark};
  ${MEDIA_QUERY.tablet} {
    font-size: ${FONT_SIZE.xl};
  }

  ${MEDIA_QUERY.desktop} {
    font-size: ${FONT_SIZE.xxl};
    margin-bottom: 10px;
  }
`

const Shortdesc = styled(InfoStyle)`
  margin: 6px 0px;
  line-height: 1.5em;
  white-space: pre-wrap;
  font-size: ${FONT_SIZE.sm};
  color: ${FONT_SIZE.text_dark};
  ${MEDIA_QUERY.tablet} {
    font-size: ${FONT_SIZE.md};
  }

  ${MEDIA_QUERY.desktop} {
    font-size: ${FONT_SIZE.md};
  }
`

const PriceContainer = styled.div`
  width: 100%;
  margin: 6px 0px;
  text-align: left;
  flex-wrap: wrap;
  ${MEDIA_QUERY.tablet} {
    margin: 15px 0px;
  }

  ${MEDIA_QUERY.desktop} {
    margin: 15px 0px;
  }
`

const PriceStyle = styled.span`
  font-size: ${FONT_SIZE.md};
  color: ${COLOR.accent};
  font-weight: bold;
  text-align: left;

  ${MEDIA_QUERY.tablet} {
    font-size: ${FONT_SIZE.lg};
  }
  ${MEDIA_QUERY.desktop} {
    font-size: ${FONT_SIZE.lg};
  }

  ${(props) =>
    props.discount &&
    `
    font-size: ${FONT_SIZE.sm} !important;
    text-decoration: line-through;
  `}
`

const DiscountPriceStyle = styled(PriceStyle)`
  color: ${COLOR.warning};
  margin-left: 6px;
  font-size: ${FONT_SIZE.md};
  ${MEDIA_QUERY.tablet} {
    font-size: ${FONT_SIZE.lg};
  }
  ${MEDIA_QUERY.desktop} {
    font-size: ${FONT_SIZE.lg};
  }
`
export function ProductUpInfoComponent({
  id,
  name,
  shortDesc,
  price,
  discountPrice,
  imgs,
  hasDiscount
}) {
  const [quantity, setQuantity] = useState(1)
  const productInfo = useMemo(
    () => ({
      name,
      price,
      discountPrice,
      imgs,
      quantity
    }),
    [name, price, discountPrice, imgs, quantity]
  )

  const handleAddProductInCart = (e) => {
    const targetId = Number(e.target.id)
    AddItemsInLocalStorage(targetId, productInfo)
  }

  const handleCount = useCallback(
    (type) => {
      return type === 'increment'
        ? setQuantity(quantity + 1)
        : setQuantity(quantity - 1)
    },
    [quantity]
  )

  const handleChange = useCallback((e) => {
    setQuantity(parseInt(e.target.value))
  }, [])

  return (
    <ProductInfoContainer>
      <ProductName>{name}</ProductName>
      <Shortdesc>{shortDesc}</Shortdesc>
      <PriceContainer>
        <PriceStyle discount={hasDiscount}>售價: NT. {price}</PriceStyle>
        {hasDiscount && (
          <DiscountPriceStyle>售價: NT. {discountPrice}</DiscountPriceStyle>
        )}
      </PriceContainer>
      <ItemCounter
        marginStyle={{ marginTop: '20px' }}
        handleCount={handleCount}
        handleChange={handleChange}
        count={quantity}
      />
      <ShoppingCarBtn
        id={id}
        color='primary'
        marginStyle={{ marginTop: '20px' }}
        onClick={handleAddProductInCart}
      >
        加入購物車
      </ShoppingCarBtn>
    </ProductInfoContainer>
  )
}
