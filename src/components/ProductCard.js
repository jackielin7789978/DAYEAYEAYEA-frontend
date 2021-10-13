import styled from 'styled-components'
import { useMemo } from 'react'
import useMediaQuery from '../hooks/useMediaQuery'
import { Link } from 'react-router-dom'
import { COLOR, FONT_SIZE, MEDIA_QUERY } from '../constants/style'
import { ShoppingCarBtn, ShoppingCarWhiteBtn } from '../components/Button'
import { AddItemsInLocalStorage } from '../utils'

const CardContainerDiv = styled.div`
  margin: 4px;
  padding: 10px 0px;
  width: 44%;
  height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${MEDIA_QUERY.tablet} {
    margin: 8px 4px;
    width: 44%;
    height: 480px;
  }
  ${MEDIA_QUERY.desktop} {
    margin: 15px 4px;
    width: 21%;
    height: 400px;
  }
`

const CardLink = styled(Link)`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${MEDIA_QUERY.tablet} {
    height: 80%;
    margin-bottom: 10px;
  }
  ${MEDIA_QUERY.desktop} {
    height: 90%;
  }
`

const ImgContainer = styled.div`
  width: 100%;
  padding-bottom:68%; 
  height：0；
  object-fit: fill;
  background-repeat: no-repeat;
  background-position: center center;
  ${MEDIA_QUERY.tablet} {
    padding-bottom:70%; 
  }
  ${MEDIA_QUERY.desktop} {
    padding-bottom:90%; 
  }
`

const TitleContainer = styled.div`
  width: 100%;
  height: 20%;
  font-size: ${FONT_SIZE.sm};
  color: ${COLOR.text_primary_dark};
  margin: 5px 0px;
  text-align: left;

  ${MEDIA_QUERY.tablet} {
    font-size: ${FONT_SIZE.md};
    height: 12%;
    margin-top: 15px;
  }
  ${MEDIA_QUERY.desktop} {
    font-size: ${FONT_SIZE.md};
    margin-top: 20px;
  }
`

const PriceContainer = styled.div`
  width: 100%;
  margin: 6px 0px;
  text-align: left;
  flex-wrap: wrap;

  ${MEDIA_QUERY.tablet} {
    margin: 5px 0px;
  }
  ${MEDIA_QUERY.desktop} {
    margin: 10px 0px;
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

export function ProductCard({ id, name, price, imgUrl, discountPrice, imgs }) {
  let hasDiscount = price !== discountPrice ? true : false
  const isDesktop = useMediaQuery('(min-width: 1200px)')
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
  const handleAddProductInCart = () => {
    AddItemsInLocalStorage(id, productInfo)
  }
  return (
    <CardContainerDiv>
      <CardLink to={`/products/${id}`}>
        <ImgContainer style={{ backgroundImage: `url(${imgUrl})` }} />
        <TitleContainer>{name}</TitleContainer>
        <PriceContainer>
          <PriceStyle discount={hasDiscount}>NT. {price}</PriceStyle>
          {hasDiscount && (
            <DiscountPriceStyle>NT. {discountPrice}</DiscountPriceStyle>
          )}
        </PriceContainer>
      </CardLink>
      {isDesktop ? (
        <ShoppingCarBtn color='primary' onClick={handleAddProductInCart} />
      ) : (
        <ShoppingCarWhiteBtn onClick={handleAddProductInCart} />
      )}
    </CardContainerDiv>
  )
}
