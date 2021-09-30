import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { ImgAnchor } from "../../components/common";

const Img = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 720px;
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
  height: 720px;
`;

export default function Home() {
  return (
    <>
      <Carousel>
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
    </>
  );
}
