import styled from 'styled-components'
import { COLOR, MEDIA_QUERY } from '../../constants/style'
import { useState, useEffect } from 'react'
import { useCallback } from 'react'

const ProductImgContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px 0px;

  ${MEDIA_QUERY.tablet} {
    width: 50%;
    margin: 0px;
  }

  ${MEDIA_QUERY.desktop} {
    width: 50%;
    margin: 0px;
  }
`
const ThumbnailContainer = styled.aside`
  width: 90%;
  display: flex;
  justify-content: flex-start;

  ${MEDIA_QUERY.tablet} {
    width: 80%;
  }

  ${MEDIA_QUERY.desktop} {
    width: 80%;
  }
`

const ThumbnailImgDiv = styled.div`
  width: 30%;
  padding-bottom:25%; 
  height：0；
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`

const LargeImgDiv = styled.div`
  width: 90%;
  padding-bottom: 75%;
  height：0；
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  margin-bottom: 30px;
  margin-right: 0px;
  ${MEDIA_QUERY.tablet} {
    width: 80%;
    padding-bottom: 55%;
  }

  ${MEDIA_QUERY.desktop} {
    width: 80%;
    padding-bottom: 55%;
  }
`

export function ProductImgsComponent({ imgs }) {
  const [showLargeImg, setShowLargeImg] = useState([])
  const [showThumbnailImage, setShowThumbnailImage] = useState([])

  useEffect(() => {
    setShowLargeImg(imgs[0])
    setShowThumbnailImage(imgs)
  }, [imgs])

  const handleThumbnailClick = useCallback(
    (e) => {
      const id = Number(e.target.id)
      const newLargeImg = imgs.filter((img) => img.id === id)
      setShowLargeImg(newLargeImg[0])
    },
    [imgs]
  )

  return (
    <ProductImgContainer>
      <LargeImgDiv
        style={{ backgroundImage: `url(${showLargeImg?.imgUrlMd})` }}
      />
      {imgs.length > 1 && (
        <ThumbnailContainer>
          {showThumbnailImage?.map(({ id, imgUrlSm }) => {
            return (
              <ThumbnailImgDiv
                key={id}
                id={id}
                style={{
                  backgroundImage: `url(${imgUrlSm}})`
                }}
                onClick={handleThumbnailClick}
              />
            )
          })}
        </ThumbnailContainer>
      )}
    </ProductImgContainer>
  )
}
