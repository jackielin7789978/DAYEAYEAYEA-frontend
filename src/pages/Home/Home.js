import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { ImgAnchor } from "../../components/common";
import { PageWidth, FullWidth } from "../../components/common";

const Img = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;
const OutdoorImg = styled(Img)`
  background-image: url("https://i.imgur.com/SdIsgaD.jpg");
`;
const DiningImg = styled(Img)`
  background-image: url("https://i.imgur.com/jrOqpOa.jpg");
`;
const FragranceImg = styled(Img)`
  background-image: url("https://i.imgur.com/yx6JDOZ.jpg");
  background-position: bottom;
`;
const ImgLink = styled(ImgAnchor)`
  height: 520px;
`;

export default function Home() {
  return (
    <>
      <FullWidth>
        <Carousel
          style={{
            "z-index": "0",
          }}
        >
          <Carousel.Item>
            <OutdoorImg>
              <ImgLink to="/info/notice">Link</ImgLink>
            </OutdoorImg>
          </Carousel.Item>
          <Carousel.Item>
            <DiningImg>
              <ImgLink to="/info/FAQ">Link</ImgLink>
            </DiningImg>
          </Carousel.Item>
          <Carousel.Item>
            <FragranceImg>
              <ImgLink to="/info/join">Link</ImgLink>
            </FragranceImg>
          </Carousel.Item>
        </Carousel>
      </FullWidth>
      <PageWidth>
        <h3>非滿版區塊</h3>
        <img src="https://i.imgur.com/An05Pk6.jpg" alt="demo" />
        <h3>看起來像這樣</h3>
        <img src="https://i.imgur.com/dBV6j0t.jpg" alt="demo" />
        <h3>嘿嘿嘿呵呵呵</h3>
        <img src="https://i.imgur.com/AwgiVmD.jpg" alt="demo" />
        <h3>好看嗎好看嗎</h3>
        <img src="https://i.imgur.com/q1wWaav.jpg" alt="demo" />
      </PageWidth>
    </>
  );
}
