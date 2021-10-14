import styled from 'styled-components'
import { useState, useCallback, useMemo, useContext } from 'react'
import { COLOR, FONT_SIZE, MEDIA_QUERY } from '../../constants/style'
import { ShoppingCarBtn } from '../../components/Button'
import { ItemCounter } from '../../components/Counter'
import { AddItemsInLocalStorage } from '../../utils'
import { ModalContext } from '../../context'

const ProductInfoContainer = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0px 30px;
  margin: 10px 0px;
  ${MEDIA_QUERY.tablet} {
    width: 45%;
    margin: 0px;
    height: 100%;
  }

  ${MEDIA_QUERY.desktop} {
    width: 50%;
    margin: 0px;
    height: 100%;
  }
`

const InfoStyle = styled.div`
  width: 100%;
  word-wrap: break-word;
  text-align: center;
  ${MEDIA_QUERY.tablet} {
    text-align: left;
  }

  ${MEDIA_QUERY.desktop} {
    text-align: left;
  }
`

const ProductName = styled(InfoStyle)`
  font-size: ${FONT_SIZE.lg};
  font-weight: bold;
  color: ${FONT_SIZE.text_dark};
  ${MEDIA_QUERY.tablet} {
    font-size: ${FONT_SIZE.xl};
    margin-bottom: 10px;
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
  flex-wrap: wrap;
  text-align: center;
  ${MEDIA_QUERY.tablet} {
    text-align: left;
  }

  ${MEDIA_QUERY.desktop} {
    text-align: left;
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

const WarningMessage = styled.p`
  font-size: ${FONT_SIZE.sm};
  color: ${COLOR.warning};
  margin-top: 8px;
  font-weight: bold;
`

export function ProductUpInfoComponent({
  id,
  name,
  shortDesc,
  price,
  discountPrice,
  imgs,
  hasDiscount,
  totalQuantity
}) {
  const [quantity, setQuantity] = useState(1)
  const [warningMessage, setWarningMessage] = useState('')
  // eslint-disable-next-line no-unused-vars
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext)
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
    setIsModalOpen(true)
  }

  const handleCount = useCallback(
    (type) => {
      if (type === 'increment') {
        return quantity === totalQuantity
          ? setWarningMessage((warningMessage) => '已達商品數量上限')
          : setQuantity(quantity + 1)
      } else {
        if (quantity <= 1) return setQuantity((quantity) => 1)
        setQuantity(quantity - 1)
        if (quantity <= totalQuantity) setWarningMessage((warningMessage) => '')
      }
    },
    [quantity, totalQuantity]
  )

  const handleChange = useCallback(
    (e) => {
      const changeQuantity = e.target.value ? parseInt(e.target.value) : ''
      if (changeQuantity >= totalQuantity) {
        setQuantity((quantity) => totalQuantity)
        return setWarningMessage((warningMessage) => '已達商品數量上限')
      }
      changeQuantity && changeQuantity < 1
        ? setQuantity((quantity) => 1)
        : setQuantity((quantity) => changeQuantity)
    },
    [totalQuantity]
  )

  const handleOnBlur = useCallback(
    (e) => {
      const changeQuantity = e.target.value ? parseInt(e.target.value) : ''
      if (changeQuantity === totalQuantity) {
        return setWarningMessage((warningMessage) => '已達商品數量上限')
      }
      if (!changeQuantity || changeQuantity < 1) setQuantity((quantity) => 1)
      setWarningMessage((warningMessage) => '')
    },
    [totalQuantity]
  )

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
        handleOnBlur={handleOnBlur}
        count={quantity}
      />
      {warningMessage && <WarningMessage>{warningMessage}</WarningMessage>}
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
