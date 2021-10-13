import styled from 'styled-components'
import { COLOR, FONT_SIZE, MEDIA_QUERY } from '../../constants/style'

const ProductBottomContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 15px auto;
  ${MEDIA_QUERY.tablet} {
    width: 100%;
    margin: 20px auto;
  }
  ${MEDIA_QUERY.desktop} {
    width: 80%;
    margin: 20px auto;
  }
`

const Title = styled.div`
  font-size: ${FONT_SIZE.lg};
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${MEDIA_QUERY.tablet} {
    font-size: ${FONT_SIZE.xl};
  }
  ${MEDIA_QUERY.desktop} {
    font-size: ${FONT_SIZE.xl};
  }
`

const TitleBorder = styled.div`
  margin-top: 8px;
  width: 8%;
  border-bottom: 3px solid ${COLOR.primary_dark};
  ${MEDIA_QUERY.tablet} {
    width: 10%;
  }
  ${MEDIA_QUERY.desktop} {
    width: 5%;
  }
`

const LongDescContent = styled.div`
  margin: 20px auto;
  width: 85%;
  text-align: center;
  white-space: pre-wrap;
  line-height: 1.5em;
  ${MEDIA_QUERY.tablet} {
    line-height: 2em;
    text-align: left;
  }
  ${MEDIA_QUERY.desktop} {
    line-height: 2em;
    text-align: left;
  }
`
export function ProductBottomInfoComponent({ longDesc }) {
  return (
    <ProductBottomContainer>
      <Title>
        商品敘述
        <TitleBorder />
      </Title>
      <LongDescContent>{longDesc}</LongDescContent>
    </ProductBottomContainer>
  )
}
