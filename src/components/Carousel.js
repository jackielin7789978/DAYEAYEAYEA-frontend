import { useEffect } from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import useFetch from '../hooks/useFetch'
import { FullWidth } from './general'
import { COLOR, FONT_SIZE, MEDIA_QUERY } from '../constants/style'
import { Link } from 'react-router-dom'

const CarouselItem = styled(Link)`
  position: relative;
  background: url(${({ $img }) => $img}) center no-repeat;
  background-size: cover;
  height: 280px;
  ${MEDIA_QUERY.tablet} {
    height: 380px;
  }

  ${MEDIA_QUERY.desktop} {
    height: 420px;
  }
  h2 {
    width: 100%;
    margin: 0px;
    padding: 0px;
    color: ${COLOR.text_light};
    font-size: ${FONT_SIZE.xxl};
    font-weight: bold;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    ${MEDIA_QUERY.tablet} {
      font-size: ${FONT_SIZE.xxxl};
    }

    ${MEDIA_QUERY.desktop} {
      font-size: ${FONT_SIZE.xxxl};
    }
  }
`

export default function Carousel() {
  const { value, fetchData } = useFetch(`/articles`)

  useEffect(() => {
    fetchData()
  }, [fetchData])

  var settings = {
    dots: true,
    arrows: false,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  return (
    <FullWidth>
      <Slider {...settings} style={{ marginBottom: '40px' }}>
        {value?.data?.map((article) => (
          <CarouselItem
            to={`/articles/${article.id}/1`}
            key={article.id}
            $img={article.imgUrl}
          >
            <h2>{article.title}</h2>
          </CarouselItem>
        ))}
      </Slider>
    </FullWidth>
  )
}
