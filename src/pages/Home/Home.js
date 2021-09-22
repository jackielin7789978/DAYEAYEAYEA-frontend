import styled from "styled-components";
import Carousel from "react-bootstrap/Carousel";
import carousel1 from "../../../src/demo-pics/carousel1.jpg";
import carousel2 from "../../../src/demo-pics/carousel2.jpg";
import carousel3 from "../../../src/demo-pics/carousel3.jpg";
import "bootstrap/dist/css/bootstrap.min.css";

const Page = styled.div`
  background: #f5f5f5;
`;
const Wrapper = styled.div`
  width: 100%;
  margin: 0px;
`;

export default function Home() {
  return (
    <Page>
      <Wrapper>
        黑!
        <Carousel>
          <Carousel.Item>
            <img src={carousel1} className="d-block w-100" alt="1st" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={carousel2} className="d-block w-100" alt="2nd" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={carousel3} className="d-block w-100" alt="3rd" />
          </Carousel.Item>
        </Carousel>
      </Wrapper>
    </Page>
  );
}
