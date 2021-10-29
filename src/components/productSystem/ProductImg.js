import styled from 'styled-components'
import { COLOR, MEDIA_QUERY } from '../../constants/style'
import { useState, useEffect, useCallback } from 'react'
import useMediaQuery from '../../hooks/useMediaQuery'

const ProductImgContainer = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px 0px;

  ${MEDIA_QUERY.tablet} {
    width: 55%;
    height: 90%;
    flex-direction: row;
    align-items: flex-start;
    margin: 0px;
    margin-right: 10px;
  }

  ${MEDIA_QUERY.desktop} {
    width: 50%;
    height: 90%;
    flex-direction: row;
    align-items: flex-start;
    margin: 0px;
    margin-right: 10px;
  }
`
const ThumbnailContainer = styled.div`
  width: 85%;
  height: 20%;
  display: flex;
  flex-direction: row;

  ${MEDIA_QUERY.tablet} {
    flex-direction: column;
    justify-content: flex-start;
    width: 25%;
    height: 100%;
  }

  ${MEDIA_QUERY.desktop} {
    flex-direction: column;
    justify-content: flex-start;
    width: 25%;
    height: 100%;
  }
`

const ThumbnailImgDiv = styled.div`
  width: 32%;
  height: 100% !important;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0px 10px 0px 0px;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    transition: linear 0.2s;
  }

  ${(props) =>
    !props.$isSelected &&
    `
  opacity: 0.5;
  transition: opacity ease 0.5s;
  `};

  ${(props) =>
    props.$isSelected && `border: 2px solid ${COLOR.border_primary};`};

  ${MEDIA_QUERY.tablet} {
    width: 100%;
    height: 26% !important;
    margin: 0px 0px 12px 0px;
  }

  ${MEDIA_QUERY.desktop} {
    width: 100%;
    height: 40% !important;
    margin: 0px 0px 10px 0px;
  }
`

const LargeImgDiv = styled.div`
  width: 85%;
  height: 75%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  margin-bottom: 30px;
  ${MEDIA_QUERY.tablet} {
    width: 80%;
    height: 100%;
    margin: 0;
    margin-left: 10px;
  }

  ${MEDIA_QUERY.desktop} {
    width: 80%;
    height: 100%;
    margin: 0;
    margin-left: 10px;
  }
`

export function ProductImgsComponent({ imgs }) {
  const [showLargeImg, setShowLargeImg] = useState([])
  const [showThumbnailImage, setShowThumbnailImage] = useState([])
  const isMobile = useMediaQuery('(max-width: 767px)')
  const selectedId = showLargeImg?.id

  useEffect(() => {
    setShowLargeImg(imgs[0])
    setShowThumbnailImage(imgs.filter((img) => img.imgUrlSm))
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
      {isMobile && (
        <LargeImgDiv
          style={{ backgroundImage: `url(${showLargeImg?.imgUrlLg})` }}
        />
      )}
      {imgs.length > 1 && (
        <ThumbnailContainer>
          {showThumbnailImage?.map(({ id, imgUrlMd }) => {
            let $isSelected = id === selectedId ? true : false
            return (
              <ThumbnailImgDiv
                key={id}
                id={id}
                style={{
                  backgroundImage: `url(${imgUrlMd}})`
                }}
                onClick={handleThumbnailClick}
                $isSelected={$isSelected}
              />
            )
          })}
        </ThumbnailContainer>
      )}
      {!isMobile && (
        <LargeImgDiv
          style={{ backgroundImage: `url(${showLargeImg?.imgUrlLg})` }}
        />
      )}
    </ProductImgContainer>
  )
}
