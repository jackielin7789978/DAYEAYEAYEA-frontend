import styled from 'styled-components'
import { useMemo, useContext, useState } from 'react'
import useMediaQuery from '../../hooks/useMediaQuery'
import { Link } from 'react-router-dom'
import { COLOR, FONT_SIZE, MEDIA_QUERY } from '../../constants/style'
import { ShoppingCarBtn, ShoppingCarWhiteBtn, GeneralBtn } from '../Button'
import { ModalContext, LocalStorageContext } from '../../context'
import { formatPrice, getItemsFromLocalStorage } from '../../utils'
import { useEffect } from 'react'

const CardContainerDiv = styled.div`
  margin: 8px 4px;
  width: 44%;
  height: 275px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  ${(props) =>
    props.status === 'off' &&
    `
    opacity: 0.5;
  `}
  ${MEDIA_QUERY.tablet} {
    margin: 8px 4px;
    width: 44%;
    height: 420px;
  }
  ${MEDIA_QUERY.desktop} {
    margin: 15px 4px;
    width: 21%;
    height: 390px;
  }
`

const CardLink = styled(Link)`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 10px;
  ${MEDIA_QUERY.tablet} {
    height: 90%;
    margin-bottom: 10px;
  }
  ${MEDIA_QUERY.desktop} {
    height: 90%;
    margin-bottom: 10px;
  }
`

const ButtonContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
`

const ImgContainer = styled.div`
  width: 100%;
  height: 65%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  ${MEDIA_QUERY.tablet} {
    height: 70%;
  }
  ${MEDIA_QUERY.desktop} {
    height: 60%;
  }
`
const ProductInfoContainer = styled.div`
  width: 100%;
  height: 35%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${MEDIA_QUERY.tablet} {
    height: 30%;
  }
  ${MEDIA_QUERY.desktop} {
    height: 40%;
  }
`

const TitleContainer = styled.div`
  width: 100%;
  font-size: ${FONT_SIZE.sm};
  color: ${COLOR.text_primary_dark};
  margin: 3px 0px;
  text-align: left;

  ${MEDIA_QUERY.tablet} {
    font-size: ${FONT_SIZE.md};
    margin-top: 15px;
  }
  ${MEDIA_QUERY.desktop} {
    font-size: ${FONT_SIZE.md};
    margin-top: 15px;
  }
`

const PriceContainer = styled.div`
  width: 100%;
  text-align: left;
  flex-wrap: wrap;
  margin: 3px 0px;
  ${MEDIA_QUERY.tablet} {
    margin: 5px 0px 15px 0px;
  }
  ${MEDIA_QUERY.desktop} {
    margin: 12px 0px 20px 0px;
  }
`

const PriceStyle = styled.span`
  font-size: ${FONT_SIZE.sm};
  color: ${COLOR.accent};
  font-weight: bold;
  text-align: left;

  ${MEDIA_QUERY.tablet} {
    font-size: ${FONT_SIZE.md};
  }
  ${MEDIA_QUERY.desktop} {
    font-size: ${FONT_SIZE.md};
  }

  ${(props) =>
    props.discount &&
    `
    font-size: ${FONT_SIZE.xs} !important;
    text-decoration: line-through;
  `}
`
const SoldOut = styled.div`
  background: ${COLOR.grey};
  color: ${COLOR.text_light};
  font-size: ${FONT_SIZE.sm};
  text-align: center;
  width: 35%;
  height: 16%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;
  ${MEDIA_QUERY.tablet} {
    font-size: ${FONT_SIZE.md};
    height: 13%;
  }
  ${MEDIA_QUERY.desktop} {
    font-size: ${FONT_SIZE.md};
    height: 13%;
  }
`

const DiscountPriceStyle = styled(PriceStyle)`
  color: ${COLOR.warning};
  margin-left: 6px;
  font-size: ${FONT_SIZE.sm};
  ${MEDIA_QUERY.tablet} {
    font-size: ${FONT_SIZE.md};
  }
  ${MEDIA_QUERY.desktop} {
    font-size: ${FONT_SIZE.md};
  }
`

export function ProductCard({
  id,
  name,
  price,
  imgUrl,
  discountPrice,
  imgs,
  status,
  stockQuantity
}) {
  let hasDiscount = price !== discountPrice ? true : false
  const isDesktop = useMediaQuery('(min-width: 1200px)')
  // eslint-disable-next-line no-unused-vars
  const { setIsModalOpen, setIsProductSoldOut } = useContext(ModalContext)
  const { handleAddCartItem } = useContext(LocalStorageContext)
  const [inStock, setInStock] = useState(0)
  const quantity = 1
  const productInfo = useMemo(
    () => ({
      name,
      price,
      discountPrice,
      imgs,
      quantity
    }),
    [name, price, discountPrice, imgs]
  )

  useEffect(() => {
    const cartInLocal = JSON.parse(getItemsFromLocalStorage())
    const isProductInCart =
      (cartInLocal && cartInLocal.filter((item) => item.id === id)) || []
    if (isProductInCart.length === 0) {
      setInStock(stockQuantity)
    } else {
      const surplus = stockQuantity - isProductInCart[0].quantity
      surplus === 0 ? setInStock(0) : setInStock(surplus)
    }
  }, [id, stockQuantity])

  const handleAddProductInCart = () => {
    if (inStock > 0) {
      setInStock(inStock - 1)
      handleAddCartItem(id, productInfo)
      setIsProductSoldOut((isProductSoldOut) => true)
      return setIsModalOpen(true)
    }
    if (inStock === 0) {
      setIsProductSoldOut((isProductSoldOut) => false)
      return setIsModalOpen(true)
    }
  }

  return (
    <CardContainerDiv status={status}>
      <CardLink to={`/products/${id}`}>
        <ImgContainer
          style={{ backgroundImage: `url(${imgUrl})` }}
          status={status}
        >
          {status === 'off' && <SoldOut>售完</SoldOut>}
        </ImgContainer>
        <ProductInfoContainer>
          <TitleContainer>{name}</TitleContainer>
          <PriceContainer>
            <PriceStyle discount={hasDiscount}>{formatPrice(price)}</PriceStyle>
            {hasDiscount && (
              <DiscountPriceStyle>
                {formatPrice(discountPrice)}
              </DiscountPriceStyle>
            )}
          </PriceContainer>
        </ProductInfoContainer>
      </CardLink>
      {status === 'on' && (
        <ButtonContainer>
          {isDesktop ? (
            <ShoppingCarBtn color='primary' onClick={handleAddProductInCart} />
          ) : (
            <ShoppingCarWhiteBtn onClick={handleAddProductInCart} />
          )}
        </ButtonContainer>
      )}
      {status === 'off' && (
        <ButtonContainer>
          <GeneralBtn>售完</GeneralBtn>
        </ButtonContainer>
      )}
    </CardContainerDiv>
  )
}

export function WhiteCard() {
  return <CardContainerDiv></CardContainerDiv>
}
