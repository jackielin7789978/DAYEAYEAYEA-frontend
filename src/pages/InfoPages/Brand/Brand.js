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
  width: 85%;
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
    '不確定從哪一刻開始，我們更想把時間用來和重視的人相處。\n不確定從哪一刻開始，我們更想把時間用來和重視的人相處。不確定從哪一刻開始，我們更想把時間用來和重視的人相處。不確定從哪一刻開始，我們更想把時間用來和重視的人相處。不確定從哪一刻開始，我們更想把時間用來和重視的人相處。不確定從哪一刻開始，我們更想把時間用來和重視的人相處。\n不確定從哪一刻開始，我們更想把時間用來和重視的人相處。不確定從哪一刻開始，我們更想把時間用來和重視的人相處。不確定從哪一刻開始，我們更想把時間用來和重視的人相處。不確定從哪一刻開始，我們更想把時間用來和重視的人相處。不確定從哪一刻開始，我們更想把時間用來和重視的人相處。'

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
