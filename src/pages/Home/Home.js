/* eslint-disable */
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css'
import styled from 'styled-components'
import { PageWidth, FullWidth, ImgAnchor } from '../../components/general'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { FullModal, GeneralModal } from '../../components/Modal'
import {
  ShoppingCarBtn,
  ShoppingCarWhiteBtn,
  ArrowBtn,
  EditBtn,
  GeneralBtn
} from '../../components/Button'
import { IsLoadingComponent } from '../../components/IsLoading'
import { PaginatorButton } from '../../components/Paginator'
import { Link, useLocation } from 'react-router-dom'

const Img = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`
const OutdoorImg = styled(Img)`
  background-image: url('https://i.imgur.com/SdIsgaD.jpg');
`
const DiningImg = styled(Img)`
  background-image: url('https://i.imgur.com/jrOqpOa.jpg');
`
const FragranceImg = styled(Img)`
  background-image: url('https://i.imgur.com/yx6JDOZ.jpg');
  background-position: bottom;
`
const ImgLink = styled(ImgAnchor)`
  height: 520px;
`

// 測試用
const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 40px 0px;
  flex-wrap: wrap;
`

const PaginatorDiv = styled.div`
  margin: 20px auto 40px auto;
`

export default function Home() {
  const pathname = useLocation().pathname
  return (
    <>
      <FullWidth>
        <Carousel
          style={{
            zIndex: '0'
          }}
        >
          <Carousel.Item>
            <OutdoorImg>
              <ImgLink to='/info/notice'>Link</ImgLink>
            </OutdoorImg>
          </Carousel.Item>
          <Carousel.Item>
            <DiningImg>
              <ImgLink to='/info/FAQ'>Link</ImgLink>
            </DiningImg>
          </Carousel.Item>
          <Carousel.Item>
            <FragranceImg>
              <ImgLink to='/info/join'>Link</ImgLink>
            </FragranceImg>
          </Carousel.Item>
        </Carousel>
      </FullWidth>
      <PageWidth>
        {/* <IsLoadingComponent /> */}
        {/* <FullModal
          buttonOne={
            <ShoppingCarBtn
              color='primary'
              marginStyle={{ marginRight: '8px' }}
            >
              結帳
            </ShoppingCarBtn>
          }
          buttonTwo={<EditBtn color='accent'>編輯</EditBtn>}
        >
          已成功加入購物車!
        </FullModal> */}
        {/* <GeneralModal
          buttonOne={
            <ArrowBtn marginStyle={{ marginRight: '8px' }} color='primary' />
          }
          buttonTwo={<EditBtn color='accent'>編輯</EditBtn>}
        >
          確定要取消此訂單?
        </GeneralModal> */}
        <CardContainer>
          {/* <ArrowBtn>註冊</ArrowBtn>
          <EditBtn color="accent">編輯</EditBtn>
          <ShoppingCarBtn color="primary">前往結帳</ShoppingCarBtn> */}
          <GeneralBtn>取消訂單</GeneralBtn>
          {/* <Link style={{ width: '100%' }} to='/info/join'>
            <ShoppingCarWhiteBtn />
          </Link> */}
        </CardContainer>
        <PaginatorDiv>
          <PaginatorButton $active={pathname === '/'} page='1' to='/' />
          <PaginatorButton page='5' to='/info/join' />
          <PaginatorButton page='10' to='/info/join' />
          <PaginatorButton page='11' to='/info/join' />
        </PaginatorDiv>
      </PageWidth>
    </>
  )
}
