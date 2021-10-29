import styled from 'styled-components'
import { useState, useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css'
import { COLOR, FONT_SIZE, MEDIA_QUERY } from '../../constants/style'
import { FullWidth } from '../general'
import { Link } from 'react-router-dom'
import { getAllArticles } from '../../webAPI/articlesAPI'

const ImgLink = styled(Link)`
  display: inline-block;
  width: 100%;
  height: 280px;
  ${MEDIA_QUERY.tablet} {
    height: 380px;
  }

  ${MEDIA_QUERY.desktop} {
    height: 420px;
  }
`

const ArticlesImgContainer = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  font-size: ${FONT_SIZE.xxl};
  font-weight: bold;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  ${MEDIA_QUERY.tablet} {
    font-size: ${FONT_SIZE.xxxl};
  }

  ${MEDIA_QUERY.desktop} {
    font-size: ${FONT_SIZE.xxxl};
  }
`

function ArticleImg({ title, imgUrl, color, to }) {
  return (
    <ImgLink to={to}>
      <ArticlesImgContainer
        style={{ backgroundImage: `url(${imgUrl})`, color: color }}
      >
        {title}
      </ArticlesImgContainer>
    </ImgLink>
  )
}

export function HomeArticlesImg() {
  const [articles, setArticles] = useState([])
  useEffect(() => {
    getAllArticles().then((result) => {
      if (!result || result.ok === 0) return
      if (result.ok === 1) setArticles(result.data)
    })
  }, [])

  return (
    <FullWidth>
      <Carousel style={{ zIndex: '0' }}>
        {articles.map((article) => {
          const { id, title, imgUrl } = article
          const linkDirection = `/articles/${id}/1`
          return (
            <Carousel.Item key={id}>
              <ArticleImg
                title={title}
                imgUrl={imgUrl}
                color={COLOR.text_light}
                to={linkDirection}
              />
            </Carousel.Item>
          )
        })}
      </Carousel>
    </FullWidth>
  )
}
