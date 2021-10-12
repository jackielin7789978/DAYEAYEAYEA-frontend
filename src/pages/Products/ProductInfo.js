import styled from 'styled-components'
import { COLOR, FONT_SIZE, MEDIA_QUERY } from '../../constants/style'
import { ShoppingCarBtn } from '../../components/Button'
import useMediaQuery from '../../hooks/useMediaQuery'

const ProductInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0px 30px;
  ${MEDIA_QUERY.tablet} {
    width: 50%;
  }

  ${MEDIA_QUERY.desktop} {
    width: 50%;
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
  }
`

const Shortdesc = styled(InfoStyle)`
  margin: 6px 0px;
  line-height: 1.5em;
  white-space: pre-wrap;
  font-size: ${FONT_SIZE.sm};
  color: ${FONT_SIZE.text_dark};
`
const Longdesc = styled(InfoStyle)`
  margin: 6px 0px;
  line-height: 1.5em;
  white-space: pre-wrap;
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
export function ProductInfoComponent({
  name,
  shortDesc,
  longDesc,
  price,
  discountPrice,
  hasDiscount
}) {
  const isMobile = useMediaQuery('(max-width: 767px)')
  return (
    <ProductInfoContainer>
      <ProductName>{name}</ProductName>
      {isMobile && <Shortdesc>{shortDesc}</Shortdesc>}
      {!isMobile && <Longdesc>{longDesc}</Longdesc>}
      <PriceContainer>
        <PriceStyle discount={hasDiscount}>售價: NT. {price}</PriceStyle>
        {hasDiscount && (
          <DiscountPriceStyle>售價: NT. {discountPrice}</DiscountPriceStyle>
        )}
      </PriceContainer>
      <ShoppingCarBtn color='primary'>加入購物車</ShoppingCarBtn>
    </ProductInfoContainer>
  )
}
