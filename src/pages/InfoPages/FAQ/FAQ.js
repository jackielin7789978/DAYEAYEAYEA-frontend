import styled from "styled-components";
import { useState, useEffect } from "react";
import { PageWidth } from "../../../components/common";
import { COLOR, FONT_SIZE, MEDIA_QUERY } from "../../../constants/style";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import QA from "./questions";

const Title = styled.div`
  margin-top: 40px;
  font-size: ${FONT_SIZE.lg};
  font-weight: bold;
  ${MEDIA_QUERY.tablet} {
    margin-top: 80px;
    font-size: ${FONT_SIZE.tablet};
  }
  ${MEDIA_QUERY.desktop} {
    margin-top: 80px;
    font-size: ${FONT_SIZE.xl};
  }
`;
const Container = styled.div`
  width: 90%;
  margin: 10px auto;
  margin-bottom: 40px;
  padding: 20px;
  ${MEDIA_QUERY.tablet} {
    width: 80%;
    margin: 10px auto;
    margin-bottom: 60px;
  }
  ${MEDIA_QUERY.desktop} {
    width: 70%;
    margin: 10px auto;
    margin-bottom: 80px;
  }
`;
const Q = styled.div`
  padding: 14px;
  display: flex;
  justify-content: space-between;
  border-bottom: ${({ $isOpen }) =>
    $isOpen ? "none" : `2px solid ${COLOR.border_light_grey}`};
  div {
    font-size: ${FONT_SIZE.md};
    font-weight: bold;
    text-align: left;
    margin-right: 4px;
    ${MEDIA_QUERY.tablet} {
      font-size: ${FONT_SIZE.lg};
    }
    ${MEDIA_QUERY.desktop} {
      font-size: ${FONT_SIZE.lg};
    }
  }
`;
const A = styled.div`
  padding: 14px;
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  text-align: left;
  font-size: ${FONT_SIZE.sm};
  border-bottom: ${({ $isOpen }) =>
    $isOpen ? `2px solid ${COLOR.border_light_grey}` : `none`};
  div {
    width: 90%;
    text-align: left;
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
        <div>{qa.question}</div>
        <Toggle onClick={toggleOpen} $isOpen={isOpen} />
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
          <Item key={qa.id} qa={qa} />
        ))}
      </Container>
    </PageWidth>
  );
}
