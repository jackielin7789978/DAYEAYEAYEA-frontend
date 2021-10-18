import styled from 'styled-components'
import { PageWidth, FullWidth } from '../../../components/general'
import { COLOR, FONT_SIZE, MEDIA_QUERY } from '../../../constants/style'

const Img = styled.div`
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  height: 200px;

  ${MEDIA_QUERY.tablet} {
    height: 360px;
  }
  ${MEDIA_QUERY.desktop} {
    height: 440px;
  }
`
const ContentDiv = styled.div`
  margin: 40px auto;
  width: 70%;
  text-align: left;
  white-space: pre-wrap;
  line-height: 2em;
`

const Title = styled.div`
  font-size: ${FONT_SIZE.xxl};
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${MEDIA_QUERY.tablet} {
    margin-top: 15px;
  }
  ${MEDIA_QUERY.desktop} {
    margin-top: 15px;
  }
`

const TitleBorder = styled.div`
  margin-top: 8px;
  width: 25%;
  border-bottom: 3px solid ${COLOR.primary_dark};
  ${MEDIA_QUERY.tablet} {
    width: 10%;
  }
  ${MEDIA_QUERY.desktop} {
    width: 5%;
  }
`

const AboutImg = styled(Img)`
  opacity: 0.8;
  background-image: url('https://images.unsplash.com/photo-1565581406026-a79f239d1b61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80');
`

export default function Brand() {
  const content =
    '在這個後疫情時代，人們一邊懷念過往隨性移動的自由，同時也開始為自己建構新的生活模式。停留的時間更長了，過去的恣意燦爛透過多種風格且豐富的用品轉換為另外一種型態的溫暖，DAYEAYEAYEA 在共同對生活質感的愛好下，誕生在 2021 年秋天。\n\n一個食材帶你領略旅遊清單上的夢想國度，又或一縷香氣成為你穿梭回憶的時光機；脫離居家與工作的兩點一線，和三五好友在山林或海際共度閒暇的時刻裡，精良品質與設計風格兼備的戶外用品讓期待已久的美好假期有了更多愉快記憶。\n\nDAYEAYEAYEA 身為結合生活多種風貌的選品購物網站，提供來自各地設計品牌的一時之選，邀請你一起為生活增添一抹色彩，讓日常乘載更多美好記憶。'

  return (
    <>
      <FullWidth>
        <AboutImg />
      </FullWidth>
      <PageWidth style={{ marginTop: '40px' }}>
        <Title>
          About DAYEAYEAYEA
          <TitleBorder />
        </Title>
        <ContentDiv>{content}</ContentDiv>
      </PageWidth>
    </>
  )
}
