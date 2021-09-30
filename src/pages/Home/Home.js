import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

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

export default function Home() {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <OutdoorImg />
        </Carousel.Item>
        <Carousel.Item>
          <DiningImg />
        </Carousel.Item>
        <Carousel.Item>
          <FragranceImg />
        </Carousel.Item>
      </Carousel>
    </>
  );
}
