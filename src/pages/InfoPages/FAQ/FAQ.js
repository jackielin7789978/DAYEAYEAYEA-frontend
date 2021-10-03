import styled from "styled-components";
import { useState, useEffect } from "react";
import { PageWidth } from "../../../components/common";
import { COLOR, FONT_SIZE, MEDIA_QUERY } from "../../../constants/style";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import QA from "./questions";

const Title = styled.div`
  margin-top: 20px;
  font-size: ${FONT_SIZE.lg};
  font-weight: bold;
  ${MEDIA_QUERY.desktop} {
    margin-top: 40px;
    font-size: ${FONT_SIZE.xl};
  }
`;
const Container = styled.div`
  margin: 10px 0px 40px;
  padding: 20px;
  ${MEDIA_QUERY.desktop} {
    width: 60%;
    margin: 0px auto;
    margin-bottom: 60px;
  }
`;
const Q = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  border-bottom: ${({ $isOpen }) =>
    $isOpen ? "none" : `2px solid ${COLOR.border_light_grey}`};
  font-size: ${FONT_SIZE.sm};
  font-weight: bold;
  ${MEDIA_QUERY.desktop} {
    font-size: ${FONT_SIZE.lg};
  }
`;
const A = styled.div`
  padding: 20px;
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  text-align: left;
  font-size: ${FONT_SIZE.sm};
  border-bottom: ${({ $isOpen }) =>
    $isOpen ? `2px solid ${COLOR.border_light_grey}` : `none`};
  div {
    width: 90%;
  }
  ${MEDIA_QUERY.desktop} {
    font-size: ${FONT_SIZE.md};
  }
`;
const Toggle = styled(KeyboardArrowDownRoundedIcon)`
  cursor: pointer;
  transition: all 0.2s;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "none")};
`;

// 問題：要怎麼限制一次只能展開一個答案？
function Item({ qa }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Q $isOpen={isOpen}>
        {qa.question} <Toggle onClick={toggleOpen} $isOpen={isOpen} />
      </Q>
      <A $isOpen={isOpen}>
        <div>{qa.answer}</div>
      </A>
    </>
  );
}
export default function FAQ() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <PageWidth>
      <Title>常見問題</Title>
      <Container>
        {QA.map((qa) => (
          <Item qa={qa} />
        ))}
      </Container>
    </PageWidth>
  );
}
