import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { PageWidth } from '../../../components/general'
import { COLOR, FONT_SIZE, MEDIA_QUERY } from '../../../constants/style'
import getFAQs from '../../../webAPI/faq'
import { IsLoadingComponent } from '../../../components/IsLoading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'

const Title = styled.div`
  margin-top: 40px;
  font-size: ${FONT_SIZE.lg};
  font-weight: bold;
  ${MEDIA_QUERY.tablet} {
    margin-top: 60px;
    font-size: ${FONT_SIZE.xl};
  }
  ${MEDIA_QUERY.desktop} {
    margin-top: 80px;
    font-size: ${FONT_SIZE.xxl};
  }
`
const Container = styled.div`
  width: 90%;
  margin: 10px auto;
  margin-bottom: 40px;
  padding: 20px;
  ${MEDIA_QUERY.tablet} {
    width: 80%;
    margin: 10px auto;
    margin-bottom: 60px;
  }
  ${MEDIA_QUERY.desktop} {
    width: 60%;
    margin: 10px auto;
    margin-bottom: 80px;
  }
`
const Q = styled.div`
  padding: 22px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${({ $isOpen }) =>
    $isOpen ? 'none' : `2px solid ${COLOR.border_super_light}`};
  div {
    font-size: ${FONT_SIZE.sm};
    font-weight: bold;
    text-align: left;
    margin-right: 4px;
    ${MEDIA_QUERY.tablet} {
      font-size: ${FONT_SIZE.lg};
    }
    ${MEDIA_QUERY.desktop} {
      font-size: ${FONT_SIZE.lg};
    }
  }
`
const A = styled.div`
  padding: 18px;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  text-align: left;
  font-size: ${FONT_SIZE.sm};
  border-bottom: ${({ $isOpen }) =>
    $isOpen ? `2px solid ${COLOR.border_light_grey}` : `none`};
  div {
    width: 90%;
    text-align: left;
  }
  ${MEDIA_QUERY.tablet} {
    font-size: ${FONT_SIZE.md};
  }
  ${MEDIA_QUERY.desktop} {
    font-size: ${FONT_SIZE.md};
  }
`
const Toggle = styled(FontAwesomeIcon)`
  cursor: pointer;
  transition: all 0.2s;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'none')};
`

// 問題：要怎麼限制一次只能展開一個答案？
function Item({ faq }) {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <Q $isOpen={isOpen}>
        <div>{faq.question}</div>
        <Toggle icon={faChevronUp} onClick={toggleOpen} $isOpen={isOpen} />
      </Q>
      <A $isOpen={isOpen}>
        <div>{faq.answer}</div>
      </A>
    </>
  )
}
export default function FAQ() {
  const [faqs, setFaqs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    async function fetchFAQs() {
      let res
      try {
        res = await getFAQs()
        if (res.ok) {
          setFaqs(res.data)
          setIsLoading(false)
        }
      } catch (e) {
        console.log(e)
      }
    }
    fetchFAQs()
  }, [])

  return (
    <>
      {isLoading && <IsLoadingComponent />}
      {!isLoading && (
        <PageWidth>
          <Title>常見問題</Title>
          <Container>
            {faqs.map((faq) => (
              <Item key={faq.id} faq={faq} />
            ))}
          </Container>
        </PageWidth>
      )}
    </>
  )
}
